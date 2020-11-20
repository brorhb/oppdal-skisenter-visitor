<script>
  import Map from "../components/Map.svelte"
  import { makeTracksStore } from "../stores/TrackStore"
  import { makeLiftsStore } from "../stores/LiftsStore"
  import { onDestroy, onMount } from 'svelte'
  import { navigateTo } from 'svelte-router-spa'
  let unsubscribe
  let tracksStore = makeTracksStore()
  let liftsStore = makeLiftsStore()
  let lifts = []
  let tracks = []
  let items = []
  onDestroy(() => {
    if(unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
	});
	
	onMount(async () => {
		tracksStore.subscribe((data) => {
      tracks = data
      items = [...lifts, ...tracks]
    })
    liftsStore.subscribe((data) => {
      lifts = data
      items = [...lifts, ...tracks]
		})
  })

  function selectedTrack(obj) {
    navigateTo(`/tracks/${obj.detail.id}`)
  }
</script>
<div class="flex h-100 w-100">
  <Map {items} on:select={selectedTrack} />
</div>
