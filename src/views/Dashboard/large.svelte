<script>
  import Map from "../../components/Map.svelte"
  import WeatherStations from "../../components/Weatherstations.svelte"
  import Avalanche from '../../components/Avalanche.svelte'
  import Zone from '../../components/Zone.svelte'
  import FullscreenMap from '../../components/FullscreenMap.svelte'
  import Skipatrulje from '../../components/Skipatrulje.svelte'
  import Transport from '../../components/Transport.svelte'
  export let tracks = []
  export let lifts = []
  export let zones = []
  let showMap = false;
  const openMap = () => {
    showMap = true;
    window.scrollTo(0,0);
  }
</script>

<div class="main-container">
  <div class="map-container card" >
    <div class="map-div">
      <Map items={[...tracks, ...lifts]} />
      <button class="oppdal-button" on:click="{openMap}">Åpne kart</button>
    </div>
  </div>
  <div class="weather-container"><WeatherStations /></div>
  <div class="transport-container"><Transport /></div>
  <div class="zones-container">
    <Zone zone={zones[3]}/>
    <Zone zone={zones[0]}/>
    <Zone zone={zones[2]}/>
    <Zone zone={zones[1]}/>
  </div>
  <div class="avalanche-container"><Avalanche /></div>
  <div class="skipatrulje-container"><Skipatrulje on:openMap={openMap}/></div>
  <FullscreenMap on:close={() => showMap = false} show={showMap} items={[...tracks, ...lifts]}/>
</div>

<style>
   .main-container {
    display: grid;
    grid-template-areas:
      "map map weather weather"
      "map map transport transport"
      "zones zones zones zones"
      "avalanche avalanche skipatrulje skipatrulje";
    grid-template-columns: 1fr 1fr 1fr 1fr; 
    column-gap: 2rem;
    row-gap: 2rem;
  }

  .map-container {
    grid-area: map;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  .map-div { 
    width: 100%;
    position: relative;
  }
  .map-div > button {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }

  .weather-container {
    grid-area: weather;
  }
  .transport-container {
    grid-area: transport;
  }
  .zones-container {
    display: flex;
    flex-wrap: wrap;
    grid-area: zones;
    justify-content: space-between;
  }
  .avalanche-container {
    grid-area: avalanche;
  }
  .skipatrulje-container {
    grid-area: skipatrulje;
  }

  @media only screen and (max-width: 1400px) {
    .main-container {
      grid-template-areas:
        "map map" 
        "weather weather "
        "transport transport"
        "zones zones"
        "zones zones"
        "avalanche avalanche"
        "skipatrulje skipatrulje";
      grid-template-columns: 1fr 1fr; 
      column-gap: 10px;
    }
  }

</style>