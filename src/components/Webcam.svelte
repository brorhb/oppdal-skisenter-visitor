<script>
import { onMount, onDestroy } from "svelte"
import { makeZoneStore } from '../stores/ZoneStore'
import { makeCamerasStore } from '../stores/CamerasStore'

let zonesWithCamera = [];
let formattedCameras = [];
let selectedZoneId = 1;

let camerasStore = makeCamerasStore()
let cameras = []

let zoneStore = makeZoneStore()
let zones = []

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
{#if zonesWithCamera.length > 0}
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
                {#if zone} <!-- TODO: Find out why zone can be undefined ...-->
                <button on:click="{() => selectedZoneId = zone.id}" class="{zone.id == selectedZoneId ? "active" : ""}"><i class="fas fa-video"></i> {zone.name}</button>
                {/if}
            {/each}
        </div>
    </div>
</div>
{/if}

<style>
    .webcamera-container {
        position: relative;
        height: 100%;
    }
    .webcamera {
        width: 100%;
        height: 100%;
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
        overflow: scroll;
    }
    .buttons > button {
        width: 125px;
        height: 40px;
        background: #F4F8FF;
        border: none;
        box-sizing: border-box;
        border-radius: 25px;
        margin-right: 11px;
        color: #2C3B6C;
    }
    .buttons > button:hover   {
        background: #2C3B6C;
        color: #F4F8FF;
    }
    .buttons > .active {
        background: #E48D42;
        border: 2px solid #F08532;
        color: #F4F8FF;
    }   
    .buttons > .active:hover {
        background: #E48D42;
        border: 2px solid #F08532;
        color: #F4F8FF;
    }   
    @media only screen and (max-width: 1000px) {
        .webcamera-container {
            width: 100%;
            min-height: 500px;
        }
    }

</style>