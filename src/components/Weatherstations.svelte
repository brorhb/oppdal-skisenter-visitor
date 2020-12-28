<script>
  export let weatherStations = []

  function getTempColor(val) {
    const str = `${val}`
    if (str.includes("-")) return "blue"
    else return "red"
  }
</script>
<div class="bg-light-gray flex flex-row justify-between w-100">
  {#each weatherStations as station}
    {#if !station.error}
    <div class="flex flex-column w-100 pa2">
      <div class="flex flex-wrap items-end justify-between">
        <div class="f4 fw5">{station.stationName.split(" ")[0].replace("_", "")}</div>
        <div class="fw2 gray">{station.dateTime.split(" ")[1].substring(0, station.dateTime.split(" ")[1].length - 3)}</div>
      </div>
      <div class={getTempColor(station.temperature)}>
        {station.temperature}
      </div>
      <div>
        {station.wind.speed}{station.wind.unit}
      </div>
    </div>
    {/if}
  {/each}
</div>