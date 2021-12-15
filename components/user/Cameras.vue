<template>
  <div v-if="activeCamera" class="w-full h-full dark:bg-gray-900 rounded-xl px-2">
    <div class="flex flex-col items-start w-full">
      <iframe
      :title="activeCamera.name"
      :src="url"
      class="rounded-2xl"
      frameborder="0"
      allowfullscreen="true"
      scrolling="no"
      height="100%"
      width="100%"
    ></iframe>
    <div class="flex flex-row">
      <button
      v-for="(camera, index) in cameras"
      :key="index"
      @click="() => (activeCamera = camera)"
      :class="`py-2 px-4 mt-2 rounded-full ${camera.id === activeCamera.id ? 'bg-yellow-600 dark:bg-yellow-700 text-white' : 'bg-gray-200 dark:bg-gray-900'}`"
    >
      {{ camera.name }}
    </button>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["cameras", "weatherPredictions"],
  data() {
    return {
      activeCamera: null,
    };
  },
  watch: {
    cameras: function (newCameras) {
      if (!this.activeCamera) {
        this.activeCamera = newCameras[0];
      }
    },
  },
  mounted() {
    if (!this.activeCamera) {
      this.activeCamera = this.cameras[0];
    }
  },
  computed: {
    url() {
      return this.activeCamera?.url.replace("${PARENT}", window.location.host);
    },
  },
};
</script>
<style>
.orange {
  background-color: #E48D42;
}
</style>
