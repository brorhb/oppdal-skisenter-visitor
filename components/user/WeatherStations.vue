<template>
  <div class="flex flex-col bg-accent-color dark:bg-gray-900 rounded-2xl w-full p-4">
    <div v-if="currentRainData" class="flex flex-row justify-center">
      <WeatherImage
          class="w-20 items-center"
          :name="currentRainData.next_1_hours.summary.symbol_code"
        ></WeatherImage>
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="station in computedStations"
        :key="station.id"
        class="p-2 lg:w-1/2 items-center"
      >
        <h1 :class="`text-4xl font-bold ${tempBelowZero(station.temperature) ? 'text-blue-500' : 'text-red-500'}`">{{ station.temperature }}</h1>
        <h2 class="text-xl font-bold">{{ cleanName(station.stationName) }}</h2>
        <div class="flex flex-row text-sm text-gray-600">
          {{ station.wind.speed }} m/s fra
          <wind-direction
            class="pl-1"
            :direction="station.wind.direction"
          ></wind-direction>
        </div>
        <div class="text-sm text-gray-600">
          {{ station.wind.gust }} m/s kast
        </div>
        <div class="text-sm text-gray-600">
          Målt {{ shortTime(station.dateTime) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { utcToZonedTime, format } from "date-fns-tz";
export default {
  props: ["stations", "weatherPredictions"],
  computed: {
    computedStations() {
      return this.stations.filter(station => !station.error);
    },
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
    cleanName(name) {
      return name.replace("_", "");
    },
    shortTime(time) {
      time = time.split(" ")[1];
      time = time.split(":");
      return `${time[0]}:${time[1]}`;
    },
    createDate() {
      const date = utcToZonedTime(Date.now(), "Europe/Oslo");
      const time = `${format(date, "yyyy-MM-dd")}T${format(date, "HH")}:00:00Z`;
      return time;
    },
  },
};
</script>
