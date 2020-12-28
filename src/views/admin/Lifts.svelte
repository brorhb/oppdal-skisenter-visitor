<script>
  import { makeLiftsStore, updateLifts } from '../../stores/LiftsStore'
  import { onDestroy, onMount } from 'svelte'
  import List from '../../components/admin/List.svelte'
  import OFetch from '../../helpers/fetch'
  import config from '../../helpers/config'
  import { navigateTo } from 'svelte-router-spa'
  let unsubscribe
  let liftsStore = makeLiftsStore()
  let lifts = []
  let creating = false


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

  async function createTrack() {
    if (confirm("Sikker på at du vil lage en ny heis?")) {
      try {
        const res = await OFetch(
          `${config.BASE_URL}/admin/lift/add`,
          "POST",
          {
              "name": "Navn",
              "status": 2,
              "start_position": null,
              "end_position": null,
              "elevation": 271,
              "length": 1054,
              "type": 2,
              "map_name": "",
              "zone": 1
          }
        )
        console.log(res)
        const id = res.message.id
        await updateLifts()
        navigateTo(`/admin/lifts/${id}`)
      } catch(err) {
        console.warn(err)
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
<div class="flex flex-column w-100 h-100 items-center">
  <div class={`w-100 mw8 f6 link dim br3 ph3 pv2 mb2 white ${creating ? "gray" : "bg-dark-blue"} pointer`} on:click={!creating ? createTrack : null}>Ny heis</div>
  <List
    items={lifts}
    columns={['map_name', 'name']}
    columnLabels={['id', 'Name']}
    on:edit={editHandler}
    on:delete={deleteHandler}
    on:toggleStatus={statusHandler}
  />
</div>
