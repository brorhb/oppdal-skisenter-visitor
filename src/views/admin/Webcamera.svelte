<script>
    import { makeCamerasStore, updateCameras } from '../../stores/CamerasStore'
    import { makeZoneStore } from '../../stores/ZoneStore'
    import { onDestroy, onMount } from 'svelte'
    import OFetch from '../../helpers/fetch'
    import config from '../../helpers/config'
    import { toast } from '../../stores/Toast'
    import { navigateTo } from 'svelte-router-spa'
    let unsubscribe
    let cameraStore = makeCamerasStore()
    let zoneStore = makeZoneStore()
    let cameras = []
    let zones = []

    let addItem = false;
    let newItem = {
        name: '',
        zone: 1,
        channel: ''
    }
    let editChannel = '';
    let editItem = undefined;
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
    const openEdit = (camera) =>  {
        let urlSearchParams = new URLSearchParams(camera.url.split('?')[1]);
        let params = Object.fromEntries(urlSearchParams.entries());
        editChannel = params['channel']
        editItem = camera;
    }
    const editCamera = async () => {
        try {
            editItem.url = `https://player.twitch.tv/?channel=${editChannel}&parent=` + '${PARENT}&autoplay=true';
            const res = await OFetch(
                `${config.BASE_URL}/admin/camera/${editItem.id}`,
                "PATCH", editItem
            )
            await updateCameras()
            toast.setToast('Webkamera endret', 'success');
        } catch(err) {
            console.warn(err);
            toast.setToast('En feil har oppstått', 'error');
        }
        editItem = undefined;
    }

    const deleteCamera = async (camera) => {
        try {
            const res = await OFetch(
                `${config.BASE_URL}/admin/camera/${camera.id}`,
                "DELETE"
            )
            await updateCameras()
            toast.setToast('Webkamera slettet', 'success');
        } catch(err) {
            console.warn(err);
            toast.setToast('En feil har oppstått', 'error');
        }
    }

    const addCamera = async () => {
        try {
            const res = await OFetch(
                `${config.BASE_URL}/admin/camera/add`,
                "POST",
                {
                    "name": newItem.name,
                    "url": `https://player.twitch.tv/?channel=${newItem.channel}&parent=` + '${PARENT}&autoplay=true',
                    "zone": newItem.zone,
                }
            )
            await updateCameras()
            toast.setToast('Nytt webkamera lagt til', 'success');
        } catch(err) {
            console.warn(err);
            toast.setToast('En feil har oppstått', 'error');
        }
        addItem = false;
    }
</script>

<div class="edit-webcamera">
    <h2 class="pointer" on:click="{() => navigateTo('/admin/instillinger')}"><i class="fas fa-angle-left"></i> Webkamera</h2>
    <table class="admin-table">
        <tbody>
        {#each cameras as camera}
            <tr class="admin-table-row">
            <th><p>{camera.id}</p></th>
            <th><p>{camera.name}</p></th>
            <th><p>{zones[camera.zone-1] ? zones[camera.zone-1].name : camera.zone}</p></th>
            <th on:click="{() => openEdit(camera)}"><i class="fas fa-edit"></i></th>
            <th on:click="{() => deleteCamera(camera)}"><i class="fas fa-trash-alt"></i></th>
            </tr>
        {/each}
        </tbody>
    </table>
    
    <button class="admin-button" on:click="{() => addItem = true}">+ Legg til webkamera</button>

    {#if editItem}
    <div class="admin-blur" on:click="{() => editItem = undefined}"></div>
    <div class="admin-edit">
        <h1 class="sub-header">Rediger webkamera</h1>
        <input class="oppdal-input" type="text" name="name" placeholder="Navn på kamera" bind:value={editItem.name} />
        <input class="oppdal-input" type="text" name="twitchChannel" placeholder="Twitch channel" bind:value={editChannel} />
        <select id="zone" class="oppdal-select" bind:value={editItem.zone}>
            {#each zones as zone}
            <option value={zone.id}>{zone.name}</option>
            {/each}
        </select>
        <div>
            <button class="admin-button" on:click={editCamera}>Lagre endring</button>
            <button class="admin-button" on:click={() => editItem = undefined}>Avbryt</button>
        </div>
    </div>
    {/if}

    {#if addItem}
    <div class="admin-blur" on:click="{() => addItem = false}"></div>
    <div class="admin-edit">
        <h1 class="sub-header">Legg til webkamera</h1>
        <input class="oppdal-input" type="text" name="name" placeholder="Navn på kamera" bind:value={newItem.name} />
        <input class="oppdal-input" type="text" name="twitchChannel" placeholder="Twitch channel" bind:value={newItem.channel} />
        <select id="zone" class="oppdal-select" bind:value={newItem.zone}>
            {#each zones as zone}
            <option value={zone.id}>{zone.name}</option>
            {/each}
        </select>
        <div>
            <button class="admin-button" on:click={addCamera}>Opprett ny</button>
            <button class="admin-button" on:click={() => addItem = false}>Avbryt</button>
        </div>
    </div>
    {/if}
</div> 

<style>
    .pointer {
        cursor: pointer;
    }
    .edit-webcamera {
        padding: 1rem 0;
    }
    .edit-webcamera > h2, table, button {
        margin: 1rem 0;
    }
    
    @media only screen and (max-width: 600px) {
        .edit-webcamera {
            padding: 1rem;
        }
    }
    
</style>