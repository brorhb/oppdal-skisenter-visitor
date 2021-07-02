<script>
  import Map from "../../components/Map.svelte"
  import WeatherStations from "../../components/Weatherstations.svelte"
  import Avalanche from '../../components/Avalanche.svelte'
  import Zone from '../../components/Zone.svelte'
  import FullscreenMap from '../../components/FullscreenMap.svelte'
  import Skipatrulje from '../../components/Skipatrulje.svelte'
  export let tracks = []
  export let lifts = []
  export let zones = []
  let showMap = false;
</script>
<div class="large">
  <div class="main">
    <div class="left">
      <div class="map-container">
        <Map items={[...tracks, ...lifts]} />
        <button class="oppdal-button" on:click="{() => showMap = true}">Mer detaljer</button>
      </div>
      <WeatherStations />
    </div>
    <div class="right">
      <Zone zone={zones[3]}/>
      <Zone zone={zones[0]}/>
      <Zone zone={zones[2]}/>
    </div>
  </div>
  <div class="content">
    <Avalanche/>
    <Skipatrulje on:openMap={() => showMap = true}/>
  </div>
  <FullscreenMap on:close={() => showMap = false} show={showMap} items={[...tracks, ...lifts]}/>
</div>

<style>
  .large {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .main {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 30px;
  }
  .left {
    display: flex;
    flex-direction: column;
    width: 85%;
  }
  .map-container {
    position: relative;
    overflow: hidden;
  }
  .map-container > button {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }
  .right {
    display: flex;
    flex-direction: column;
  }
  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
</style>