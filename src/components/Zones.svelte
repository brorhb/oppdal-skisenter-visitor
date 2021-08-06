<script>
    import { makeTracksStore } from '../stores/TrackStore';
    import { makeLiftsStore } from '../stores/LiftsStore';
    import { makeZoneStore } from '../stores/ZoneStore';
    import { onDestroy, onMount } from 'svelte';
    import DropDown from './DropDown.svelte';
    import { difficulty, difficultyIntToColor, difficultyToInt } from '../helpers/difficulty';

    let unsubscribe;
    let selected_zone = "Vangslia";

    let trackStore = makeTracksStore();
    let tracks = [];
    let liftStore = makeLiftsStore();
    let lifts = [];
    let zoneStore = makeZoneStore();
    let zones = [];

    $: dropdownOptions = setDropdownOptions(zones);
    $: activeZoneID = updateActiveZone(selected_zone, zones);
    $: tracksInZone = updateTracksZone(activeZoneID, tracks); //Change to store so it can be accessed by map in index/large
    $: liftsInZone = updateLiftsZone(activeZoneID, lifts); //Change to store so it can be accessed by map in index/large

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

    function setDropdownOptions(zones) {
        if (zones.length) {
            dropdownOptions = zones.map(zone => zone.name);
            dropdownOptions.shift()
            dropdownOptions.push("Alle")
            return dropdownOptions;
        } else {
            return [];
        };
    }

    function updateActiveZone(selected_zone, zones) {
        if (zones.length) {
            if (selected_zone == "Alle") {
                return false;
            } else {
                return (zones.find(zone => zone.name === selected_zone)).id
            };
        } else {
            return false;
        };
    };

    function updateTracksZone(activeZone, tracks) {
        if (!activeZone) {
            tracksInZone = tracks;  //Show all tracks for zone = "Alle"
        } else {
            tracksInZone = tracks.filter(track => track.zone === activeZone);
        };
        return tracksInZone;
    };

    function updateLiftsZone(activeZone, lifts) {
        if (!activeZone) {
            liftsInZone = lifts; //Show all lifts for zone = "Alle"
        } else {
            liftsInZone = lifts.filter(lift => lift.zone === activeZone);
        };
        return liftsInZone;
    };
</script> 

<div class="card zones-card"> <!-- ADD GRID TO zones-card and use 2/3 rows-->

    <div>
        <div class="smallbold">Tilgjengelige løyper</div>
        <div class="small-info zones-dropdown-header">Skiområde:</div>
        {#if dropdownOptions.length > 0}
            <DropDown bind:selected_option={selected_zone} options={dropdownOptions} zones={zones} lifts={lifts} />
        {/if}
    </div>

    <div class="zones-card-bottom">
        {#if tracksInZone.length > 0}
            <div class="lift-track-card">
                <p class="paragraph-bold">Løyper i {selected_zone}</p>
                <div class="lift-track-container">
                    <div class="scroll-container">
                        {#each tracksInZone as track}
                            <div class="lift-track-single">
                                <div>
                                    <p class="paragraph">{`${track.name} (${track.id}) `}</p>
                                    <span class="paragraph-bold" style={`color: ${difficultyIntToColor[difficultyToInt[track.difficulty]]}`}>{(difficulty[track.difficulty]).toLowerCase()}</span>
                                </div>
                                <div>
                                    {#if track.status === "closed"}
                                        <span class="small-info">Stengt</span>
                                        <i class="fas fa-times-circle closed-icon fa-lg"></i>
                                    {:else}
                                        <span class="small-info">Åpen</span>
                                        <i class="fas fa-check-circle open-icon fa-lg"></i>
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div> 
            </div>
        {/if}

        {#if liftsInZone.length > 0}
            <div class="lift-track-card">
                <p class="paragraph-bold">Heiser i {selected_zone}</p>
                <div class="lift-track-container">
                    <div class="scroll-container">
                        {#each liftsInZone as lift}
                            <div class="lift-track-single">
                                <div>
                                    <p class="paragraph">{`${lift.name} (${(lift.map_name).toUpperCase()})`}</p>
                                </div>
                                <div>
                                    {#if lift.status === "closed"}
                                        <span class="small-info">Stengt</span>
                                        <i class="fas fa-times-circle closed-icon fa-lg"></i>
                                    {:else}
                                        <span class="small-info">Åpen</span>
                                        <i class="fas fa-check-circle open-icon fa-lg"></i>
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
    </div>
        
</div>

<style>
    .zones-card {
        border-radius: 9px;
        margin: 1rem;
        display: flex;
        flex-direction: column;
    }
    .zones-dropdown-header {
        margin: 1rem 0 0.5rem 0;
    }

    .zones-card-bottom {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
    }
    .lift-track-card {
        margin: 1rem 0;
    }
    .lift-track-container {
        margin-top: 0.4rem;
        border: 1px solid #DBE3F5;
        border-radius: 6px;
        padding: 0.5rem;
    }
    .lift-track-single {
        border-bottom: 1px #A0B2DC solid;
        padding: 0.5rem 0 0.3rem 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .lift-track-single:last-child {
        border-bottom: none;
    }
    .paragraph {
        display: inline;
    }
    .closed-icon {
        color: #C7C7C7;
        font-size: 18px;
    }
    .open-icon {
        color: #2FC93E;
        font-size: 18px;
    }
    .scroll-container {
        padding-right: 0.5rem; /* padding between scrollbar and track/lift single */
        max-height: 200px;
        overflow-y: auto;
    }
    ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 4px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #2C3B6C;
        border-radius: 2px;
    }
    ::-webkit-scrollbar-track {
        border: 5px #A0B2DC solid;
        border-radius: 2px;
    }
</style>