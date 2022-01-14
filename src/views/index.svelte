<script>
    import Links from "./Links.svelte";
    import Safety from "./Safety.svelte";
    import Statuses from "./Statuses.svelte";
    import Weather from "./Weather.svelte";
    import { onMount } from "svelte";
    import config from "../helpers/config";

    const getUUID = () => {
        const uuid = localStorage.getItem("uuid");
        if (uuid) {
            return uuid;
        }
        const newUUID = uuidv4();
        localStorage.setItem("uuid", newUUID);
        return newUUID;
    };

    onMount(() => {
        fetch(`${config.BASE_URL}/v1/analytics`, {
            method: "POST",
            body: {
                url: window.location.href,
                uuid: getUUID(),
                referrer: window.document.referrer,
            }
        })
    })
    
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
        .weather-wrapper, .statuses-wrapper, .safety-wrapper {
            padding: 0 1rem 0 1rem;
        }
    }
</style>
