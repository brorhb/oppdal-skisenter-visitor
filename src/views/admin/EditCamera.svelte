<script>
    export let currentRoute
    import { navigateTo } from 'svelte-router-spa'
    import { makeZoneStore } from "../../stores/ZoneStore"
    import OFetch from "../../helpers/fetch"
    import config from "../../helpers/config"
    import { makeCamerasStore } from '../../stores/CamerasStore'
    import { onDestroy, onMount } from 'svelte'
    import { toast } from '../../stores/Toast'

    let unsubscribe
    let zoneStore = makeZoneStore()
    let cameraStore = makeCamerasStore()
    let cameras = []
    let camera = undefined;
    let zones = []
    let twitchChannel;
    $: cameraId = currentRoute.name.split("/")[currentRoute.name.split("/").length -1]

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe()
            unsubscribe = null
        }
    });
        
    onMount(async () => {
        cameraStore.subscribe((data) => {
            cameras = data
            camera = cameras.find(camera => camera.id == cameraId)
            let urlSearchParams = new URLSearchParams(camera.url.split('?')[1]);
            let params = Object.fromEntries(urlSearchParams.entries());
            twitchChannel = params['channel']
        })
        zoneStore.subscribe((data) => {
            zones = data
        })
    })

    async function save() {
        try {
            camera.url = `https://player.twitch.tv/?channel=${twitchChannel}&parent=` + '${PARENT}&autoplay=true';
            const res = await OFetch(
            `${config.BASE_URL}/admin/camera/${camera.id}`,
            "PATCH", camera
            )
            toast.setToast('Nytt webkamera lagret', 'success');
            navigateTo("/admin/webcamera")
        } catch(err) {
            console.warn(err);
            toast.setToast('Noe gikk galt', 'error');
        }
    }

</script>

<div class="edit-webcamera">
    {#if camera !== undefined}
        <h1 class="oppdal-title">{camera.name}</h1>
        <input class="oppdal-input" bind:value="{camera.name}"/>
        <input class="oppdal-input" bind:value="{twitchChannel}"/>
        <select class="oppdal-select" bind:value="{camera.zone}">
            {#each zones as zone}
                <option value={zone.id}>{zone.name}</option>
            {/each}
        </select>
        <button on:click="{save}">Lagre</button>
        <button on:click="{() => navigateTo("/admin/webcamera")}">Angre</button>
    {/if}
</div>

<style>
    .edit-webcamera {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-direction: column;
    }
</style>