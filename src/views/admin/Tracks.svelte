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
  let unsubscribe
  let tracksStore = makeTracksStore()
  let liftsStore = makeLiftsStore()
  let zoneStore = makeZoneStore()
  let tracks = []
  let lifts = []
  let zones = []
  let toggleMap = false
  let name = ''
  let length = null
  let newTrackDifficulty = ''
  let zone = 1
  let connectedTracks = []
  let connectedLifts = []
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
    navigateTo(`/admin/tracks/${val.detail.id}`)
  }

  async function deleteHandler(val) {
    if (confirm(`Sikker på at du vil slette ${val.detail.name}`)) {
      try {
        await OFetch(
          `${config.BASE_URL}/admin/track/${val.detail.id}`,
          "DELETE"
        )
        await updateTracks()
        alert(`Slettet løype: ${val.detail.name}`)
      } catch(err) {
        console.warn(err)
      }
    }
  }

  async function statusHandler(val) {
    const item = val.detail
    await OFetch(
      `${config.BASE_URL}/admin/toggle-status/tracks/${item.item}/${item.status}`,
      "PATCH"
    )
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
        await updateTracks()
        navigateTo(`/admin/tracks/${id}`)
      } catch(err) {
        console.warn(err);
        alert("Noe gikk galt");
      }
    }
  }
  function clickMap(event) {
    console.log(event);
  }
</script>
<div>
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
    <button on:click="{() => toggleMap = !toggleMap}" class="oppdal-button">Plasser løype på kart</button>
    {#if toggleMap}
      <div class="list">
        <svg class='h-100 w-100' viewBox="0 0 1209 767" preserveAspectRatio="xMinYMin meet">
          <image on:click="{clickMap}" height="100%" href="../../assets/map.svg" alt="Løypekart"></image>
        </svg>
      </div>
    {/if}
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
</style>