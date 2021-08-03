<script>
import { onMount, onDestroy } from "svelte"
import { makeZoneStore } from '../stores/ZoneStore'
import { makeCamerasStore } from '../stores/CamerasStore'

let camerasStore = makeCamerasStore()
let cameras = []

let zoneStore = makeZoneStore()
let zones = []

let selectedZoneId = 1;
let unsubscribe

$: formattedCameras = cameras.map(camera => {
    if(camera.url.includes("${PARENT}")) camera.url = camera.url.replace("${PARENT}", window.location.host)
    return camera
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

<div class="webcamera-container">   
    <div class="webcamera">
        {#each formattedCameras as camera}
        {#if camera.zone == selectedZoneId}
            <div class="embed">
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
        {/if}
        {/each}
        <div class="buttons">
            {#each zonesWithCamera as zone}
                <button on:click="{() => selectedZoneId = zone.id}" class="{zone.id === selectedZoneId ? "active" : ""}"><i class="fas fa-video"></i> {zone.name}</button>
            {/each}
        </div>
    </div>
</div>

<style>
    .webcamera-container {
        position: relative;
    }
    .webcamera {
        /** Temp fixed width and height*/
        width: 800px;
        height: 600px;
    }
    .embed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .embed > iframe {
        border-radius: 9px;
    }
    .buttons {
        position: absolute;
        left: 17px;
        bottom: 21px;
        z-index: 1000;
        display: flex;
    }
    .buttons > button {
        width: 120px;
        height: 40px;
        background: #F4F8FF;
        border: 2px solid #2C3B6C;
        box-sizing: border-box;
        border-radius: 25px;
        margin-right: 11px;
        color: #2C3B6C;
    }
    .buttons > .active {
        background: #E48D42;
        border: 2px solid #F08532;
        color: #F4F8FF;
    }   
</style>