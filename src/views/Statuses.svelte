<script>
    import Map from "../components/Map.svelte";
    import { makeTracksStore } from '../stores/TrackStore'
    import { makeLiftsStore } from '../stores/LiftsStore'
    import { onDestroy, onMount } from 'svelte'
    import Zones from "../components/Zones.svelte";
    import FullscreenMap from "../components/FullscreenMap.svelte";
    import tr from "date-fns/locale/tr";

    let unsubscribe
    let tracksStore = makeTracksStore()
    let liftsStore = makeLiftsStore()
    let tracks = []
    let lifts = []
    let showFullscreen = false;

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe()
            unsubscribe = null
        }
    });

    onMount(async () => {
        tracksStore.subscribe((data) => {
            tracks = data.filter((item) => item["hide_for_user"] !== 1)
        })
        unsubscribe = liftsStore.subscribe((data) => {
            lifts = data
        })
    })

</script>
<div class="statuses-view max-width-wrapper">
    <h2>Hvilke heiser og løyper er åpne nå?</h2>
    <p class="smallinfo">Åpningstidene varierer etter klokkeslett, sesong og værforhold. <a href="https://www.oppdalskisenter.no/%C3%A5pningstider" target="_blank">Gå til informasjon om åpningstider ></a></p>
    <div class="statuses-grid">
        <div id="map-wrapper">
            <Map on:open={() => showFullscreen = true} items={[...tracks, ...lifts]} panAndZoom={false}/>
        </div> 
        <div id="zones-wrapper">
            <Zones/>
        </div>
    </div>
    <!--<FullscreenMap on:close={() => showFullscreen = false} items={[...tracks, ...lifts]} show={showFullscreen}/>-->
    <!-- Remove fullscreen map as it does not work properly on mobile -->
</div>

<style>
    .statuses-view { 
        
        max-height: 600px;
    }
    .statuses-view > p{
        margin: 0.5rem 0 0.5rem 0;
    }
    .statuses-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 1rem;
        row-gap: 1rem;
        grid-template-areas: 
        "map zones";
    }
    #map-wrapper {
        grid-area: map;
    }
    #zones-wrapper {
        max-height: 500px;
        height: 472px;
        grid-area: zones;
    }
    @media only screen and (max-width: 1000px) {
        .statuses-view { 
            max-height: 100%;
        }
        #zones-wrapper {
            max-height: auto;
            height: auto;
        }
        .statuses-grid {
            grid-template-areas: 
            "map"
            "zones";
            grid-template-columns: 1fr;
        }
    }
</style>