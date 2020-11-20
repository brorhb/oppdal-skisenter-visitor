<script>
  import Map from "../../components/Map.svelte"
  import DashboardTile from "../../components/DashboardTile.svelte"
  export let trackGroups = []
  export let tracks = []
  export let liftGroups = []
  export let lifts = []
  export let selectedTrack
</script>
<DashboardTile>
  <div class="pa2 bg-light-gray flex flex-column items-end">
    <Map />
    <a href="/map">Se stort kart</a>
  </div>
</DashboardTile>
<DashboardTile>
  <div class="pa2 bg-light-gray">
    {#each trackGroups as group}
      <div class="flex flex-row justify-between">
        <div>
          {group}
        </div>
        <div class="flex flex-row">
          <span>{tracks.filter((track) => track.difficulty === group && track.status === "open").length}</span>
          <span class="ph1">/</span>
          <span>{tracks.filter((track) => track.difficulty === group).length}</span>
        </div>
      </div>
    {/each}
  </div>
</DashboardTile>
<DashboardTile>
  <div class="pa2 bg-light-gray">
    {#each liftGroups as group}
      <div class="flex flex-row justify-between">
        <div>
          {group}
        </div>
        <div class="flex flex-row">
          <span>{lifts.filter((lift) => lift.type === group && lift.status === "open").length}</span>
          <span class="ph1">/</span>
          <span>{lifts.filter((lift) => lift.type === group).length}</span>
        </div>
      </div>
    {/each}
  </div>
</DashboardTile>
<div class="pa2 w-100">
  {#each tracks as track}
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