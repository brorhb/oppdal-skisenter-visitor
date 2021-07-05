<script>

    import { navigateTo } from 'svelte-router-spa';
    import Progress from './Progress.svelte'
    import { makeTracksStore } from '../stores/TrackStore'
    import { onDestroy, onMount } from 'svelte'
    let unsubscribe
    let tracksStore = makeTracksStore();
    let tracks = []; 
    let zone = "Transport"

    let transportVangsliaHovden = ["Ormhaugen", "Gråbergløypa", "Bualøypa", "Håmmårløypa"];
    let transportHovdenStolen = ["Fjellsida", "Elvekanten", "Transporten"];

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe()
            unsubscribe = null
        }
    });
        
    onMount(async () => {
        unsubscribe = tracksStore.subscribe(data => {
            tracks = data;
        })
    })
</script>
<div class="transport card card-hover">
    {#each tracks as track}
        {#if tracks.zone == 11}
        {track.name}
        {/if}
    {/each }
    <div class="oppdal-title title">Transportruter</div>
    <div class="main">
        <div class="column">
            <p class="column-title">Vangslia-Hovden</p>
            <Progress numerator={tracks.filter(track => track.status == "open" && track.zone == 11 && transportVangsliaHovden.includes(track.name)).length} denominator={tracks.filter(track => track.zone == 11 && transportVangsliaHovden.includes(track.name)).length} description={"Åpne"}/>
            <p class="description">Løyper</p>
            
        </div>
        <div class="column">
            <p class="column-title">Hovden-Stølen</p>
            <Progress numerator={tracks.filter(track => track.status == "open" && track.zone == 11 && transportHovdenStolen.includes(track.name)).length} denominator={tracks.filter(track => track.zone == 11 && transportHovdenStolen.includes(track.name)).length} description={"Åpne"}/>
            <p class="description">Løyper</p>
        </div>
        
    </div>
    <button on:click="{() => navigateTo(`/sone/11`)}" class="oppdal-button button">Mer detaljer</button>
</div>


<style>
    .transport {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        color: #004a7c;
        padding: 15px;
        width: 30%;
    }

    .transport .main {
        display: flex;
        flex-direction: row;
    }

    .transport .column {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 15px;
    }
    .transport > button {
        max-width: 200px;
    }
</style>