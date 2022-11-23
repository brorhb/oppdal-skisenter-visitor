<script>
    import { makeTracksStore, updateTracks } from '../../stores/TrackStore'
    import { makeLiftsStore } from '../../stores/LiftsStore'
    import { makeZoneStore } from '../../stores/ZoneStore'
    import { onDestroy, onMount } from 'svelte'
    import OFetch from '../../helpers/fetch'
    import config from '../../helpers/config'
    import { difficulty, difficultyToInt } from '../../helpers/difficulty'
    import { toast } from '../../stores/Toast'
    let unsubscribe
    let tracksStore = makeTracksStore()
    let liftsStore = makeLiftsStore()
    let zoneStore = makeZoneStore()
    let tracks = []
    let lifts = []
    let zones = []
    let name = ''
    let length = null
    let newTrackDifficulty = ''
    let zone = 1
    let connectedTracks = []
    let connectedLifts = []
    let zone_id = 1;
    let show_create = false;
    let editItem = undefined;
    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe()
            unsubscribe = null
        }
    });

    onMount(async () => {
        tracksStore.subscribe((data) => {
            tracks = data
        })
        liftsStore.subscribe((data) => {
            lifts = data
        })
        zoneStore.subscribe((data) => {
            zones = data
        })
    })
    const editTrack = async () => {
        editItem.status = editItem.status == "open" ? 1 : 2;
        try {
            const res = await OFetch(
                `${config.BASE_URL}/admin/track/${editItem.id}`,
                "PATCH", editItem
            )
            toast.setToast('Endring lagret', 'success');
            await updateTracks()
        } catch(err) {
            console.warn(err)
            toast.setToast('Noe gikk galt', 'success');
        }
        editItem = undefined;
    }
    const deleteTrack = async (track) => {
        try {
            await OFetch(
                `${config.BASE_URL}/admin/track/${track.id}`,
                "DELETE"
            )
            toast.setToast(`Slettet løype: ${track.name}`, 'success');
            await updateTracks()
        } catch(err) {
            console.warn(err)
            toast.setToast('Noe gikk galt', 'error');
        }
    }
    const setStatus = async (track, status) => {
        await OFetch(
            `${config.BASE_URL}/admin/toggle-status/tracks/${track.id}/${status}`,
            "PATCH"
        )
        toast.setToast('Lagret', 'success');
        await updateTracks()
    }
    const setStatusAll = async (type) => {
        try {
            const res = await OFetch(
                `${config.BASE_URL}/admin/track/status`,
                "PATCH", {type}
            )
            toast.setToast('Endring lagret', 'success');
            await updateTracks()
        } catch(err) {
            console.warn(err);
            toast.setToast('Noe gikk galt', 'error');
        }
    }
    const setStatusByZone = async (type, zone) => {
        try {
            const res = await OFetch(
                `${config.BASE_URL}/admin/track/status-zone`,
                "PATCH", {type, zone}
            )
            toast.setToast('Endring lagret', 'success');
            await updateTracks()
        } catch(err) {
            console.warn(err);
            toast.setToast('Noe gikk galt', 'error');
        }
    }
    const createTrack = async () => {
        try {
            const res = await OFetch(
            `${config.BASE_URL}/admin/track/add`,
            "POST",
            {
                "name": name,
                "connected_tracks": connectedTracks,
                "season": 2,
                "status": 2,
                "length": length,
                "difficulty": difficultyToInt[newTrackDifficulty],
                "lifts": connectedLifts,
                "coords": null,
                "zone": zone
            }
            )
            toast.setToast('Ny løype lagret', 'success');
            await updateTracks()
        } catch(err) {
            console.warn(err);
            toast.setToast('Noe gikk galt', 'error');
        }
    }
</script>


<div>
    <h1 class="header">Løyper</h1>
    <div class="tracks-options">
        <div>
            <button class="admin-button" on:click="{() => setStatusAll("open")}">Åpne alle løyper</button>
            <button class="admin-button" on:click="{() => setStatusAll("closed")}">Steng alle løyper</button>
        </div>
        <select id="zone" class="oppdal-select" bind:value={zone_id}>
            {#each zones as zone}
                <option value={zone.id}>{zone.name}</option>
            {/each}
        </select>
        <div>
            <button class="admin-button" on:click="{() => setStatusByZone("open", zone_id)}">Åpne alle løyper i {zones.find(zone => zone.id == zone_id) ? zones.find(zone => zone.id == zone_id).name : "Finner ikke sone"}</button>
            <button class="admin-button" on:click="{() => setStatusByZone("closed", zone_id)}">Steng alle løyper i {zones.find(zone => zone.id == zone_id) ? zones.find(zone => zone.id == zone_id).name : "Finner ikke sone"}</button>
        </div>
    </div>
    <table class="admin-table">
        <thead class="admin-table-header">
            <tr class="admin-table-row">
                <th>ID</th>
                <th>Navn</th>
                <th>Åpen</th>
                <th>Lukket</th>
                <th>Endre</th>
                <th>Slett</th>
            </tr>
        </thead>
        <tbody>
        {#each tracks as track}
            <tr class="admin-table-row">
            <th>{track.map_name}</th>
            <th>{track.name}</th>
            <th><input checked={track.status === "open"} type="radio" value="open" name={track.id} on:click="{() => setStatus(track, 1)}"/></th>
            <th><input checked={track.status === "closed"} type="radio" value="open" name={track.id} on:click="{() => setStatus(track, 2)}"/></th>
            <th on:click="{() => editItem = track}"><i class="fas fa-edit"></i></th>
            <th on:click="{() => deleteTrack(track)}"><i class="fas fa-trash-alt"></i></th>
            </tr>
        {/each}
        </tbody>
    </table>

    <div class="admin-add">
        <div class="show">
            <button on:click="{() => show_create = !show_create}">
                Opprett ny løype 
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
        placeholder="Lengde"
        type="number"
        bind:value={length}
        />
        <select id="difficulty" class="oppdal-select" bind:value={newTrackDifficulty}>
        {#each Object.keys(difficulty) as e }
            <option value="{e}">{difficulty[e]}</option>
        {/each}
        </select>
        <select id="zone" class="oppdal-select" bind:value={zone}>
        {#each zones as zone}
            <option value={zone.id}>{zone.name}</option>
        {/each}
        </select>
        <label for="lifts">Marker tilhørende heiser</label>
        <select name="lifts" id="lifts" class="oppdal-select" multiple bind:value={connectedLifts}>
            {#each lifts as lift}
            <option value="{lift.id}">{lift.name}</option>
            {/each}
        </select>
        
        <label for="lifts">Marker tilhørende løyper</label>
        <select name="tracks" id="tracks" class="oppdal-select" multiple bind:value={connectedTracks}>
            {#each tracks as track}
            <option value="{track.id}">{track.name}</option>
            {/each}
        </select>
        <button on:click="{createTrack}" class="admin-button">Lagre</button>
        {/if}
    </div>

    {#if editItem}
    <div class="admin-blur" on:click="{() => editItem = undefined}"></div>
    <div class="admin-edit">
        <h1 class="sub-header">Endre løype</h1>
        
        <label for="name">Navn</label>
        <input 
        class="oppdal-input"
        placeholder="Navn"
        type="text"
        name="name"
        bind:value={editItem.name}
        />
        <label for="length">Lengde</label>
        <input 
        class="oppdal-input"
        placeholder="Lengde"
        type="number"
        name="length"
        bind:value={editItem.length}
        />
        <select id="difficulty" class="oppdal-select" bind:value={editItem.difficulty}>
        {#each Object.keys(difficulty) as e }
            <option value="{e}">{difficulty[e]}</option>
        {/each}
        </select>

        <select id="zone" class="oppdal-select" bind:value={editItem.zone}>
        {#each zones as zone}
            <option value={zone.id}>{zone.name}</option>
        {/each}
        </select>
            
        <div>
            <button disabled class="admin-button" on:click={editTrack}>Lagre endring</button>
            <button class="admin-button" on:click={() => editItem = undefined}>Avbryt</button>
        </div>
    </div>
    {/if}
</div>

<style>
    .tracks-options {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .tracks-options:nth-child(n) {
        margin: 0 0 1rem 0;
    }
</style>