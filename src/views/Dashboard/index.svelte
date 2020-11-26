<script>
  import { makeTracksStore } from '../../stores/TrackStore'
  import { makeLiftsStore } from '../../stores/LiftsStore'
  import { navigateTo } from 'svelte-router-spa'
  import { onDestroy, onMount } from 'svelte'
  import Large from "./large.svelte"
  import Small from "./small.svelte"
import AvalancheBanner from '../../components/AvalancheBanner.svelte'

  let unsubscribe
  let tracksStore = makeTracksStore()
  let liftsStore = makeLiftsStore()
  let tracks = []
  $: trackGroups = tracks.reduce((acc, curr) => {
    const difficulty = curr.difficulty
    if (!acc) acc = {}
    if (acc[difficulty]) acc[difficulty] = [...acc[difficulty], curr]
    else acc[difficulty] = [curr]
    return acc
  }, {})
  let lifts = []
  $: liftGroups = lifts.reduce((acc, curr) => {
    const type = curr.type
    if (!acc) acc = {}
    if (acc[type]) acc[type] = [...acc[type], curr]
    else acc[type] = [curr]
    return acc
  }, {})
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
    liftsStore.subscribe((data) => {
      lifts = data
		})
  })
  
  function selectedTrack(obj) {
    navigateTo(`/tracks/${obj.detail.id}`)
  }
</script>
<svelte:window bind:innerWidth={innerWidth} />
<div class="flex flex-column w-100">
  <AvalancheBanner />
  <div class={`flex ${innerWidth < 800 ? "flex-column" : "flex-row"} w-100 h-100`}>
    {#if innerWidth >= 800}
      <Large {trackGroups} {tracks} {liftGroups} {lifts} {selectedTrack} />
    {:else}
      <Small {trackGroups} {tracks} {liftGroups} {lifts} {selectedTrack} />
    {/if}
  </div>
</div>