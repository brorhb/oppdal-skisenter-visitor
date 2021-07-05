<script>
    import { makeTracksStore } from '../stores/TrackStore'
    import { onDestroy, onMount } from 'svelte'
    let unsubscribe
    let tracksStore = makeTracksStore();
    let tracks = []; 

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
    <div class="oppdal-title title">Skiløyper mellom soner</div>
    <div class="route">
    {#each tracks as track}
        {#if track.zone == 11}
            <div class={`status ${track.status == "closed" ? "closed" : "open"}`}>
                <div>Stølen -> Hovden</div>
                <div class="icon"><i class={`far ${track.status == "closed" ? "fa-times-circle" : "fa-check-circle"}`}></i></div>
                <div class="status-detail">{track.status == "closed" ? "Stengt" : "Åpen"}</div>
            </div>
        {/if}
    {/each}
    </div>
</div>


<style>
    .transport {
        display: flex;
        flex-direction: column;
        color: #004a7c;
        padding: 15px;
        text-align: center;
    }
    .transport .title {
        padding: 0 0 15px 0;
    }
    .route {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    .transport .status {
        width: 75px;
        height: auto;
        padding: 15px;
        margin-right: 15px;
    }
    .transport .closed {
        background: #F5E8E8;
    }
    .transport .open {
        background: #E8F1F5;
    }
    .transport .icon {
        font-size: 37px;
        font-weight: 500;
    }
    .status-detail {
        font-size: 12px;
    }
</style>