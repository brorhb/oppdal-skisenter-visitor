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
  
  function selectedTrack(event) {
    navigateTo(`/tracks/${event.detail.id}`)
  }
</script>
<List items={tracks} headers={['id', 'name', 'status']} headerLabels={['id', 'Name', 'Status']} />
