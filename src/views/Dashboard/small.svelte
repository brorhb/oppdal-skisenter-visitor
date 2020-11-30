<script>
  import Map from "../../components/Map.svelte"
  import DashboardTile from "../../components/DashboardTile.svelte"
  import { ChevronDownIcon, ChevronUpIcon } from 'svelte-feather-icons'
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
  <div class="pa2 bg-light-gray flex flex-row justify-between">
    {#each weatherStations as station}
      <div class="flex flex-column w-100">
        <div class="f4 fw5">{station.stationName.split(" ")[0].replace("_", "")}</div>
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
<DashboardTile>
  <div class="pa2 bg-white">
    {#each Object.keys(trackGroups) as group}
      <div class="flex flex-column">
        <div class="flex flex-row justify-between f4 fw5 pointer bg-dark-gray white ma1 pa1" on:click={activeGroup === group ? () => activeGroup = undefined : () => activeGroup = group}>
          <div>
            {group}
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
            <div class="flex flex-row justify-between items-center pointer" on:click={() => selectedTrack({detail: track})}>
              <div class="flex flex-column pv2">
                <div class="b">{track.id} {track.name}</div>
                <div>{track.difficulty}</div>
              </div>
              <svg height="16" width="16" viewBox="0 0 16 16">
                <circle
                  opacity="1.0"
                  cx="8"
                  cy="8"
                  fill={`${track.status === "closed" ? "red" : "green"}`}
                  r="8"
                >
              </svg>
            </div>
          {/each}
        </div>
        {/if}
      </div>
    {/each}
  </div>
</DashboardTile>
<DashboardTile>
  <div class="pa2 bg-white">
    {#each Object.keys(liftGroups) as group}
      <div class="flex flex-column">
        <div class="flex flex-row justify-between f4 fw5 pointer bg-dark-gray white ma1 pa1" on:click={activeGroup === group ? () => activeGroup = undefined : () => activeGroup = group}>
          <div>
            {group}
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
              <div class="flex flex-row justify-between items-center">
                <div class="flex flex-column pv2">
                  <div class="b">{lift.id} {lift.name}</div>
                </div>
                <svg height="16" width="16" viewBox="0 0 16 16">
                  <circle
                    opacity="1.0"
                    cx="8"
                    cy="8"
                    fill={`${lift.status === "closed" ? "red" : "green"}`}
                    r="8"
                  >
                </svg>
              </div>
            {/each}
          </div>
          {/if}
      </div>
    {/each}
  </div>
</DashboardTile>
