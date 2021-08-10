<script>
    import Links from "./Links.svelte";
    import Safety from "./Safety.svelte";
    import Statuses from "./Statuses.svelte";
    import Weather from "./Weather.svelte";
</script>

<div class="main">
    <div class="grid">
        
        <div class="weather-wrapper">
            <Weather/>
        </div>
        <div class="statuses-wrapper">
            <Statuses/>
        </div>
        <div class="safety-wrapper">
            <Safety/>
        </div>
        <div class="links-wrapper">
            <Links/>
        </div>
    </div>   
</div>

<style>
    .grid {
        display: grid;
        grid-template-areas: 
        "weather"
        "statuses"
        "safety"
        "links";
    }
    .weather-wrapper {
        grid-area: weather;
    }
    .statuses-wrapper {
        grid-area: statuses;
    }
    .weather-wrapper, .statuses-wrapper, .safety-wrapper {
        margin: 3rem 0 0 0;
    }
    .safety-wrapper {
        grid-area: safety;
        margin: 3rem 0 6rem 0;
    }
    .links-wrapper {
        grid-area: links;

    }
    @media only screen and (max-width: 1000px) {
        .grid {
            grid-template-areas: 
            "statuses"
            "weather"
            "safety"
            "links";
        }
    }
</style>
