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
        updateTracks()
      } catch(err) {
        console.warn(err)
      }
    }
  }
</script>
<List
  items={tracks}
  columns={['id', 'name', 'status']}
  columnLabels={['id', 'Name', 'Status']}
  on:edit={editHandler}
  on:delete={deleteHandler}
/>
