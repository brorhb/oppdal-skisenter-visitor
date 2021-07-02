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
<div class="zone card card-hover">
    <div class="oppdal-title title">{zone.name}</div>
    <div class="main">
        <div class="status">
            <div class="progress-bars">
                <div>
                    <Progress numerator={lifts.filter(lift => lift.status == "open" && lift.zone == zone.id).length} denominator={lifts.filter(lift => lift.zone == zone.id).length} description={"Åpne"}/>
                    <p class="description">Heiser</p>
                </div>
                <div>
                    <Progress numerator={tracks.filter(track => track.status == "open" && track.zone == zone.id).length} denominator={tracks.filter(track => track.zone == zone.id).length} description={"Åpne"}/>
                    <p class="description">Løyper</p>
                </div>
            </div>
            <button on:click="{() => navigateTo(`/sone/${zone.id}`)}" class="oppdal-button button">Mer detaljer</button>
        </div>
        <div class="conditions">
            <div class="title">Snøforhold <span class="date">{snowConditions.timestamp ? formatTimestamp(snowConditions.timestamp) : formatTimestamp(new Date())}</span></div>
            <div class="description">{snowConditions.message ? snowConditions.message : "Det finnes ingen oppdateringer om snøforhold for denne sonen."}</div>
        </div>
    </div>
</div>
{/if}


<style>
    .zone {
        display: flex;
        flex-direction: column;
        color: #004a7c;
        padding: 15px;
    }

    .zone .main {
        display: flex;
        flex-direction: row;
    }

    .zone .status {
        display: flex;
        flex-direction: column;
        width: 50%;
        padding: 15px;
    }
    .zone .button {
        margin: 0px 0 0 0;
    }

    .zone .progress-bars {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    .progress-bars .description {
        font-weight: 500;
        text-align: center;
        margin: 5px 0 15px 0;

    }
    .zone .conditions {
        width: 50%;
        padding: 15px;
    }

    .conditions .title {
        font-size: 20px;
    }
    
    .conditions .title .date {
        font-size: 12px;
        color: #BABABA;
        margin-left: 5px;
    }

    .conditions .description {
        padding: 5px 0 0 0;
    }
</style>