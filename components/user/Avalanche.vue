<template>
  <div
    v-if="avalancheWarnings.length"
    class="p-4 rounded-xl w-full lg:w-2/3 flex-col bg-accent-color dark:bg-gray-900"
  >
    <div class="flex flex-col justify-between h-full">
      <div class="text-xs font-bold pb-4">Skredvarsel</div>
      <div class="flex flex-col justify-center h-full">
        <div class="flex flex-col lg:flex-row w-full">
          <div class="flex flex-row">
            <div
              :class="`items-center justify-center m-2 rounded-full ${todayColor}`"
              style="
                width: 100px;
                min-width: 100px;
                height: 100px;
                min-height: 100px;
              "
            >
              <div
                class="flex flex-col items-center justify-center text-5xl font-bold h-full"
              >
                {{ today.DangerLevel }}
              </div>
            </div>
            <div class="flex flex-col">
              <h3 class="font-bold text-xl">
                Snøskredvarsel for Trollheimen
                {{ formatTimestamp(today.ValidFrom) }}
              </h3>
              <p>{{ today.MainText }}</p>
            </div>
          </div>
          <div
            class="h-px lg:w-px bg-gray-400 w-full lg:h-full my-2 lg:mx-2"
          ></div>
          <div class="flex flex-col">
            <div class="avalanche-week">
              <h3 class="text-xl font-bold">Varsel til uka</h3>
              <p class="text-sm">
                Varsler fra Snøskredvarslingen i Norge og
                <a href="https://varsom.no" target="_blank" class="underline"
                  >https://varsom.no</a
                >
              </p>
              <div class="flex flex-row">
                <div
                  v-for="(warning, index) in avalancheWarnings"
                  :key="index"
                  :class="`${isToday(warning.PublishTime) ? 'today' : ''} pt-2 px-1 flex flex-col items-center`"
                >
                  <div
                    :class="`p-2 rounded-full flex flex-col justify-center items-center ${color(
                      warning.DangerLevel
                    )}`"
                    style="
                      width: 30px;
                      min-width: 30px;
                      height: 30px;
                      min-height: 30px;
                    "
                  >
                    <h3>{{ warning.DangerLevel }}</h3>
                  </div>
                  <p>{{ formatTimestamp(warning.ValidFrom) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { isToday, formatTimestamp } from "../../helpers/dateHelpers";
export default {
  props: ["avalancheWarnings"],
  methods: {
    formatTimestamp,
    isToday,
    color(level) {
      switch (level) {
        case "1":
          return "bg-green-500";
        case "2":
          return "bg-yellow-500";
        case "3":
          return "bg-yellow-700";
        case "4":
          return "bg-red-500";
        case "5":
          return "bg-red-700";
        default:
          return "bg-gray-500";
      }
    },
  },
  computed: {
    todayColor() {
      const level = this.today.DangerLevel;
      return this.color(level);
    },
    today() {
      return this.avalancheWarnings[4];
    },
  },
};
</script>
