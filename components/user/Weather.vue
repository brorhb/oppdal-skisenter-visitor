<template>
  <div class="flex flex-col p-4 w-full">
    <weather-stations :stations="weatherStations" :weatherPredictions="weatherPredictions"></weather-stations>
    <div class="py-2"></div>
    <hourly-forecast :weatherPredictions="weatherPredictions"></hourly-forecast>
    <div class="py-2"></div>
  </div>
</template>
<script>
import { utcToZonedTime, format } from "date-fns-tz";
export default {
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
