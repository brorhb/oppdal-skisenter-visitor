<script>
  export let currentRoute
  import { makeTracksStore } from '../stores/TrackStore'
  import { onDestroy, onMount } from 'svelte'
  let unsubscribe
  let tracksStore = makeTracksStore()
  $: trackId = currentRoute.name.split("/")[currentRoute.name.split("/").length -1]
  let track = {}


  onDestroy(() => {
    if(unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
	});
	
	onMount(async () => {
		tracksStore.subscribe((data) => {
			track = data.find((item) => item.id == trackId)
		})
  })
</script>
<div class="flex flex-column ph2">
  {#if track}
    id: {track?.id}
    <br>
    name: {track?.name}
    <br>
    <span>status: <span class={`${track?.status === 'closed' ? 'red' : 'green'}`}>{track?.status}</span></span>
    {:else}
    <div>
      loading
    </div>
  {/if}
</div>