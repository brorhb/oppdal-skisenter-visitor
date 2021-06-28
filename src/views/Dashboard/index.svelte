<script>
  import { makeTracksStore } from '../../stores/TrackStore'
  import { makeLiftsStore } from '../../stores/LiftsStore'
  import { makeZoneStore } from '../../stores/ZoneStore'
  import { makeWeatherStore } from '../../stores/WeatherStore'
  import { makeImportantMessageStore } from '../../stores/ImportantMessageStore'
  import { navigateTo } from 'svelte-router-spa'
  import { onDestroy, onMount } from 'svelte'
  import Large from "./large.svelte"
  import Small from "./small.svelte"
import ImportantMessage from '../../components/ImportantMessage.svelte'

  let unsubscribe
  let tracksStore = makeTracksStore()
  let liftsStore = makeLiftsStore()
  let weatherStore = makeWeatherStore()
  let zoneStore = makeZoneStore()
  let importantMessageStore = makeImportantMessageStore();
  let tracks = []
  let zones = []
  let activeZone = false
  let weatherStations = []
  let lifts = []
  let importantMessage = {}
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
    importantMessageStore.subscribe((data) => {
      importantMessage = data
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
<div class="wrapper">
  <ImportantMessage importantMessage={importantMessage}/>
  <div>
    <div class="zones">
      <div
        class={`nav-item ${!activeZone ? "active-item" : ""}`}
        on:click={() => activeZone = false}
      >
        Alle
      </div>
      {#each zones as zone}
        <div
          class={`nav-item ${activeZone === zone.id ? "active-item" : ""} `}
          on:click={() => activeZone = zone.id}
        >
          {zone.name}
        </div>
      {/each}
    </div>
    {#if innerWidth >= 990}
        <Large {trackGroups} tracks={tracksInZone} {liftGroups} lifts={liftsInZone} {selectedTrack} weatherStations={visibleWeatherStations} />
      {:else}
        <Small {trackGroups} tracks={tracksInZone} {liftGroups} lifts={liftsInZone} {selectedTrack} weatherStations={visibleWeatherStations} activeZone={activeZone} />
      {/if}
  </div>
</div>


<style>
  .wrapper {
    margin-left: 20px;
    margin-right: 20px;
  }
  .box-shadow {
    box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
  }
  
  .zones {
    display: flex;
    justify-content: center;
    
  }
  .nav-item {
    color: #004A7C;
    cursor: pointer;
    margin: 20px;
    font-size: 32px;
  }
  .nav-item:hover {
    border-bottom: 1px solid #004A7C;
  }
  .active-item {
    border-bottom: 1px solid #004A7C;
  }
</style>