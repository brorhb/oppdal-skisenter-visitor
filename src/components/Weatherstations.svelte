<script>
  export let weatherStations = []

  function getTempColor(val) {
    const str = `${val}`
    if (str.includes("-")) return "blue"
    else return "red"
  }

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
</script>

<div class="card weather-card">
  {#each weatherStations as station}
    {#if !station.error}
    <div class="station-card">
      <div style="max-width: 10rem; margin: 0 auto 0 auto;">
        <div class="station-header">
          <div class="">{station.stationName.split(" ")[0].replace("_", "")}</div>
          <div class="station-time">{station.dateTime.split(" ")[1].substring(0, station.dateTime.split(" ")[1].length - 3)}</div>
        </div>
        <div class="station-middle">
          <div class="weather-icon"><i class="fas fa-cloud fa-2x "></i></div>
          <div class="station-forecast">
              <div>{station.temperature} {decodeURI('%C2%B0')}</div>
              <div>1.2mm</div>
          </div>
        </div>
        <div class="station-wind">
          <span>{station.wind.speed}{station.wind.unit}</span>
          <span class="pl1 fw2 f6 gray">{getWindDirection(station.wind.direction)}</span>
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
  }

  .station-forecast {
    justify-self: end;
    padding-bottom: 1rem;
    text-align: end;
  }

  .station-wind {
    text-align: center;
  }
  
  


</style>