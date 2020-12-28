<script>
  import { makeTracksStore, updateTracks } from '../../stores/TrackStore'
  import { onDestroy, onMount } from 'svelte'
  import List from '../../components/admin/List.svelte'
  import OFetch from '../../helpers/fetch'
  import config from '../../helpers/config'
  import { navigateTo } from 'svelte-router-spa'
  let unsubscribe
  let tracksStore = makeTracksStore()
  let tracks = []
  let creating = false


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
            "name": "Navn",
            "connected_tracks": [],
            "season": 2,
            "status": 2,
            "length": 1500,
            "difficulty": 1,
            "lifts": [],
            "coords": null,
            "zone": 1
          }
        )
        const id = res.message.id
        await updateTracks()
        navigateTo(`/admin/tracks/${id}`)
      } catch(err) {

      }
    }
  }
</script>
<div class="flex flex-column w-100 h-100 items-center">
  <div class={`w-100 mw8 f6 link dim br3 ph3 pv2 mb2 white ${creating ? "gray" : "bg-dark-blue"} pointer`} on:click={!creating ? createTrack : null}>Ny løype</div>
  <List
    items={tracks}
    columns={['id', 'name']}
    columnLabels={['id', 'Name']}
    on:edit={editHandler}
    on:delete={deleteHandler}
    on:toggleStatus={statusHandler}
  />
</div>
