<template>
  <div class="flex flex-col p-4 w-full">
    <CurrentWeatherPredicted
      :weatherPredictions="weatherPredictions"
    ></CurrentWeatherPredicted>
    <div class="py-2"></div>
    <hourly-forecast :weatherPredictions="weatherPredictions"></hourly-forecast>
  </div>
</template>
<script>
import { utcToZonedTime, format } from "date-fns-tz";
import WeatherImage from "./WeatherImage.vue";
export default {
  components: { WeatherImage },
  props: ["weatherStations", "weatherPredictions"],
  computed: {},
  methods: {
    createDate(timeAdd = 0) {
      const date = utcToZonedTime(Date.now(), "Europe/Oslo");
      const time = `${format(date, "yyyy-MM-dd")}T${format(date, "HH")}:00:00Z`;
      return time;
    },
  },
};
</script>
<style>
.blue {
  background-color: #f4f8ff;
}
</style>
