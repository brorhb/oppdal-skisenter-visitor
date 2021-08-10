<script>
import Weatherstations from "../components/Weatherstations.svelte";
import Webcam from "../components/Webcam.svelte";
</script>
<div class="weather-view max-width-wrapper">
    <h2>Vær og føre</h2>
    <div class="weather-grid">
        <div id="webcam-wrapper">
            <Webcam/>
        </div>
        <div id="weather-wrapper">
            <Weatherstations id="weather"/>
        </div>
    </div>
</div>

<style>
    .weather-view {
        display: flex;
        flex-direction: column;
        margin: 4rem auto 4rem auto;
    }
    .weather-view > h2 {
        padding: 0 0 1rem 0;
    }
    .weather-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 1rem;
        row-gap: 1rem;
        grid-template-areas:
        "webcam weather";
    }
    #webcam-wrapper {
        grid-area: webcam;
    }
    #weather-wrapper {
        grid-area: weather;
    }

    @media only screen and (max-width: 1000px) {
        .weather-grid {
            grid-template-areas: 
            "weather"
            "webcam";
            grid-template-columns: 1fr;
        }
        .weather-view > h2 {
            padding: 1rem;
        }
    }
</style>