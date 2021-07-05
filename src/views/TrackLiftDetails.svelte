<script>
    export let currentRoute;
    import Map from '../components/Map.svelte';
    import DropDown from '../components/DropDown.svelte';
    import Table from '../components/desktop/Table.svelte';
    import { makeTracksStore } from '../stores/TrackStore';
    import { makeLiftsStore } from '../stores/LiftsStore';
    import { makeZoneStore } from '../stores/ZoneStore';
    import { onDestroy, onMount } from 'svelte';
    import { standard_options } from '../helpers/zoneOptions';
    
    let chosen_zone;
    let options;
    let selected_option = "";
    let unsubscribe;
    let zoneId = currentRoute.name.split("/")[2]

    $: chosen_zone, options = getOptions(zoneId, zones);
    $: activeZone = updateActiveZone(selected_option) /*$: is used to ensure that updateActiveZone is performed when selected_options is changed*/
    $: tracksInZone = updateTracksZone(activeZone, tracks)
    $: liftsInZone = updateLiftsZone(activeZone, lifts)

    let trackStore = makeTracksStore();
    let tracks = [];
    let liftStore = makeLiftsStore();
    let lifts = [];
    let zoneStore = makeZoneStore();
    let zones = [];
    let trackGroupsInZone = {};
    let liftGroupsInZone = {};

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

    function getOptions(zoneId, zones) {
        options = standard_options;
        if (zones.length > 0) {
            chosen_zone = zones.filter(zone => zone.id === parseInt(zoneId))[0].name
            options = options.filter(zone_name => zone_name !== chosen_zone)
            return chosen_zone, options
        } else {
            return false, options
        };
    };

    function updateActiveZone(selected_zone_name) {
        if (selected_zone_name && selected_zone_name !== 'Alle') {
            let zoneID = (zones.find(zone => zone.name === selected_zone_name)).id
            activeZone = zoneID;
        } else {
            activeZone = false;
        };
        return activeZone;
    };

    function updateTracksZone(activeZone, tracks) {
        if (!activeZone) {  /*Maybe move logic to helpers?*/
            tracksInZone = tracks;
        } else {
            tracksInZone = tracks.filter(track => track.zone === activeZone);
        };
        trackGroupsInZone = {}
        tracksInZone.forEach(track => {
            const diff = track.difficulty;
            if (trackGroupsInZone[diff]) {
                trackGroupsInZone[diff] = [...trackGroupsInZone[diff], track];
            } else {
                trackGroupsInZone[diff] = [track];
            }; 
        });
        return tracksInZone
    };

    function updateLiftsZone(activeZone, lifts) {
        if (!activeZone) {  /*Maybe move logic to helpers?*/
            liftsInZone = lifts;
        } else {
            liftsInZone = lifts.filter(lift => lift.zone === activeZone)
        };
        liftGroupsInZone = {}
        liftsInZone.forEach(lift => {
            const type = lift.type;
            if (liftGroupsInZone[type]) {
                liftGroupsInZone[type] = [...liftGroupsInZone[type], lift];
            } else {
                liftGroupsInZone[type] = [lift];
            };
        });
        return liftsInZone;
    };
</script>

<div class="large-container">
    <div class="left-container">
        <Map items={[...tracksInZone, ...liftsInZone]} />
    </div>
    <div class="right-container">
        <DropDown bind:selected_option options={options} chosen_zone={chosen_zone}/>  <!-- bind:selected_option ensures that parent component updates when selected option in dropdown changes-->
        <Table name={"Heiser"} itemGroups={liftGroupsInZone} itemArray={liftsInZone} />
        <Table name={"Løyper"} itemGroups={trackGroupsInZone} itemArray={tracksInZone} />
    </div>
</div>

<style>
    .large-container {
        display: grid;
        margin: 3rem 4rem;
        grid-template-columns: 65% 35%;
  }

  .left-container {
      margin-right: 1.5rem;
  }

  .right-container {
      margin: 0 0 2rem 1.5rem;
  }
</style>