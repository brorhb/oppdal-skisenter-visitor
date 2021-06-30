<script>
  import Map from "../../components/Map.svelte"
  import WeatherStations from "../../components/Weatherstations.svelte"
  import Table from '../../components/desktop/Table.svelte'
  import { navigateTo } from "svelte-router-spa";
  export let trackGroups = []
  export let tracks = []
  export let liftGroups = []
  export let lifts = []
  export let weatherStations = []
</script>

<div class="large-container">
  <div>
    <Map items={[...tracks, ...lifts]} />
  </div>
  <div>
      {#if weatherStations.length}
        <WeatherStations weatherStations={weatherStations}></WeatherStations>
      {/if}
      <Table name={"Heiser"} itemGroups={liftGroups} itemArray={lifts} />
      <Table name={"Løyper"} itemGroups={trackGroups} itemArray={tracks} />
  </div>
</div>

<style>
  .large-container {
    display: grid;
  }

  @media (min-width: 990px) {
    .large-container {
      grid-template-columns: 55% 45%;
    }
  }

  @media (min-width: 1400px) {
    .large-container {
      grid-template-columns: 65% 35%;
    }
  }
</style>