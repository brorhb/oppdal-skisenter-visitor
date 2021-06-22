<script>
  import { makeLiftsStore, updateLifts } from '../../stores/LiftsStore'
  import { onDestroy, onMount } from 'svelte'
  import List from '../../components/admin/List.svelte'
  import OFetch from '../../helpers/fetch'
  import config from '../../helpers/config'
  import { navigateTo } from 'svelte-router-spa'
  import liftTypes, { liftTypeToInt } from '../../helpers/lifts'
  import { makeZoneStore } from '../../stores/ZoneStore'

  let unsubscribe
  let liftsStore = makeLiftsStore()
  let lifts = []
  let zoneStore = makeZoneStore()
  let zones = []

  let name = ''
  let elevation = null
  let length = null
  let newLiftType = ''
  let zone = ''

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
  
  function editHandler(val) {
    navigateTo(`/admin/lifts/${val.detail.id}`)
  }

  async function deleteHandler(val) {
    if (confirm(`Sikker på at du vil slette ${val.detail.name}`)) {
      try {
        await OFetch(
          `${config.BASE_URL}/admin/lift/${val.detail.id}`,
          "DELETE"
        )
        await updateLifts()
        alert(`Slettet løype: ${val.detail.name}`)
      } catch(err) {
        console.warn(err)
      }
    }
  }

  async function createLift() {
    if (confirm("Sikker på at du vil lage en ny heis?")) {
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
        const id = res.message.id
        await updateLifts()
        navigateTo(`/admin/lifts/${id}`)
      } catch(err) {
        console.warn(err)
        alert("Noe gikk galt")
      }
    }
  }

  async function statusHandler(val) {
    const item = val.detail
    await OFetch(
      `${config.BASE_URL}/admin/toggle-status/lifts/${item.item}/${item.status}`,
      "PATCH"
    )
    await updateTracks()
  }
</script>
<div>
  <List
    items={lifts}
    columns={['map_name', 'name']}
    columnLabels={['id', 'Name']}
    on:edit={editHandler}
    on:delete={deleteHandler}
    on:toggleStatus={statusHandler}
  />

  <div class="lift-input">
    <h1>Legg til ny heis</h1>
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
    <button on:click="{createLift}" class="oppdal-button">Lagre</button>
  </div>
</div>

<style>
  .lift-input {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
  }
</style>