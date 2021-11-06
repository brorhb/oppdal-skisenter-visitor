<script>
  import { makeCamerasStore } from '../stores/CamerasStore'
  import { onDestroy, onMount } from 'svelte'

  export let currentRoute
  let camerasStore = makeCamerasStore()
  let cameras = []

  let unsubscribe

  $: formattedCameras = cameras.map(camera => {
      if(camera.url.includes("${PARENT}")) camera.url = camera.url.replace("${PARENT}", window.location.host)
      return camera
  })

  $: camera = formattedCameras.find(camera => camera.id == currentRoute.name.split("/")[currentRoute.name.split("/").length - 1])

  onMount(() => {
    unsubscribe = camerasStore.subscribe((data) => {
        cameras = data
    })
  })

  onDestroy(() => {
      if(unsubscribe) {
          unsubscribe()
          unsubscribe = null
      }
  })
</script>
<div style="height: 100%; width: 100%;">
  {#if camera}
    <iframe
      title={camera.title}
      src={camera.url}
      frameborder="0"
      allowfullscreen="true"
      scrolling="no"
      height="100%"
      width="100%"
    ></iframe>
  {/if}
</div>