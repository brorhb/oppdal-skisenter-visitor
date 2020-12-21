<script>
  import Map from "../../components/Map.svelte"
  import DashboardTile from "../../components/DashboardTile.svelte"
  import { ChevronDownIcon, ChevronUpIcon } from 'svelte-feather-icons'
  import {difficulty} from '../../helpers/difficulty'
  import Lifts from '../../helpers/lifts'
import LiftItem from "../../components/LiftItem.svelte"
import TrackItem from "../../components/TrackItem.svelte"
  export let trackGroups = {}
  export let tracks = []
  export let liftGroups = {}
  export let lifts = []
  export let selectedTrack
  export let weatherStations = []
  let activeGroup
  function getTracksForGroup(group) {
    return trackGroups[group]
  }

  function getTempColor(val) {
    const str = `${val}`
    if (str.includes("-")) return "blue"
    else return "red"
  }
</script>
<DashboardTile>
  <div class="pa2 bg-light-gray flex flex-column items-end">
    <Map />
    <a href="/map">Se stort kart</a>
  </div>
</DashboardTile>
<DashboardTile>
  <div class="bg-light-gray flex flex-row justify-between">
    {#each weatherStations as station}
      <div class="flex flex-column w-100 pa2">
        <div class="flex flex-row items-end justify-between">
          <div class="f4 fw5">{station.stationName.split(" ")[0].replace("_", "")}</div>
          <div class="fw2 gray">{station.dateTime.split(" ")[1].substring(0, station.dateTime.split(" ")[1].length - 3)}</div>
        </div>
        <div class={getTempColor(station.temperature)}>
          {station.temperature}
        </div>
        <div>
          {station.wind.speed}{station.wind.unit}
        </div>
      </div>
    {/each}
  </div>
</DashboardTile>
{#if lifts.length}
  <DashboardTile>
    <div class="pa2 bg-white">
      {#each Object.keys(liftGroups) as group}
        <div class="flex flex-column">
          <div class="flex flex-row justify-between f4 fw5 pointer bg-dark-gray white ma1 pa1" on:click={activeGroup === group ? () => activeGroup = undefined : () => activeGroup = group}>
            <div>
              {Lifts[group]}
            </div>
            <div class="flex flex-row items-center">
              <span>{lifts.filter((lift) => lift.type === group && lift.status === "open").length}</span>
              <span class="ph1">/</span>
              <span>{lifts.filter((lift) => lift.type === group).length}</span>
              {#if activeGroup !== group}
              <ChevronDownIcon size="20" />
              {:else}
              <ChevronUpIcon size="20" />
              {/if}
            </div>
          </div>
          {#if activeGroup === group}
            <div class="pa2 w-100">
              {#if lifts.length >= 5}
                {#each lifts as lift}
                  <LiftItem lift={lift} />
                {/each}
              {/if}
              {#each liftGroups[group] as lift}
                <LiftItem lift={lift} />
              {/each}
            </div>
            {/if}
        </div>
      {/each}
    </div>
  </DashboardTile>
{/if}
<DashboardTile>
  <div class="pa2 bg-white">
    {#each Object.keys(trackGroups) as group}
      <div class="flex flex-column">
        <div class="flex flex-row justify-between f4 fw5 pointer bg-dark-gray white ma1 pa1" on:click={activeGroup === group ? () => activeGroup = undefined : () => activeGroup = group}>
          <div>
            {difficulty[group]}
          </div>
          <div class="flex flex-row items-center">
            <span>{tracks.filter((track) => track.difficulty === group && track.status === "open").length}</span>
            <span class="ph1">/</span>
            <span>{tracks.filter((track) => track.difficulty === group).length}</span>
            {#if activeGroup !== group}
            <ChevronDownIcon size="20" />
            {:else}
            <ChevronUpIcon size="20" />
            {/if}
          </div>
        </div>
        {#if activeGroup === group}
        <div class="pa2 w-100">
          {#each trackGroups[group] as track}
            <TrackItem track={track} />
          {/each}
        </div>
        {/if}
      </div>
    {/each}
  </div>
</DashboardTile>
