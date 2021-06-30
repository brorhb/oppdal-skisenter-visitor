<script>
    import { makeCamerasStore, updateCameras } from '../../stores/CamerasStore'
    import { makeZoneStore } from '../../stores/ZoneStore'
    import { onDestroy, onMount } from 'svelte'
    import OFetch from '../../helpers/fetch'
    import config from '../../helpers/config'
    import { navigateTo } from 'svelte-router-spa';

    let unsubscribe
    let cameraStore = makeCamerasStore()
    let zoneStore = makeZoneStore()
    let cameras = []
    let zones = []

    let name;
    let twitchChannel;
    let zone = 1;
    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe()
            unsubscribe = null
        }
    });
        
    onMount(async () => {
        cameraStore.subscribe((data) => {
            cameras = data
        })
        zoneStore.subscribe((data) => {
            zones = data
        })
    })

    function editCamera(camera) {
        navigateTo(`/admin/webkamera/${camera.id}`)
    }

    async function deleteCamera(camera) {
        if (confirm(`Sikker på at du vil slette webkamera med navn ${camera.name}?`)) {
            try {
                const res = await OFetch(
                `${config.BASE_URL}/admin/camera/${camera.id}`,
                "DELETE"
                )
                await updateCameras()
            } catch(err) {
                console.warn(err);
                alert("Noe gikk galt");
            }
        }
    }

    async function addWebcamera() {
        if (confirm("Sikker på at du vil legge til nytt webkamera?")) {
            try {
                const res = await OFetch(
                `${config.BASE_URL}/admin/camera/add`,
                "POST",
                {
                    "name": name,
                    "url": `https://player.twitch.tv/?channel=${twitchChannel}&parent=` + '${PARENT}&autoplay=true',
                    "zone": zone,
                }
                )
                await updateCameras()
            } catch(err) {
                console.warn(err);
                alert("Noe gikk galt");
            }
        }
    }
</script>

<div>
    <table class="f6 w-100 mw8 center">
        <thead>
            <tr class="stripe-dark">
                <th>ID</th>
                <th>Navn</th>
                <th>URL</th>
                <th>Lokasjon</th>
                <th>Endre</th>
                <th>Slett</th>
            </tr>
        </thead>
        <tbody class="lh-copy">
        {#each cameras as camera}
            <tr class="stripe-dark">
            <th>{camera.id}</th>
            <th>{camera.name}</th>
            <th>{camera.url}</th>
            <th>{zones[camera.zone-1] ? zones[camera.zone-1].name : camera.zone}</th>
            <th on:click="{() => editCamera(camera)}"><i class="fas fa-edit"></i></th>
            <th on:click="{() => deleteCamera(camera)}"><i class="fas fa-trash-alt"></i></th>
            </tr>
        {/each}
        </tbody>
    </table>

    <div class="webcamera-input">
        <h1>Legg til nytt webkamera</h1>
        <input 
          class="oppdal-input"
          placeholder="Navn"
          type="text"
          bind:value={name}
        />
        <input 
          class="oppdal-input"
          placeholder="Twitch channel - for eksempel oppdal_skisenter"
          type="text"
          bind:value={twitchChannel}
        />
        <select id="zone" class="oppdal-select" bind:value={zone}>
          {#each zones as zone}
            <option value={zone.id}>{zone.name}</option>
          {/each}
        </select>
        <button on:click="{addWebcamera}" class="oppdal-button">Lagre</button>
    </div>
</div>  
<style>
    .webcamera-input {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-direction: column;
    }
</style>
