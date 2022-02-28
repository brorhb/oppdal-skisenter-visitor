<script>
  import { onMount, onDestroy } from "svelte";
  import { makeCamerasStore } from "../stores/CamerasStore";

  let camerasStore = makeCamerasStore();
  let cameras = [];
  let unsubscribe;

  let activeCamera = null;

  $: formattedCameras = cameras.map((camera) => {
    if (camera.url.includes("${PARENT}"))
      camera.url = camera.url.replace("${PARENT}", window.location.host);
    if (!activeCamera) activeCamera = cameras[0];
    return camera;
  });

  onMount(() => {
    unsubscribe = camerasStore.subscribe((data) => {
      cameras = data;
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });
</script>

{#if activeCamera}
  <div class="w-full h-full dark:bg-gray-900 rounded-xl px-2">
    <div class="flex flex-col items-start w-full">
      <iframe
        title={activeCamera.name}
        src={activeCamera.url}
        class="rounded-2xl"
        frameborder="0"
        allowfullscreen="true"
        scrolling="no"
        height="100%"
        width="100%"
      />
      <div class="flex flex-row">
        {#each formattedCameras as camera}
          <button
            on:click={() => (activeCamera = camera)}
            class={`py-2 px-4 mt-2 rounded-full ${
              camera.id === activeCamera.id
                ? "bg-yellow-600 dark:bg-yellow-700 text-white"
                : "bg-gray-200 dark:bg-gray-900"
            }`}
          >
            {camera.name}
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}
