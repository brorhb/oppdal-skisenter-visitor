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
<div class="bg-white flex flex-wrap justify-between w-100">
  {#each weatherStations as station}
    {#if !station.error}
    <div class={`flex flex-column w-100 ${weatherStations.length > 1 ? "w-50-ns" : ""} pa2`}>
      <div class="flex flex-wrap items-end justify-between">
        <div class="f4 fw5">{station.stationName.split(" ")[0].replace("_", "")}</div>
        <div class="fw2 gray">{station.dateTime.split(" ")[1].substring(0, station.dateTime.split(" ")[1].length - 3)}</div>
      </div>
      <div class={getTempColor(station.temperature)}>
        {station.temperature}
      </div>
      <div>
        <span>{station.wind.speed}{station.wind.unit}</span>
        <span class="pl1 fw2 f6 gray">{getWindDirection(station.wind.direction)}</span>
      </div>
    </div>
    {/if}
  {/each}
</div>