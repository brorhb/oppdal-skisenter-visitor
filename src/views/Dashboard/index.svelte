<script>
  import { makeTracksStore } from '../../stores/TrackStore'
  import { makeLiftsStore } from '../../stores/LiftsStore'
  import { makeZoneStore } from '../../stores/ZoneStore'
  import { makeWeatherStore } from '../../stores/WeatherStore'
  import { navigateTo } from 'svelte-router-spa'
  import { onDestroy, onMount } from 'svelte'
  import Large from "./large.svelte"
  import Small from "./small.svelte"

  let unsubscribe
  let tracksStore = makeTracksStore()
  let liftsStore = makeLiftsStore()
  let weatherStore = makeWeatherStore()
  let zoneStore = makeZoneStore()
  let tracks = []
  let zones = []
  let activeZone = false
  let weatherStations = []
  let lifts = []
  $: visibleWeatherStations = activeZone ? weatherStations.filter((station) => station.zone === activeZone) : weatherStations
  $: trackGroups = tracksInZone.reduce((acc, curr) => {
    const difficulty = curr.difficulty
    if (!acc) acc = {}
    if (acc[difficulty]) acc[difficulty] = [...acc[difficulty], curr]
    else acc[difficulty] = [curr]
    return acc
  }, {})
  $: liftGroups = liftsInZone.reduce((acc, curr) => {
    const type = curr.type
    if (!acc) acc = {}
    if (acc[type]) acc[type] = [...acc[type], curr]
    else acc[type] = [curr]
    return acc
  }, {})
  $: tracksInZone = tracks.reduce((acc, track) => {
    if (!activeZone) acc.push(track)
    else {
      if (track.zone === activeZone) acc.push(track)
    }
    return acc
  }, [])
  $: liftsInZone = lifts.reduce((acc, lift) => {
    if (!activeZone) acc.push(lift)
    else {
      if (lift.zone === activeZone) acc.push(lift)
    }
    return acc
  }, [])
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
    weatherStore.subscribe((data) => {
      weatherStations = data
    })
    zoneStore.subscribe((data) => {
      zones = data
    })
  })
  
  function selectedTrack(obj) {
    if (obj.detail.type) {
      navigateTo(`/lifts/${obj.detail.id}`)
    } else {
      navigateTo(`/tracks/${obj.detail.id}`)
    }
  }
</script>
<svelte:window bind:innerWidth={innerWidth} />
<div class="flex flex-column w-100 h-100">
  <div class="flex flex-wrap justify-center items-center mb1">
    <div
      class={`pa2 tc ${!activeZone ? "bg-black-30 white" : "bg-black-05"} mh1 fw5 pointer mt1`}
      on:click={() => activeZone = false}
    >
      Alle
    </div>
    {#each zones as zone}
      <div
        class={`pa2 tc ${activeZone === zone.id ? "bg-black-30 white" : "bg-black-05"} mh1 fw5 pointer mt1`}
        on:click={() => activeZone = zone.id}
      >
        {zone.name}
      </div>
    {/each}
  </div>
  <div class={`flex ${innerWidth < 800 ? "flex-column" : "flex-row"} w-100 h-100`}>
    {#if innerWidth >= 800}
      <Large {trackGroups} tracks={tracksInZone} {liftGroups} lifts={liftsInZone} {selectedTrack} weatherStations={visibleWeatherStations} />
    {:else}
      <Small {trackGroups} tracks={tracksInZone} {liftGroups} lifts={liftsInZone} {selectedTrack} weatherStations={visibleWeatherStations} activeZone={activeZone} />
    {/if}
  </div>
</div>