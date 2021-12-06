<template>
  <div class="flex flex-col blue rounded-2xl w-full p-4">
    <div class="flex flex-row justify-between items-center">
      <div class="font-bold">Værmelding</div>
      <div class="text-xs">
        Basert på data fra
        <a href="https://api.met.no/" class="text-blue-400">MET</a>
      </div>
    </div>
    <div class="py-1"></div>
    <div v-if="futureRainData" class="flex flex-row justify-between">
      <div
        v-for="(data, index) in futureRainData"
        :key="index"
        class="flex flex-col justify-between"
      >
        <div class="text-sm text-gray-400">
          {{ "kl. " + data.time.split("T")[1].split(":")[0] }}
        </div>
        <div>
          <weather-image :name="data.data.next_1_hours.summary.symbol_code"></weather-image>
        </div>
        <div class="font-bold">
          {{
            `${
              data.data.instant.details.air_temperature
            } ${decodeURI("%C2%B0")}C`
          }}
        </div>
        <div class="text-sm text-gray-400">
          {{
            `${data.data.next_1_hours.details.precipitation_amount} mm`
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { utcToZonedTime, format } from "date-fns-tz";
import WeatherImage from './WeatherImage.vue';
export default {
  components: { WeatherImage },
  props: ["weatherPredictions"],
  computed: {
    futureRainData() {
      let arr = [];
      if (this.weatherPredictions.length > 0) {
        let currentIndex = this.weatherPredictions.findIndex(
          (item) => item.time == `${this.createDate()}`
        );
        for (let i = currentIndex + 1; i <= currentIndex + 5; i++) {
          if (i < this.weatherPredictions.length) {
            arr.push(this.weatherPredictions[i]);
          }
        }
        return arr;
      } else {
        return false;
      }
    },
  },
  methods: {
    createDate(timeAdd = 0) {
      const date = utcToZonedTime(Date.now(), "Europe/Oslo");
      const time = `${format(date, "yyyy-MM-dd")}T${format(date, "HH")}:00:00Z`;
      return time;
    },
  },
};
</script>
