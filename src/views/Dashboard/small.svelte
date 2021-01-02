<script>
  import Map from "../../components/Map.svelte"
  import DashboardTile from "../../components/DashboardTile.svelte"
  import LiftItem from "../../components/LiftItem.svelte"
  import TrackItem from "../../components/TrackItem.svelte"
  import WeatherStations from "../../components/Weatherstations.svelte"
  export let activeZone
  export let tracks = []
  export let lifts = []
  export let weatherStations = []
</script>
<DashboardTile>
  <div class="pa2 bg-light-gray flex flex-column items-end">
    {#if navigator.userAgent.includes("Android")}
    <div class="h-100">
      <img height="width: 100%" src="../../assets/map.png" alt="Løypekart" />
    </div>
    {:else}
      <Map />
    {/if}
    <a href="/map">Se stort kart</a>
  </div>
</DashboardTile>
<DashboardTile>
  <div class="bg-light-gray flex flex-row justify-between">
    <WeatherStations weatherStations={weatherStations}></WeatherStations>
  </div>
</DashboardTile>
{#if activeZone}
  {#if lifts.length}
    <DashboardTile>
      <div class="pa2 bg-white">
        <h2>Heiser</h2>
        <ul class="list pl0">
          {#each lifts as lift}
            <LiftItem {lift}></LiftItem>
          {/each}
        </ul>
      </div>
    </DashboardTile>
  {/if}

  <DashboardTile>
    <div class="pa2 bg-white">
      <h2>Løyper</h2>
      <ul class="list pl0">
        {#each tracks as track}
          <TrackItem {track}></TrackItem>
        {/each}
      </ul>
    </div>
  </DashboardTile>
  {:else}
  <DashboardTile>
    <div class="pa2 bg-white">
      <div class="flex flex-row justify-between w-100">
        <div class="w-100 pa1">
          <span class="f4 fw5">Åpne heiser</span>
          <div>
            <span class="fw5 green">{lifts.filter((l) => l.status === "open").length}</span> / {lifts.length}
          </div>
        </div>
        <div class="w-100 pa1">
          <span class="f4 fw5">Åpne løyper</span>
          <div>
            <span class="fw5 green">{tracks.filter((l) => l.status === "open").length}</span> / {tracks.length}
          </div>
        </div>
      </div>
    </div>
  </DashboardTile>
{/if}

