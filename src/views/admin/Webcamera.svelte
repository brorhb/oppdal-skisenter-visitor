<script>
    import { makeCamerasStore, updateCameras } from '../../stores/CamerasStore'
    import { makeZoneStore } from '../../stores/ZoneStore'
    import { onDestroy, onMount } from 'svelte'
    import OFetch from '../../helpers/fetch'
    import config from '../../helpers/config'
    import { toast } from '../../stores/Toast'
    let unsubscribe
    let cameraStore = makeCamerasStore()
    let zoneStore = makeZoneStore()
    let cameras = []
    let zones = []

    let name;
    let twitchChannel;
    let zone = 1;
    let show_create = false;
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

    const editCamera = async () => {
        try {
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

    const addWebcamera = async () => {
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
            toast.setToast('Nytt webkamera lagt til', 'success');
        } catch(err) {
            console.warn(err);
            toast.setToast('En feil har oppstått', 'error');
        }
    }
</script>

<div>
    <h1 class="header">Webkamera</h1>
    <table class="admin-table">
        <thead class="admin-table-header">
            <tr class="admin-table-row">
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
            <tr class="admin-table-row">
            <th>{camera.id}</th>
            <th>{camera.name}</th>
            <th>{camera.url}</th>
            <th>{zones[camera.zone-1] ? zones[camera.zone-1].name : camera.zone}</th>
            <th on:click="{() => editItem = camera}"><i class="fas fa-edit"></i></th>
            <th on:click="{() => deleteCamera(camera)}"><i class="fas fa-trash-alt"></i></th>
            </tr>
        {/each}
        </tbody>
    </table>

    <div class="admin-add">
        <div class="admin-add">
            <div class="show">
                <button on:click="{() => show_create = !show_create}">
                    Legg til nytt webkamera
                    <i class="fas fa-caret-{show_create ? "up" : "down"}"></i>                
                </button>
            </div>
        {#if show_create}
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
            <button on:click="{addWebcamera}" class="admin-button">Lagre</button>
        {/if}
      </div>        
    </div>

    {#if editItem}
    <div class="admin-blur" on:click="{() => editItem = undefined}"></div>
    <div class="admin-edit">
        <h1 class="sub-header">Endre webkamera</h1>
        <input class="oppdal-input" type="text" name="name" placeholder="Navn..." bind:value={editItem.name} />
        <input class="oppdal-input" type="text" name="twitchChannel" placeholder="Twitch URL" bind:value={editItem.url} />
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
</div> 
