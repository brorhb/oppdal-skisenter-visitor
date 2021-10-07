<script>
  import { makeRainStore } from '../stores/RainStore'
  import { makeWeatherStore } from '../stores/WeatherStore'
  import { makeSnowConditionsStore } from '../stores/SnowConditionsStore';
  import { onDestroy } from 'svelte';
  import get_publish_date from '../helpers/publishedDate';
  import { utcToZonedTime, format } from 'date-fns-tz'

  let weatherStore = makeWeatherStore();
  let weatherStations = [];
  let rainStore = makeRainStore();
  let rainData;
  let snowConditionStore = makeSnowConditionsStore();
  let snowCondition;
  $: currentRainData = setCurrentRainData(rainData);
  $: futureRainData = setFutureRainData(rainData);

  const unsubscribe_weather = weatherStore.subscribe(data => {
    weatherStations = data;
  });

  const unsubscribe_rain = rainStore.subscribe(data => {
    rainData = data;
  });

  const unsubscribe_snowCondition = snowConditionStore.subscribe(data => {
    snowCondition = data;
  });

  onDestroy(() => {
    unsubscribe_weather();
    unsubscribe_rain();
    unsubscribe_snowCondition();
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

  function createDate(timeAdd = 0) {
    const date = utcToZonedTime(Date.now(), 'Europe/Oslo');
    const time = `${format(date, 'yyyy-MM-dd')}T${format(date, 'HH')}:00:00Z`;
    return time;
  }

function setCurrentRainData(rainData) {
  if (rainData.length > 0) {
    currentRainData = rainData.find(item => item.time == `${createDate()}`).data;
    return currentRainData;
  } else {
    return [];
  };
};

function setFutureRainData(rainData) {
  let futureRainDataArray = []
  if (rainData.length > 0) {
    let currentIndex = rainData.findIndex(item => item.time == `${createDate()}`);
    for (let i=currentIndex+1; i<=currentIndex+5; i++) { //Show weather for next five hours, use index to handle times at the end of the month, year, etc. 
      if (i < rainData.length) {
        futureRainDataArray.push(rainData[i])
      }
    }
    return futureRainDataArray;
    
  } else {
    return [];
  };
}

function findWeatherIcon(rainDataItem) {
  if (rainDataItem) {
    const weatherType = rainDataItem.next_1_hours.summary.symbol_code;
    return "../../assets/" + weatherType + ".svg";
  };
}
</script>

<div class="weather">

  <div class="card weather-card">
    <div class="flex">
      <div class="paragraph-bold">Værmelding</div>
      <p class="smallinfo">Basert på data fra <a href="https://api.met.no/" target="_blank">MET</a></p>
    </div>
    <div class="current-weather">
      {#if rainData.length}
        <div class="current-weather-header"><h4>Oppdal skisenter</h4></div>
        <div class="current-weather-icon"><img src={findWeatherIcon(currentRainData)} alt="Værikon"></div>
        <div class="current-weather-parameters">
          <h2>{`${currentRainData.instant.details.air_temperature} ${decodeURI('%C2%B0')}C`}</h2>
          <div class="small-info">{`${currentRainData.next_1_hours.details.precipitation_amount} mm`}</div>
          <div class="small-info">{`${currentRainData.instant.details.wind_speed} m/s ${getWindDirection(currentRainData.instant.details.wind_fr).toLowerCase()}`}</div>
        </div>
      {/if}
    </div>
    <div class="future-weather">
      {#if futureRainData.length > 0}
        {#each futureRainData as futureRainDataItem, i}
          <div class="future-weather-card">
            <div class="small-info">{"kl. " + futureRainDataItem.time.split("T")[1].split(":")[0]}</div>
            <div class="future-weather-icon"><img src={findWeatherIcon(futureRainDataItem.data)} alt="Værikon"></div>
            <div class="paragraph-bold">{`${futureRainDataItem.data.instant.details.air_temperature} ${decodeURI('%C2%B0')}C`}</div>
            <div class="small-info">{`${futureRainDataItem.data.next_1_hours.details.precipitation_amount} mm`}</div>
          </div>
        {/each}
      {/if}
    </div>
  </div>

  
  <div class="card snow-card">
    <div class="snow-icon"><img src="../../assets/snowflake.svg" alt="snøikon"></div>
    <div>
      <div class="paragraph-bold">Snøforhold i løypene</div>
      <div>
        {#if snowCondition.length > 0} <!--CHANGE TO snowCondition when no longer list!-->
        <p><span class="time-published small-info" >{get_publish_date(snowCondition[0].timestamp)}</span>{snowCondition[0].message}</p>
        {:else}
        <p><span class="time-published small-info" >{get_publish_date(Date.now())}</span>{"Det finnes ingen nylige oppdateringer om snøforholdene i skisenteret."}</p>
        {/if}
      </div>
    </div>
  </div>
  

  <div class="card">
    <div class="paragraph-bold">Værstatus i løypene</div>
    <div class="stations-container">
      {#each weatherStations as station}
        {#if !station.error}
          <div class="weather-station">
            <h2>{`${station.temperature} ${decodeURI('%C2%B0')}C`}</h2>
            <div class="big-paragraph-bold">
              {#if station.stationName.split("_")[0] == "Vangshøa"} Topp - Vangslia
              {:else if station.stationName.split("_")[0] == "Vangslia"} Bunn - Vangslia
              {:else} Bunn - Stølen
              {/if}
            </div>
            <div class="small-info">{station.wind.speed} {station.wind.unit.toLowerCase()}</div>
            <div class="small-info">{`Målt: ${station.dateTime.split(" ")[1].substring(0, station.dateTime.split(" ")[1].length - 3)}`}</div>
          </div>
        {/if}
    {/each}
    </div>
  </div>
</div>

<style>
  .weather {
    height: 100%;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .current-weather {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items:flex-end;
    padding-top: 1rem; 
  }
  .current-weather-header {
    max-width: 5rem;
    padding-bottom: 1rem;
    padding-right: 0.5rem;
  }
  .current-weather-icon {
    width: 5.5rem;
  }
  .current-weather-parameters {
    padding-left: 1.5rem;
    padding-bottom: 1rem;
  }

  .future-weather {
    border-top: 1px solid #A0B2DC;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .future-weather-card {
    padding-top: 1rem;
    text-align: center;
  }
  .future-weather-icon {
    padding-top: 0.5rem;
    width: 2rem;
    margin: 0 auto 0 auto;
  }
  .snow-card {
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
  }
  .snow-icon {
    margin-right: 0.5rem;
  }
  .time-published {
    color: #B7631A;
    margin-right: 0.5rem;
  }

  .stations-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }
  .weather-station:last-child {
    grid-column-start: 2;
  }
  
  .weather-station {
    max-width: 15rem;
    padding-top: 1rem;
    padding-left: 1rem;
  }

  .weather-station:first-child {
    padding-left: 0;
  }
</style>