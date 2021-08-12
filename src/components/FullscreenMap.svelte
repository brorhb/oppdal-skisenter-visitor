<script>
    import Map from './Map.svelte'
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher();
    export let show = false;
    export let items = []

    const close = () => dispatch('close');
</script>

{#if show}
<div class="blur" on:click="{close}"></div>
<div class="map-container">
    <Map panAndZoom={true} items={items} isFullscreen={true}/>
    <button on:click="{close}"><p>Lukk kart </p></button>
</div>
{/if}

<style>
    .blur {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10;
        opacity: 0.9;
        background: rgba(0, 0, 0, 0.47);
    }
    .map-container {
        position: fixed;
        z-index: 1000;
        min-width: 1209px;
        min-height: 767px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .map-container > button{
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;

        border: none;
        background: rgba(244, 248, 255, 0.9);
        border-radius: 25px;
        padding: 0.5rem 1rem;
    }
</style>