<script>
  import Map from "../../components/Map.svelte"
  import WeatherStations from "../../components/Weatherstations.svelte"
  import Avalanche from '../../components/Avalanche.svelte'
  import Zone from '../../components/Zone.svelte'
  export let tracks = []
  export let lifts = []
  export let zones = []
</script>
<div class="large">
  <div class="main">
    <div class="left">
      <Map items={[...tracks, ...lifts]} />
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
  </div>
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