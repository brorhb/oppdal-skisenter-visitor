<script>
  import { makeRainStore } from '../stores/RainStore'
  import { onDestroy } from 'svelte';

  export let weatherStations = []
  let rainStore = makeRainStore()
  let rainData; 

  const unsubscribe = rainStore.subscribe(data => {
    rainData = data;
  });

  onDestroy(() => {
    unsubscribe();
  });

  function getWindDirection(val) {
    if (val >= 0 && val < 22) {
      return "Nord";
    } else if (val >= 22 && val < 67) {
      return "Nord-øst";
    } else if (val >= 67 && val < 112) {
      return "Øst";
    } else if (val >= 112 && val < 157) {
      return "Sør-øst";
    } else if (val >= 157 && val < 202) {
      return "Sør";
    } else if (val >= 202 && val < 247) {
      return "Sør-vest";
    } else if (val >= 247 && val < 292) {
      return "Vest";
    } else if (val >= 292 && val < 337) {
      return "Nord-vest";
    } else {
      return "Nord";
    }
  }

  function createDate() {
    const today = new Date()
    const year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
    let time = today.getHours()
    if (month < 10) month = `0${month}`
    if (day < 10) day = `0${day}`
    if (time < 10) time = `0${time}`
    return `${year}-${month}-${day}T${time}:00:00Z`
}

function findWeatherIcon() {
  const weatherType = rainData.find(item => item.time == `${createDate()}`).data.next_1_hours.summary.symbol_code;
  return "../../assets/" + weatherType + ".svg"
}
</script>

<div class="card weather-card">
  {#each weatherStations as station}
    {#if !station.error}
    <div class="station-card">
      <div class="card-size-limit">
        <div class="station-header">
          <div>{station.stationName.split(" ")[0].replace("_", "")}</div>
          <div class="station-time">{station.dateTime.split(" ")[1].substring(0, station.dateTime.split(" ")[1].length - 3)}</div>
        </div>
        <div class="station-middle">
          {#if rainData.length}
          <div><img src={findWeatherIcon()} alt="Værikon"></div>
          {/if}
          <div class="station-forecast">
              <div>{station.temperature} {decodeURI('%C2%B0')}</div>
              {#if rainData.length}
                <div>{`${rainData.find(item => item.time == `${createDate()}`).data.next_1_hours.details.precipitation_amount} mm`}</div>
              {/if}
          </div>
        </div>
        <div class="station-wind">
          <span>{station.wind.speed}{station.wind.unit}</span>
          <span class="wind-direction">{getWindDirection(station.wind.direction)}</span>
        </div>
      </div>
    </div>
    {/if}
  {/each}
</div>

<style>
  .weather-card {
    padding: 1rem 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-evenly;
  }

  @media (min-width: 990px) {
    .weather-card {
      grid-template-columns: repeat(3, 1fr);
      margin: 0 0 1rem 1rem;
    }
  }

  .station-card {
    padding: 0 1rem;
    border-left: solid #EFEFEF;
    height: 90%;
    display: table-cell;
  }

  .station-card:first-child {
    border-style: none;
  }

  .card-size-limit {
    max-width: 10rem;
    margin: 0 auto 0 auto;
  }

  .station-header {
    padding-bottom: 1rem;
    text-align: center;
  }

  .station-time {
    color: #BABABA;
  }

  .station-middle {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .station-forecast {
    justify-self: end;
    padding-bottom: 1rem;
    text-align: end;
  }

  .station-wind {
    text-align: center;
  }

  .wind-direction {
    color: #BABABA;
    padding-left: 1rem;
  }
  
</style>