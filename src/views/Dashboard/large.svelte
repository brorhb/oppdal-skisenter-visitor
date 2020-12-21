<script>
  import Map from "../../components/Map.svelte"
  import { ChevronDownIcon, ChevronUpIcon } from 'svelte-feather-icons'
  import {difficulty} from '../../helpers/difficulty'
  import Lifts from '../../helpers/lifts'
  import AvalancheBanner from "../../components/AvalancheBanner.svelte"
import LiftItem from "../../components/LiftItem.svelte"
import TrackItem from "../../components/TrackItem.svelte"
  export let trackGroups = []
  export let tracks = []
  export let liftGroups = []
  export let lifts = []
  export let selectedTrack
  export let weatherStations = []
  let activeGroup

  function getTempColor(val) {
    const str = `${val}`
    if (str.includes("-")) return "blue"
    else return "red"
  }
</script>
<div class="w-100 h-100 flex flex-row">
  <div class="w-80">
    <Map items={[...tracks, ...lifts]} />
  </div>
  <div class="w-20 flex flex-column">
    {#if weatherStations.length}
      <div class="bg-light-gray flex flex-row justify-between">
        {#each weatherStations as station}
          <div class="flex flex-column w-100 pa2">
            <div class="flex flex-wrap items-end justify-between">
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
    {/if}
    <div class="h-100 flex flex-column overflow-auto">
      {#if lifts.length}
        <div class="bg-light-gray ph1">
          <h2>Heiser</h2>
        </div>
        <div class="bg-white">
          {#if lifts.length <= 5}
            {#each lifts as lift}
              <LiftItem lift={lift} />
            {/each}
          {:else}
            {#each Object.keys(liftGroups) as group}
              <div class="flex flex-column">
                <div class="flex flex-row justify-between f4 fw5 pointer bg-dark-gray white mb1 pa1" on:click={activeGroup === group ? () => activeGroup = undefined : () => activeGroup = group}>
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
                    {#each liftGroups[group] as lift}
                      <LiftItem lift={lift} />
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          {/if}
        </div>
      {/if}
      <div class="bg-light-gray ph1">
        <h2>Løyper</h2>
      </div>
      <div class="bg-white">
        {#each Object.keys(trackGroups) as group}
          <div class="flex flex-column">
            <div class="flex flex-row justify-between f4 fw5 pointer bg-dark-gray white mb1 pa1" on:click={activeGroup === group ? () => activeGroup = undefined : () => activeGroup = group}>
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
    </div>
  </div>
</div>