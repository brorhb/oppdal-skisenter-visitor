<script>
  import { makeTracksStore } from '../../stores/TrackStore'
  import { onDestroy, onMount } from 'svelte'
  import List from '../../components/admin/List.svelte';
  let unsubscribe
  let tracksStore = makeTracksStore()
  let tracks = []
  let innerWidth


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
    console.log(val.detail)
  }

  function deleteHandler(val) {
    console.log(val.detail)
  }
</script>
<List
  items={tracks}
  columns={['id', 'name', 'status']}
  columnLabels={['id', 'Name', 'Status']}
  on:edit={editHandler}
  on:delete={deleteHandler}
/>
