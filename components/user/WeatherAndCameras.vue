<template>
  <MaxWrapper>
    <div>
      <h2 class="text-2xl font-bold sm:px-4">Vær og føre</h2>
      <div class="flex md:flex-row w-full flex-col">
        <div class="w-full md:h-auto p-4 md:px-0 h-96 md:w-2/3">
          <Cameras class="flex py-4" :cameras="cameras"></Cameras>
        </div>
        <div class="w-full md:w-1/3 p-4 md:px-0">
          <Weather
            :weatherStations="weatherStations"
            :weatherPredictions="weatherPredictions"
          ></Weather>
        </div>
      </div>
    </div>
  </MaxWrapper>
</template>
<script>
export default {
  props: ["weatherStations", "cameras", "weatherPredictions"],
};
</script>
