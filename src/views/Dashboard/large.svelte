<script>
  import Map from "../../components/Map.svelte"
  import WeatherStations from "../../components/Weatherstations.svelte"
  import Table from '../../components/desktop/Table.svelte'
  export let trackGroups = []
  export let tracks = []
  export let liftGroups = []
  export let lifts = []
</script>

<div class="large-container">
  <div>
    <Map items={[...tracks, ...lifts]} />
  </div>
  <div>
      <Table name={"Heiser"} itemGroups={liftGroups} itemArray={lifts} />
      <Table name={"Løyper"} itemGroups={trackGroups} itemArray={tracks} />
  </div>
  <div>
      <WeatherStations />
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