<script>
import { onMount, onDestroy } from "svelte"
import { makeZoneStore } from '../stores/ZoneStore'
import { makeCamerasStore } from '../stores/CamerasStore'

let camerasStore = makeCamerasStore()
let cameras = []

let zoneStore = makeZoneStore()
let zones = []
let activeZone = false

let unsubscribe

$: activeCameras = (activeZone ? cameras
    .filter((cam) => cam.zone === activeZone)
  : cameras).map((cam) => {
    if (cam.url.includes("${PARENT}")) {
      cam.url = cam.url.replace("${PARENT}", window.location.host)
    }
    return cam
  })

$: zonesWithCamera = cameras.reduce((acc, curr) => {
  const exists = acc.find((item) => item?.id === curr.zone)
  if (exists) return acc
  else {
    acc.push(zones.find((zone) => zone.id === curr.zone))
    return acc
  }
}, [])

onMount(() => {
  zoneStore.subscribe((data) => {
    zones = data
  })
  camerasStore.subscribe((data) => {
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
<div class="flex flex-column w-100 h-100">
  {#if cameras.length > 1}
    <div class="flex flex-wrap justify-center items-center mb1">
      <div
        class={`pa2 tc ${!activeZone ? "bg-black-30 white" : "bg-black-05"} mh1 fw5 pointer mt1`}
        on:click={() => activeZone = false}
      >
        Alle
      </div>
      {#each zonesWithCamera as zone}
        <div
          class={`pa2 tc ${activeZone === zone.id ? "bg-black-30 white" : "bg-black-05"} mh1 fw5 pointer mt1`}
          on:click={() => activeZone = zone.id}
        >
          {zone.name}
        </div>
      {/each}
    </div>
  {/if}
  <div class="flex flex-wrap w-100 h-100 overflow-auto">
    {#each activeCameras as camera}
      <div class={`w-100 ${activeCameras.length > 1 ? "w-50-ns" : ""}`}>
        <iframe
          title={camera.title}
          src={camera.url}
          frameborder="0"
          allowfullscreen="true"
          scrolling="no"
          height="100%"
          width="100%"
        ></iframe>
      </div>
    {/each}
  </div>
</div>