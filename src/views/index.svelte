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
    </div>
    <Safety/>
    <Links/>
</div>

<style>
    .grid {
        display: grid;
        grid-template-areas: 
        "weather"
        "statuses";
    }
    .weather-wrapper {
        grid-area: weather;
    }
    .statuses-wrapper {
        grid-area: statuses;
    }
    @media only screen and (max-width: 1000px) {
        .grid {
            grid-template-areas: 
            "statuses"
            "weather";
        }
    }
</style>
