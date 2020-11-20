<script>
  import { makeTracksStore } from '../stores/TrackStore'
  import { makeLiftsStore } from '../stores/LiftsStore'
  import { navigateTo } from 'svelte-router-spa'
  import { onDestroy, onMount } from 'svelte'
  import Map from '../components/Map.svelte'
  import DashboardTile from '../components/DashboardTile.svelte'

  let unsubscribe
  let tracksStore = makeTracksStore()
  let liftsStore = makeLiftsStore()
  let tracks = []
  let trackGroups = []
  let lifts = []
  let liftGroups = []
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
      trackGroups = tracks.reduce((acc, curr) => {
        if (!acc) acc = []
        if (acc.includes(curr.difficulty)) return acc
        acc.push(curr.difficulty)
        return acc
      }, [])
    })
    liftsStore.subscribe((data) => {
      lifts = data
      liftGroups = lifts.reduce((acc, curr) => {
        if (!acc) acc = []
        if (acc.includes(curr.type)) return acc
        acc.push(curr.type)
        return acc
      }, [])
		})
  })
  
  function selectedTrack(obj) {
    navigateTo(`/tracks/${obj.detail.id}`)
  }
</script>
<svelte:window bind:innerWidth={innerWidth} />
<div class="flex flex-wrap w-100 h-100">
  {#if innerWidth >= 800}
  <div class="w-80">
    <Map items={tracks} on:select={selectedTrack} />
  </div>
  <div class="w-20 flex flex-column h-100 overflow-auto">
    <div class="pa2 bg-light-gray">
      {#each trackGroups as group}
        <div class="flex flex-row justify-between">
          <div>
            {group}
          </div>
          <div class="flex flex-row">
            <span>{tracks.filter((track) => track.difficulty === group && track.status === "open").length}</span>
            <span class="ph1">/</span>
            <span>{tracks.filter((track) => track.difficulty === group).length}</span>
          </div>
        </div>
      {/each}
    </div>
    <div class="pa2 bg-light-gray mt1">
      {#each liftGroups as group}
        <div class="flex flex-row justify-between">
          <div>
            {group}
          </div>
          <div class="flex flex-row">
            <span>{lifts.filter((lift) => lift.type === group && lift.status === "open").length}</span>
            <span class="ph1">/</span>
            <span>{lifts.filter((lift) => lift.type === group).length}</span>
          </div>
        </div>
      {/each}
    </div>
    <div class="pa2">
      {#each tracks as track}
        <div class="flex flex-row justify-between items-center">
          <div class="flex flex-column pv2">
            <div class="b">{track.id} {track.name}</div>
            <div>{track.difficulty}</div>
          </div>
          <svg height="16" width="16" viewBox="0 0 16 16">
            <circle
              opacity="1.0"
              cx="8"
              cy="8"
              fill={`${track.status === "closed" ? "red" : "green"}`}
              r="8"
            >
          </svg>
        </div>
      {/each}
    </div>
  </div>
  {:else}
  <DashboardTile>
    <div class="pa2 bg-light-gray">
      {#each trackGroups as group}
        <div class="flex flex-row justify-between">
          <div>
            {group}
          </div>
          <div class="flex flex-row">
            <span>{tracks.filter((track) => track.difficulty === group && track.status === "open").length}</span>
            <span class="ph1">/</span>
            <span>{tracks.filter((track) => track.difficulty === group).length}</span>
          </div>
        </div>
      {/each}
    </div>
  </DashboardTile>
  <DashboardTile>
    <div class="pa2 bg-light-gray">
      {#each liftGroups as group}
        <div class="flex flex-row justify-between">
          <div>
            {group}
          </div>
          <div class="flex flex-row">
            <span>{lifts.filter((lift) => lift.type === group && lift.status === "open").length}</span>
            <span class="ph1">/</span>
            <span>{lifts.filter((lift) => lift.type === group).length}</span>
          </div>
        </div>
      {/each}
    </div>
  </DashboardTile>
  <div class="pa2 w-100">
    {#each tracks as track}
      <div class="flex flex-row justify-between items-center pointer" on:click={() => selectedTrack({detail: track})}>
        <div class="flex flex-column pv2">
          <div class="b">{track.id} {track.name}</div>
          <div>{track.difficulty}</div>
        </div>
        <svg height="16" width="16" viewBox="0 0 16 16">
          <circle
            opacity="1.0"
            cx="8"
            cy="8"
            fill={`${track.status === "closed" ? "red" : "green"}`}
            r="8"
          >
        </svg>
      </div>
    {/each}
  </div>
  {/if}
</div>