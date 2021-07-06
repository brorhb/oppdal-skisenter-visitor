<script>

    import { navigateTo } from 'svelte-router-spa';
    import Progress from './Progress.svelte'
    export let zone = {};
    import { makeSnowConditionsStore } from '../stores/SnowConditionsStore'
    import { makeLiftsStore } from '../stores/LiftsStore'
    import { makeTracksStore } from '../stores/TrackStore'
    import { onDestroy, onMount } from 'svelte'
    import { formatTimestamp } from '../helpers/formatTimestamp'
    let unsubscribe
    let snowConditionsStore = makeSnowConditionsStore()
    let liftsStore = makeLiftsStore();
    let tracksStore = makeTracksStore();
    let snowConditions = {}
    let lifts = [];
    let tracks = []; 

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe()
            unsubscribe = null
        }
    });
        
    onMount(async () => {
        unsubscribe = snowConditionsStore.subscribe((data) => {
            data.forEach(condition => {
                if (condition.zone_id == zone.id) snowConditions = condition;
            })
        })
        unsubscribe = liftsStore.subscribe(data => {
            lifts = data;
        });
        unsubscribe = tracksStore.subscribe(data => {
            tracks = data;
        })
    })
</script>
{#if zone}
<div class="zone card">
    <div class="header">{zone.name}</div>
    <div class="progress-bars">
        <div>
            <Progress numerator={lifts.filter(lift => lift.status == "open" && lift.zone == zone.id).length} denominator={lifts.filter(lift => lift.zone == zone.id).length} description={"Åpne"}/>
            <p class="subsub-header">Heiser</p>
        </div>
        <div>
            <Progress numerator={tracks.filter(track => track.status == "open" && track.zone == zone.id).length} denominator={tracks.filter(track => track.zone == zone.id).length} description={"Åpne"}/>
            <p class="subsub-header">Løyper</p>
        </div>
    </div>
    <div class="line"><span></span></div>
    <div class="conditions">
        <div><span class="sub-header">Snøforhold</span> <span class="sub-text sub-text-date">{snowConditions.timestamp ? formatTimestamp(snowConditions.timestamp) : formatTimestamp(new Date())}</span></div>
        <div class="paragraph">{snowConditions.message ? snowConditions.message : "Det finnes ingen oppdateringer om snøforhold for denne sonen."}</div>
    </div>
    <div class="button">
        <button on:click="{() => navigateTo(`/sone/${zone.id}`)}" class="oppdal-button">Mer detaljer</button>
    </div>
</div>
{/if}


<style>
    .zone {
        display: flex;
        flex-direction: column;
        color: #004a7c;
        width: 25rem;
        min-height: 25rem;
        justify-content: space-evenly;
        max-width: 20rem;
    }
    .zone .button {
        display: flex;
        justify-content: center;
    }
    .zone .line {
        display: flex;
        justify-content: center;
    }
    .zone .line > span{
        width: 80%;
        border: 1px solid #EFEFEF;
    }
    .zone .progress-bars {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .sub-text-date {
        color: #BABABA;
        margin-left: 0.4rem;
    }
    
</style>