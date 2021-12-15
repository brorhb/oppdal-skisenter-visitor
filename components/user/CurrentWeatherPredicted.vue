<template>
  <div class="bg-accent-color dark:bg-gray-900 rounded-2xl w-full p-4">
    <div class="flex flex-row justify-between items-center">
      <div class="font-bold">Værmelding</div>
      <div class="text-xs">
        Basert på data fra
        <a href="https://api.met.no/" class="text-blue-400">MET</a>
      </div>
    </div>
    <div v-if="currentRainData" class="flex flex-row w-full items-end">
      <h4>Oppdal skisenter</h4>
      <div class="flex flex-row w-full justify-center">
        <WeatherImage
          class="w-20 items-center"
          :name="currentRainData.next_1_hours.summary.symbol_code"
        ></WeatherImage>
      </div>
      <div class="flex flex-col w-2/3 items-end">
        <h2 class="font-bold text-3xl">
          {{ currentRainData.instant.details.air_temperature
          }}{{ decodeURI("%C2%B0") }}C
        </h2>
        <div class="text-sm text-gray-400">
          {{ currentRainData.next_1_hours.details.precipitation_amount }} mm
        </div>
        <div class="flex flex-row text-sm text-gray-400">
          {{ currentRainData.instant.details.wind_speed }} m/s
          <WindDirection
            class="pl-1"
            :direction="currentRainData.instant.details.wind_from_direction"
          ></WindDirection>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { utcToZonedTime, format } from "date-fns-tz";
export default {
  props: ["weatherPredictions"],
  computed: {
    currentRainData() {
      if (this.weatherPredictions.length > 0) {
        const currentRainData = this.weatherPredictions.find(
          (item) => item.time == `${this.createDate()}`
        ).data;
        return currentRainData;
      } else {
        return false;
      }
    },
  },
  methods: {
    tempBelowZero(temp) {
      temp = parseFloat(temp);
      return temp < 0;
    },
    createDate(timeAdd = 0) {
      const date = utcToZonedTime(Date.now(), "Europe/Oslo");
      const time = `${format(date, "yyyy-MM-dd")}T${format(date, "HH")}:00:00Z`;
      return time;
    },
  },
};
</script>
