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
    <div class="header title">Skiløyper mellom soner</div>
    <div class="route">
        {#each tracks as track}
            {#if track.zone == 11}
                <div class={`status ${track.status == "closed" ? "closed" : "open"}`}>
                    <div class="information">Stølen -> Hovden</div>
                    <div class="icon"><i class={`far ${track.status == "closed" ? "fa-times-circle" : "fa-check-circle"}`}></i></div>
                    <div class="sub-text">{track.status == "closed" ? "Stengt" : "Åpen"}</div>
                </div>
            {/if}
        {/each}
    </div>
</div>


<style>
    .transport {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #004a7c;
        padding: 1rem;
        text-align: center;
        height: 100%;
    }
    .transport .title {
        padding: 0 0 1rem 0;
    }
    .route {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .transport .status {
        width: 75px;
        height: auto;
        padding: 1rem;
    }

    .transport .closed {
        background: #F5E8E8;
    }
    .transport .open {
        background: #E8F1F5;
    }
    .transport .icon {
        font-size: 2rem;
        font-weight: 500;
        justify-self: center;
        padding: 0.2rem 0;
    }
 
</style>