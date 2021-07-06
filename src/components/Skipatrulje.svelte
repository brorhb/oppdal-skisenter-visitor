<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher();
</script>

<div class="skipatrulje card card-hover">
    <div class="header">Skipatrulje</div>
    <div class="contact">Kontakt: +4790457635</div>
    <div class="symbol"><img src="../../assets/skipatrulje-icon.svg" alt="skipatrulje-ikon"></div>
    <div class="information">For lokasjon av skipatruljen se etter symbolet over i kartet</div>
    <button class="oppdal-button" on:click="{() => dispatch("openMap")}">Åpne kart</button>
</div>

<style>
    .skipatrulje {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        color: #004a7c;
        height: 100%;
        padding: 1rem;
    }
    .skipatrulje .header {
        padding-bottom: 0.4rem;
    }
    .skipatrulje .information {
        max-width: 300px;
        text-align: center;
        padding-bottom: 0.4rem;
    }
    .skipatrulje .symbol {
        padding: 0.4rem 0;
    }
</style>