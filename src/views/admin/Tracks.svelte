<script>
  import { makeTracksStore, updateTracks } from '../../stores/TrackStore'
  import { makeLiftsStore } from '../../stores/LiftsStore'
  import { makeZoneStore } from '../../stores/ZoneStore'
  import { onDestroy, onMount } from 'svelte'
  import List from '../../components/admin/List.svelte'
  import OFetch from '../../helpers/fetch'
  import config from '../../helpers/config'
  import { navigateTo } from 'svelte-router-spa'
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
  
  function editHandler(val) {
    navigateTo(`/admin/loyper/${val.detail.id}`)
  }

  async function deleteHandler(val) {
    if (confirm(`Sikker på at du vil slette ${val.detail.name}`)) {
      try {
        await OFetch(
          `${config.BASE_URL}/admin/track/${val.detail.id}`,
          "DELETE"
        )
        toast.setToast(`Slettet løype: ${val.detail.name}`, 'success');
        await updateTracks()
      } catch(err) {
        console.warn(err)
        toast.setToast('Noe gikk galt', 'error');
      }
    }
  }

  async function statusHandler(val) {
    const item = val.detail
    await OFetch(
      `${config.BASE_URL}/admin/toggle-status/tracks/${item.item}/${item.status}`,
      "PATCH"
    )
    toast.setToast('Lagret', 'success');
    await updateTracks()
  }

  async function createTrack() {        
    if (confirm("Sikker på at du vil lage en ny løype?")) {
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
        const id = res.message.id
        toast.setToast('Ny løype lagret', 'success');
        await updateTracks()
        navigateTo(`/admin/loyper/${id}`)
      } catch(err) {
        console.warn(err);
        toast.setToast('Noe gikk galt', 'error');
      }
    }
  }

  async function setStatusAll(type) {
    try {
        const res = await OFetch(
          `${config.BASE_URL}/admin/track/status`,
          "PATCH",
          {
            type
          }
        )
        toast.setToast('Endring lagret', 'success');
        await updateTracks()
      } catch(err) {
        console.warn(err);
        toast.setToast('Noe gikk galt', 'error');
      }
  }
  async function setStatusByZone(type, zone) {
    try {
        const res = await OFetch(
          `${config.BASE_URL}/admin/track/status-zone`,
          "PATCH",
          {
            type, zone
          }
        )
        toast.setToast('Endring lagret', 'success');
        await updateTracks()
      } catch(err) {
        console.warn(err);
        toast.setToast('Noe gikk galt', 'error');
      }
  }
</script>
<div>
  <div class="actions">
    <h1>Valg for alle løyper</h1>
    <button class="oppdal-button" on:click="{() => setStatusAll("open")}">Åpne alle løyper</button>
    <button class="oppdal-button" on:click="{() => setStatusAll("closed")}">Lukk alle løyper</button>
    <h1>Valg for løyper i valgt sone</h1>
    <select id="zone" class="oppdal-select" bind:value={zone_id}>
      {#each zones as zone}
        <option value={zone.id}>{zone.name}</option>
      {/each}
    </select>
    <button class="oppdal-button" on:click="{() => setStatusByZone("open", zone_id)}">Åpne alle løyper i {zones.find(zone => zone.id == zone_id) ? zones.find(zone => zone.id == zone_id).name : "Finner ikke sone"}</button>
    <button class="oppdal-button" on:click="{() => setStatusByZone("closed", zone_id)}">Lukk alle løyper i {zones.find(zone => zone.id == zone_id) ? zones.find(zone => zone.id == zone_id).name : "Finner ikke sone"}</button>
</div>
  <List
    items={tracks}
    columns={['id', 'name']}
    columnLabels={['id', 'Name']}
    on:edit={editHandler}
    on:delete={deleteHandler}
    on:toggleStatus={statusHandler}
  />
  <div class="track-input">
    <h1>Opprett ny løype</h1>
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
    <div class="list">
      <select name="lifts" id="lifts" class="oppdal-select" multiple bind:value={connectedLifts}>
        {#each lifts as lift}
          <option value="{lift.id}">{lift.name}</option>
        {/each}
      </select>
    </div>
    
    <label for="lifts">Marker tilhørende løyper</label>
    <div class="list">
      <select name="tracks" id="tracks" class="oppdal-select" multiple bind:value={connectedTracks}>
        {#each tracks as track}
          <option value="{track.id}">{track.name}</option>
        {/each}
      </select>
    </div>
    <button on:click="{createTrack}" class="oppdal-button">Lagre</button>
  </div>
</div>

<style>
  .track-input {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
  }
  .actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .actions > h1 {
    text-align: center;
  }
</style>