<script>
  import { makeLiftsStore, updateLifts } from '../../stores/LiftsStore'
  import { makeTracksStore, updateTracks } from '../../stores/TrackStore'
  import { onDestroy, onMount } from 'svelte'
  let unsubscribe
  let liftsStore = makeLiftsStore()
  let lifts = []
  let tracksStore = makeTracksStore()
  let tracks = []


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
    tracksStore.subscribe((data) => {
      tracks = data
    })
  })
</script>
<div class="flex flex-row w-100 h-100 items-center justify-center">
  {#if lifts.length}
    <div class="w-100 mw4 bg-light-gray pa2 ma1">
      <h2>Heiser</h2>
      <div>
        <h3>{lifts.filter(lift => lift.status === "open").length}/{lifts.length}</h3>
        åpne
      </div>
    </div>
  {/if}
  {#if tracks.length}
    <div class="w-100 mw4 bg-light-gray pa2 ma1">
      <h2>Løyper</h2>
      <div>
        <h3>{tracks.filter(track => track.status === "open").length}/{tracks.length}</h3>
        åpne
      </div>
    </div>
  {/if}
</div>