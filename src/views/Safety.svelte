<script>
import Avalanche from "../components/Avalanche.svelte";
import Skipatrulje from "../components/Skipatrulje.svelte";

</script>
<div class="safety max-width-wrapper">
    <h2>Sikkerhet</h2>
    <div class="safety-grid">
        <div id="skipatrulje-wrapper">
            <Skipatrulje/>
        </div>
        <div id="avalanche-wrapper">
            <Avalanche/>
        </div>
    </div>
</div>

<style>
    .safety {
        margin: 4rem auto 4rem auto;
    }
    .safety > h2 {
        padding: 0 0 1rem 0;
    }
    .safety-grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        column-gap: 1rem;
        row-gap: 3rem;
        grid-template-areas: 
        "skipatrulje avalanche";
    }
    #skipatrulje-wrapper {
        grid-area: skipatrulje;
    }
    #avalanche-wrapper {
        grid-area: avalanche;
    }
    @media only screen and (max-width: 1000px) {
        .safety-grid {
            grid-template-areas: 
            "skipatrulje"
            "avalanche";
            grid-template-columns: 1fr;           
        }
        .safety > h2 {
            padding: 1rem;
        }
    }
</style>