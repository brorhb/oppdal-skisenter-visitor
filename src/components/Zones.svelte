<script>
  import { selected_zone } from '../stores/SelectedZoneStore';
  import { map_focus } from '../stores/MapFocusStore';
  import { makeTracksStore } from '../stores/TrackStore';
  import { makeLiftsStore } from '../stores/LiftsStore';
  import { makeZoneStore } from '../stores/ZoneStore';
  import { onDestroy, onMount } from 'svelte';
  import DropDown from './DropDown.svelte';
  import {
    difficulty,
    difficultyIntToColor,
    difficultyToInt,
  } from '../helpers/difficulty';

  let unsubscribe;

  let trackStore = makeTracksStore();
  let tracks = [];
  let liftStore = makeLiftsStore();
  let lifts = [];
  let zoneStore = makeZoneStore();
  let zones = [];

  $: dropdownOptions = setDropdownOptions(zones);
  $: activeZoneID = updateActiveZone($selected_zone, zones);
  $: tracksInZone = updateTracksZone(activeZoneID, tracks);
  $: liftsInZone = updateLiftsZone(activeZoneID, lifts);

  onMount(() => {
    unsubscribe = trackStore.subscribe((data) => {
      tracks = data;
    });
    unsubscribe = liftStore.subscribe((data) => {
      lifts = data;
    });
    unsubscribe = zoneStore.subscribe((data) => {
      zones = data;
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });

  function setDropdownOptions(zones) {
    if (zones.length) {
      dropdownOptions = zones.map((zone) => zone.name);
      dropdownOptions.shift();
      dropdownOptions.push('Alle');
      return dropdownOptions;
    } else {
      return [];
    }
  }

  function updateActiveZone(selected_zone, zones) {
    if (zones.length) {
      if (selected_zone == 'Alle') {
        return false;
      } else {
        return zones.find((zone) => zone.name === selected_zone).id;
      }
    } else {
      return false;
    }
  }

  function updateTracksZone(activeZone, tracks) {
    tracks = sortMapItemsByStatus(tracks);
    if (!activeZone) {
      tracksInZone = tracks; //Show all tracks for zone = "Alle"
    } else {
      tracksInZone = tracks.filter((track) => track.zone === activeZone);
    }
    return tracksInZone;
  }

  function sortMapItemsByStatus(items) {
    const open = items.filter((item) => item.status === 'open');
    const closed = items.filter((item) => item.status === 'closed');
    const other = items.filter((item) => item.status === 'maintanence');
    return [...open, ...closed, ...other];
  }

  function updateLiftsZone(activeZone, lifts) {
    lifts = sortMapItemsByStatus(lifts);
    if (!activeZone) {
      liftsInZone = lifts; //Show all lifts for zone = "Alle"
    } else {
      liftsInZone = lifts.filter((lift) => lift.zone === activeZone);
    }
    return liftsInZone;
  }

  function activateFocus() {
    map_focus.update(
      (name) =>
        (name = this.querySelector('.attraction-name')
          .innerText.split('(')[0]
          .trim())
    );
  }

  function deactivateFocus() {
    map_focus.update((name) => (name = ''));
  }
</script>

<div class="card zones-card">
  <div>
    <div class="smallbold">Tilgjengelige løyper</div>
    <div class="small-info zones-dropdown-header">Skiområde:</div>
    {#if dropdownOptions.length > 0}
      <DropDown options={dropdownOptions} {zones} {lifts} />
    {/if}
  </div>

  <div class="zones-card-bottom">
    {#if tracksInZone.length > 0}
      <div class="lift-track-card">
        {#if $selected_zone == 'Alle'}
          <p class="paragraph-bold">Alle løyper</p>
        {:else if $selected_zone == 'Transport'}
          <p class="paragraph-bold">Alle løyper mellom skiområdene</p>
        {:else}
          <p class="paragraph-bold">Løyper i {$selected_zone}</p>
        {/if}
        <div class="lift-track-container">
          <div class="scroll-container">
            {#each tracksInZone as track}
              <div
                class="lift-track-single"
                on:mouseenter={activateFocus}
                on:mouseleave={deactivateFocus}
              >
                <div>
                  <p class="paragraph attraction-name">
                    {`${track.name} (${track.id}) `}
                  </p>
                  <span
                    class="paragraph-bold"
                    style={`color: ${
                      difficultyIntToColor[difficultyToInt[track.difficulty]]
                    }`}>{difficulty[track.difficulty].toLowerCase()}</span
                  >
                </div>
                <div>
                  {#if track.status === 'open'}
                    <span class="small-info">Åpen</span>
                    <i class="fas fa-check-circle open-icon fa-lg" />
                  {:else}
                    <span class="small-info">Stengt</span>
                    <i class="fas fa-times-circle closed-icon fa-lg" />
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
        {#if $selected_zone == 'Alle'}
          <p class="paragraph-bold">Alle heiser</p>
        {:else}
          <p class="paragraph-bold">Heiser i {$selected_zone}</p>
        {/if}
        <div class="lift-track-container">
          <div class="scroll-container">
            {#each liftsInZone as lift}
              <div
                class="lift-track-single"
                on:mouseenter={activateFocus}
                on:mouseleave={deactivateFocus}
              >
                <div>
                  <p class="paragraph attraction-name">
                    {`${lift.name} (${lift.map_name.toUpperCase()})`}
                  </p>
                </div>
                <div>
                  {#if lift.status === 'open'}
                    <span class="small-info">Åpen</span>
                    <i class="fas fa-check-circle open-icon fa-lg" />
                  {:else}
                    <span class="small-info">Stengt</span>
                    <i class="fas fa-times-circle closed-icon fa-lg" />
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
    display: flex;
    flex-direction: column;
    height: 100%;
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
    border: 1px solid #dbe3f5;
    border-radius: 6px;
    padding: 0.5rem;
  }
  .lift-track-single {
    border-bottom: 1px #a0b2dc solid;
    padding: 0.5rem 0 0.3rem 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .lift-track-single:last-child {
    border-bottom: none;
  }
  .lift-track-single:hover {
    background-color: #d7e3fe;
    cursor: pointer;
  }
  .paragraph {
    display: inline;
  }
  .closed-icon {
    color: #c7c7c7;
    font-size: 18px;
  }
  .open-icon {
    color: #2fc93e;
    font-size: 18px;
  }
  .scroll-container {
    padding-right: 0.5rem; /* padding between scrollbar and track/lift single */
    max-height: 120px;
    overflow-y: auto;
  }
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2c3b6c;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-track {
    border: 5px #a0b2dc solid;
    border-radius: 2px;
  }
</style>
