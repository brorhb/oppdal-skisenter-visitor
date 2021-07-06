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
  <div class="header weather-header">Værstatus i løypene</div>
  <div class="weather-wrapper">
    <div class="card-size-limit">
      <div>
        <div class="subsub-header">Oppdal</div>
        <div class="sub-text station-time">{getHour()}</div>
      </div>
      <div class="station-middle-oppdal">
        {#if rainData.length}
          <div><img src={findWeatherIcon()} alt="Værikon"></div>
        {/if}
        <div class="information station-forecast-oppdal">
            {#if rainData.length}
              <div>{`${currentRainData.instant.details.air_temperature} ${decodeURI('%C2%B0')}`}</div>
              <div>{`${currentRainData.next_1_hours.details.precipitation_amount} mm`}</div>
            {/if}
        </div>
      </div>
      <div class="information">
        {#if rainData.length}
          <span>{`${currentRainData.instant.details.wind_speed} m/s`}</span>
          <span class="wind-direction-oppdal">{getWindDirection(currentRainData.instant.details.wind_from_direction)}</span>
        {/if}
      </div>
    </div>
    {#each weatherStations as station}
      {#if !station.error}
        <div class="station-card-border">
          <div class="card-size-limit">
            <div class="station-header">
              <span class="subsub-header">{station.stationName.split(" ")[0].replace("_", "")}</span>
              <span class="sub-text station-time">{station.dateTime.split(" ")[1].substring(0, station.dateTime.split(" ")[1].length - 3)}</span>
            </div>
            <div class="station-middle">
              <div class="information station-middle-section">
                  <i class="fas fa-thermometer-half blue-icon fa-fw"></i>
                  <span>{station.temperature} {decodeURI('%C2%B0')}</span>
              </div>
              <div class="information station-middle-section">
                <i class="fas fa-wind blue-icon fa-fw"></i>
                <span>{station.wind.speed} {station.wind.unit}</span>
              </div>
              <div class="information station-middle-section">
                <i class="fas fa-arrows-alt grey-icon fa-fw"></i>
                <span class="wind-direction">{getWindDirection(station.wind.direction)}</span>
              </div>
            </div>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .weather-card {
    height: 100%;
  }
  .weather-header {
    color: #004a7c;
    padding: 1rem 0;
  }
  .weather-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-evenly;
  }
  .card-size-limit {
    max-width: 15rem;
    padding: 1rem;
  }
  .station-time {
    color: #BABABA;
    text-align: center;
    margin-left: 0.4rem;
  }

  .station-middle-oppdal {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  .station-forecast-oppdal {
    justify-self: end;
  }
  .wind-direction-oppdal {
    color: #BABABA;
    margin-left: 0.5rem;
  }

  .station-card-border {
    padding-top: 1rem;
    border-left: solid #EFEFEF;
    height: 90%;
  }
  .station-header {
    text-align: center;
  }
  .station-middle {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    padding-left: 20%;
    padding-top: 0.5rem;
  }
  .station-middle-section {
    justify-self: left;
    padding-top: 0.5rem;
  }
  .wind-direction {
    color: #BABABA;
  }
  .station-middle-section > i {
    padding-right: 1rem;
  }
  .blue-icon {
    color: #004a7c;
  }
  .grey-icon {
    color: #BABABA;
  }
  
</style>