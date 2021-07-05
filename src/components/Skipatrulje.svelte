<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher();
</script>

<div class="skipatrulje card card-hover">
    <div class="oppdal-title">Skipatrulje</div>
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
        padding: 15px;
    }
    .skipatrulje .information {
        max-width: 300px;
        text-align: center;
    }
</style>