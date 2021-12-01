<template>
  <MaxWrapper>
    <div>
      <h2 class="text-2xl font-bold">Vær og føre</h2>
      <div class="flex flex-row w-full">
        <div class="w-2/3">
          <Cameras class="flex py-4" :cameras="cameras"></Cameras>
        </div>
        <div class="w-1/3">
          <Weather
            class="flex py-4 w-1/3"
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
