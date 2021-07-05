<script>
  import { makeRainStore } from '../stores/RainStore'
  import { makeWeatherStore } from '../stores/WeatherStore'
  import { onDestroy } from 'svelte';

  let weatherStore = makeWeatherStore()
  let weatherStations = []
  let rainStore = makeRainStore()
  let rainData; 
  $: currentRainData = setCurrentRainData(rainData);

  const unsubscribe_weather = weatherStore.subscribe(data => {
    weatherStations = data;
  });

  const unsubscribe_rain = rainStore.subscribe(data => {
    rainData = data;
  });

  onDestroy(() => {
    unsubscribe_weather();
    unsubscribe_rain();
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
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let time = today.getHours();
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    if (time < 10) time = `0${time}`;
    return `${year}-${month}-${day}T${time}:00:00Z`;
  }

  function getHour() {
    const today = new Date();
    let time = `${today.getHours()}:00`;
    return time;
  }

function setCurrentRainData(rainData) {
  if (rainData.length > 0) {
    currentRainData = rainData.find(item => item.time == `${createDate()}`).data;
    return currentRainData;
  } else {
    return [];
  };
}

function findWeatherIcon() {
  if (currentRainData) {
    const weatherType = currentRainData.next_1_hours.summary.symbol_code;
    return "../../assets/" + weatherType + ".svg";
  };
}
</script>

<div class="card weather-card">
  <div>
    <div class="card-size-limit">
      <div class="station-header">
        <div>Oppdal</div>
        <div class="station-time">{getHour()}</div>
      </div>
      <div class="station-middle-oppdal">
        {#if rainData.length}
          <div><img src={findWeatherIcon()} alt="Værikon"></div>
        {/if}
        <div class="station-forecast-oppdal">
            {#if rainData.length}
              <div>{`${currentRainData.instant.details.air_temperature} ${decodeURI('%C2%B0')}`}</div>
              <div>{`${currentRainData.next_1_hours.details.precipitation_amount} mm`}</div>
            {/if}
        </div>
      </div>
      <div class="station-wind-oppdal">
        {#if rainData.length}
          <span>{`${currentRainData.instant.details.wind_speed} m/s`}</span>
          <span class="wind-direction">{getWindDirection(currentRainData.instant.details.wind_from_direction)}</span>
        {/if}
      </div>
    </div>
  </div>
  {#each weatherStations as station}
    {#if !station.error}
      <div class="station-card">
        <div class="card-size-limit">
          <div class="station-header">
            <div>{station.stationName.split(" ")[0].replace("_", "")}</div>
            <div class="station-time">{station.dateTime.split(" ")[1].substring(0, station.dateTime.split(" ")[1].length - 3)}</div>
          </div>
          <div class="station-middle">
            <div class="station-middle-section">
                <i class="fas fa-thermometer-half blue-icon fa-fw"></i>
                <span>{station.temperature} {decodeURI('%C2%B0')}</span>
            </div>
            <div class="station-middle-section">
              <i class="fas fa-wind blue-icon fa-fw"></i>
              <span>{station.wind.speed} {station.wind.unit}</span>
            </div>
            <div class="station-middle-section">
              <i class="fas fa-arrows-alt grey-icon fa-fw"></i>
              <span class="wind-direction">{getWindDirection(station.wind.direction)}</span>
            </div>
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
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-evenly;
  }

  @media (min-width: 990px) {
    .weather-card {
      grid-template-columns: repeat(4, 1fr);
      margin: 1.5rem 0 1.5rem 0;
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

  .station-middle-oppdal {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  .station-forecast-oppdal {
    justify-self: end;
    padding-bottom: 1rem;
    text-align: center;
  }
  .station-wind-oppdal {
    text-align: center;
  }
  .wind-direction {
    color: #BABABA;
  }

  .station-middle {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    padding-left: 20%;
  }
  .station-middle-section {
    padding-bottom: 1rem;
  }
  .blue-icon {
    color: #004a7c;
    padding-right: 1rem;
  }
  .grey-icon {
    color: #BABABA;
    padding-right: 1rem;
  }
</style>