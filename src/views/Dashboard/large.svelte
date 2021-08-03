<script>
  import Map from "../../components/Map.svelte"
  import WeatherStations from "../../components/Weatherstations.svelte"
  import Avalanche from '../../components/Avalanche.svelte'
  import Zone from '../../components/Zone.svelte'
  import FullscreenMap from '../../components/FullscreenMap.svelte'
  import Skipatrulje from '../../components/Skipatrulje.svelte'
  import Transport from '../../components/Transport.svelte'
  import WebcamCard from '../../components/WebcamCard.svelte'
  import Webcam from '../../components/Webcam.svelte'
  import Zones from '../../components/Zones.svelte'
import Weatherstations from "../../components/Weatherstations.svelte";
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
  <div class="webcam-container">
    <Webcam/>
  </div>
  <div class="weatherstations-container">
    <Weatherstations/>
  </div>
  <div class="map-container">
    <Map items={[...tracks, ...lifts]} />
  </div>
  <div class="zone-container">
    <Zones/>
  </div>
  <div class="skipatrulje-container">
    <Skipatrulje/>
  </div>
  <div class="avalanche-container">
    <Avalanche />
  </div>
<!---
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
  <div class="webcam-container"><WebcamCard/></div>
  <div class="skipatrulje-container"><Skipatrulje on:openMap={openMap}/></div>
  <FullscreenMap on:close={() => showMap = false} show={showMap} items={[...tracks, ...lifts]}/>

  -->
</div>

<style>
   .main-container {
    display: grid;
    grid-template-areas:
      "webcam webcam weather"
      "map map zones"
      "skipatrulje avalanche avalanche";
    grid-template-columns: 1fr 1fr 1fr; 
    column-gap: 1rem;
    row-gap: 1rem;
  }
  .webcam-container {
    grid-area: webcam;
  }
  .map-container {
    grid-area: map;
    /*display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 1rem;*/
  }
  /*.map-div { 
    width: 100%;
    position: relative;
  }
  .map-div > button {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }*/

  .weatherstations-container {
    grid-area: weather;
  }
  .zone-container {
    grid-area: zones;
  }
  .avalanche-container {
    grid-area: avalanche;
  }
  .skipatrulje-container {
    grid-area: skipatrulje;
  }

  @media only screen and (max-width: 1000px) {
    .main-container {
      grid-template-areas:
        "map" 
        "weather"
        "webcam"
        "zones"
        "avalanche"
        "skipatrulje";
      grid-template-columns: 1fr; 
      column-gap: 10px;
    }
  }

</style>