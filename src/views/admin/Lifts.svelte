<script>
    import { makeLiftsStore, updateLifts } from '../../stores/LiftsStore'
    import { onDestroy, onMount } from 'svelte'
    import OFetch from '../../helpers/fetch'
    import config from '../../helpers/config'
    import { toast } from '../../stores/Toast'
    import liftTypes, { liftTypeToInt } from '../../helpers/lifts'
    import { makeZoneStore } from '../../stores/ZoneStore'

    let unsubscribe
    let liftsStore = makeLiftsStore()
    let lifts = []
    let zoneStore = makeZoneStore()
    let zones = []
    let editItem = undefined;
    let name = ''
    let elevation = null
    let length = null
    let newLiftType = ''
    let zone = ''
    let zone_id = 1
    let show_create = false;
    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe()
            unsubscribe = null
        }
    });
        
    onMount(async () => {
        liftsStore.subscribe((data) => {
            lifts = data
        })
        zoneStore.subscribe((data) => {
            zones = data
        })
    })
    const createLift = async () => {
        try {
            const res = await OFetch(
                `${config.BASE_URL}/admin/lift/add`,
                "POST",
                {
                    "name": name,
                    "status": 2,
                    "start_position": null,
                    "end_position": null,
                    "elevation": elevation,
                    "length": length,
                    "type": liftTypeToInt[newLiftType],
                    "map_name": "",
                    "zone": zone
                }
            )
            toast.setToast('Ny heis lagret', 'success');
            await updateLifts()
        } catch(err) {
            console.warn(err)
            toast.setToast('Noe gikk galt', 'success');
        }
    }
    const editLift = async () => {
        editItem.status = editItem.status == "open" ? 1 : 2;
        editItem.type = liftTypeToInt[editItem.type];
        try {
            const res = await OFetch(
                `${config.BASE_URL}/admin/lift/${editItem.id}`,
                "PATCH", editItem
            )
            toast.setToast('Endring lagret', 'success');
            await updateLifts()
        } catch(err) {
            console.warn(err)
            toast.setToast('Noe gikk galt', 'success');
        }
        editItem = undefined;
    }
    const deleteLift = async (lift) => {
        try {
            await OFetch(
                `${config.BASE_URL}/admin/lift/${lift.id}`,
                "DELETE"
            )
            toast.setToast(`Heis slettet: ${lift.name}`, 'success');
            await updateLifts()
            
        } catch(err) {
            console.warn(err)
            toast.setToast('Noe gikk galt', 'error');
        }
    }
    const setStatus = async (lift, status) => {
        await OFetch(
            `${config.BASE_URL}/admin/toggle-status/lifts/${lift.id}/${status}`,
            "PATCH"
        )
        toast.setToast('Lagret', 'success');
        await updateLifts()
    }
    const setStatusAll = async (type) => {
        try {
            const res = await OFetch(
                `${config.BASE_URL}/admin/lift/status`,
                "PATCH", {type}
            )
            toast.setToast('Endring lagret', 'success');
            await updateLifts()
        } catch(err) {
            console.warn(err);
            toast.setToast('Noe gikk galt', 'error');
        }
    }
    const setStatusByZone = async (type, zone) => {
        try {
            const res = await OFetch(
                `${config.BASE_URL}/admin/lift/status-zone`,
                "PATCH", {type, zone}
            )
            toast.setToast('Endring lagret', 'success');
            await updateLifts()
        } catch(err) {
            console.warn(err);
            toast.setToast('Noe gikk galt', 'error');
        }
    }
</script>

<div>
    <h1 class="header">Heiser</h1>
    <div class="lifts-options">
        <div>
            <button class="admin-button" on:click="{() => setStatusAll("open")}">Åpne alle heiser</button>
            <button class="admin-button" on:click="{() => setStatusAll("closed")}">Steng alle heiser</button>
        </div>
        <select id="zone" class="oppdal-select" bind:value={zone_id}>
            {#each zones as zone}
                <option value={zone.id}>{zone.name}</option>
            {/each}
        </select>
        <div>
            <button class="admin-button" on:click="{() => setStatusByZone("open", zone_id)}">Åpne alle heiser i {zones.find(zone => zone.id == zone_id) ? zones.find(zone => zone.id == zone_id).name : "Finner ikke sone"}</button>
            <button class="admin-button" on:click="{() => setStatusByZone("closed", zone_id)}">Steng alle heiser i {zones.find(zone => zone.id == zone_id) ? zones.find(zone => zone.id == zone_id).name : "Finner ikke sone"}</button>
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
        {#each lifts as lift}
            <tr class="admin-table-row">
            <th>{lift.id}</th>
            <th>{lift.name}</th>
            <th><input checked={lift.status === "open"} type="radio" value="open" name={lift.id} on:click="{() => setStatus(lift, 1)}"/></th>
            <th><input checked={lift.status === "closed"} type="radio" value="open" name={lift.id} on:click="{() => setStatus(lift, 2)}"/></th>
            <th on:click="{() => editItem = lift}"><i class="fas fa-edit"></i></th>
            <th on:click="{() => deleteLift(lift)}"><i class="fas fa-trash-alt"></i></th>
            </tr>
        {/each}
        </tbody>
    </table>
    <div class="admin-add">
        <div class="show">
            <button on:click="{() => show_create = !show_create}">
                Opprett ny heis
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
        placeholder="Høyde"
        type="number"
        bind:value={elevation}
        />
        <input 
        class="oppdal-input"
        placeholder="Lengde"
        type="number"
        bind:value={length}
        />
        <select id="type" class="oppdal-select" bind:value={newLiftType}>
        {#each Object.keys(liftTypes) as e }
            <option value="{e}">{liftTypes[e]}</option>
        {/each}
        </select>
        <select id="zone" class="oppdal-select" bind:value={zone}>
        {#each zones as zone}
            <option value={zone.id}>{zone.name}</option>
        {/each}
        </select>
        <button on:click="{createLift}" class="admin-button">Lagre</button>
    {/if}
  </div>

  {#if editItem}
  <div class="admin-blur" on:click="{() => editItem = undefined}"></div>
  <div class="admin-edit">
      <h1 class="sub-header">Endre heis</h1>
    
      <label for="name">Navn</label>
      <input 
        class="oppdal-input"
        placeholder="Navn"
        type="text"
        name="name"
        bind:value={editItem.name}
        />
        <label for="elevation">Høyde</label>
        <input 
        class="oppdal-input"
        placeholder="Høyde"
        type="number"
        name="elevation"
        bind:value={editItem.elevation}
        />
        <label for="length">Lengde</label>
        <input 
        class="oppdal-input"
        placeholder="Lengde"
        type="number"
        name="length"
        bind:value={editItem.length}
        />
        <select id="type" class="oppdal-select" bind:value={editItem.lift_type}>
        {#each Object.keys(liftTypes) as e }
            <option value="{e}">{liftTypes[e]}</option>
        {/each}
        </select>
        <select id="zone" class="oppdal-select" bind:value={editItem.zone}>
        {#each zones as zone}
            <option value={zone.id}>{zone.name}</option>
        {/each}
        </select>
        
      <div>
          <button class="admin-button" on:click={editLift}>Lagre endring</button>
          <button class="admin-button" on:click={() => editItem = undefined}>Avbryt</button>
      </div>
  </div>
  {/if}
</div>

<style>
    .lifts-options {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .lifts-options:nth-child(n) {
        margin: 0 0 1rem 0;
    }
</style>