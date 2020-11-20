<script>
  import { makeTracksStore } from '../stores/TrackStore'
  import { navigateTo } from 'svelte-router-spa'
  import { onDestroy, onMount } from 'svelte'
  import Map from '../components/Map.svelte'
  import TrackList from '../components/TrackList.svelte'
  let unsubscribe
  let tracksStore = makeTracksStore()
  let tracks = {}
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
<svelte:window bind:innerWidth={innerWidth} />
<div>
  <Map items={tracks.tracks} on:select={selectedTrack} />
{#if innerWidth >= 800}
<TrackList tracks={tracks.tracks} />
{/if}
</div>

