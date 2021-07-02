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
    <Map panAndZoom={true} items={items}/>
    <button class="oppdal-button" on:click="{close}">Lukk</button>
</div>
{/if}

<style>
    .blur {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        opacity: 0.9;
        background: gray;
        width: 100%;
        height: 100%;
    }
    .map-container {
        position: absolute;
        z-index: 1000;
        min-width: 1209px;
        min-height: 767px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 0 0 50px 0;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        background: #FAFAFA;
        opacity: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .map-container > button {
        max-width: 200px;
        margin: 5px;
    }
</style>