<script>
  import { makeLiftsStore, updateLifts } from '../../stores/LiftsStore'
  import { makeTracksStore, updateTracks } from '../../stores/TrackStore'
  import { onDestroy, onMount } from 'svelte'
  import { navigateTo } from 'svelte-router-spa'

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

<div class="admin-index">
  <div class="nav-item" on:click={() => navigateTo('/admin/meldinger')}>
    <div class="nav-icon">
    </div>
    <div class="nav-title">
        Meldinger
    </div>
  </div>

  <div class="nav-item" >
    <div class="nav-icon">
    </div>
    <div class="nav-title">
        Meldinger
    </div>
  </div>

  <div class="nav-item" >
    <div class="nav-icon">
    </div>
    <div class="nav-title">
        Meldinger
    </div>
  </div>

  <div class="nav-item" >
    <div class="nav-icon">
    </div>
    <div class="nav-title">
        Meldinger
    </div>
  </div>

  <div class="nav-item" >
    <div class="nav-icon">
    </div>
    <div class="nav-title">
        Meldinger
    </div>
  </div>
</div>


<!--     
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
-->


<style>
  .admin-index {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .nav-item {
    width: 300px;
    height: 200px;
    box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 40px;
    border-radius: 12px;
  }
  .nav-item:hover {
    background-color: rgb(231, 231, 231);
  }
</style>