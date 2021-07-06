<script>
  import { makeTracksStore } from '../../stores/TrackStore'
  import { makeLiftsStore } from '../../stores/LiftsStore'
  import { makeZoneStore } from '../../stores/ZoneStore'
  import { onDestroy, onMount } from 'svelte'
  import Large from "./large.svelte"
  import Small from "./small.svelte"

  let unsubscribe
  let tracksStore = makeTracksStore()
  let liftsStore = makeLiftsStore()
  let zoneStore = makeZoneStore()
  let tracks = []
  let zones = []
  let lifts = []
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
    zoneStore.subscribe((data) => {
      zones = data
    })
  })

</script>

<svelte:window bind:innerWidth={innerWidth} />
<div class="wrapper">
  {#if innerWidth >= 990}
    <Large tracks={tracks} lifts={lifts} zones={zones}/>
  {:else}
    <Small tracks={tracks} lifts={lifts} activeZone={zones} />
  {/if}
</div>


<style>
  .wrapper {
    margin: 2rem 3rem;
  }
</style>
