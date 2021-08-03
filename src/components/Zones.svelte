<script>
    import { makeTracksStore } from '../stores/TrackStore';
    import { makeLiftsStore } from '../stores/LiftsStore';
    import { makeZoneStore } from '../stores/ZoneStore';
    import { onDestroy, onMount } from 'svelte';

    let unsubscribe = null;

    let trackStore = makeTracksStore();
    let tracks = [];

    let liftStore = makeLiftsStore();
    let lifts = [];

    let zoneStore = makeZoneStore();
    let zones = [];

    let selectedZone = {
        id: 1,
        name: "Vangslia"
    };

    onMount(async () => {
        unsubscribe = trackStore.subscribe(data => {
            tracks = data;
        });
        unsubscribe = liftStore.subscribe(data => {
            lifts = data;
        });
        unsubscribe = zoneStore.subscribe(data => {
            zones = data;
        });
    });

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        };
    });
</script>

<div class="zones">
    <div class="smallbold">Tilgjengelige løyper</div>
    <div class="zone-select">
        <div class="smallinfo">Skiområde:</div>
        <div class="dropdown">
            <select class="zone-dropdown" name="zones" id="zones" bind:value={selectedZone}>
                {#each zones as zone}
                <option value="{zone}">{zone.name}</option>
                {/each}
            </select>
        </div>
    </div>
    <div class="tracks">
        <p>Løyper i {selectedZone.name}</p>
        <div class="list-item"><p>Jonasløypa (32) <span>lett</span><span class="smallbold">Åpen</span></p></div>
    </div>
    <div class="lifts">
        <p>Heiser i {selectedZone.name}</p>
        <div class="list-item"><p>Barneheis (P)<span class="smallbold">Åpen</span></p></div>
    </div>
</div>

<style>
    .zones {
        min-height: 506px;
        max-width: 331px;
        background: #F4F8FF;
        border-radius: 9px;
        padding: 17px;
    }
    .zone-dropdown {
        width: 100%;
        border: none;
        cursor: pointer;
        background: #2C3B6C;
        border: 2px solid #2C3B6C;
        box-sizing: border-box;
        border-radius: 4px;
        color: #FFFFFF;
        font-family: Work Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 21px;
        padding: 0.5rem;
    }
    .list-item {
        border-bottom: 0.840336px solid #A0B2DC;
    }
</style>