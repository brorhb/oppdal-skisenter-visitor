<script>
import { navigateTo } from "svelte-router-spa";
</script>

<div class="webcam-card card card-hover" on:click="{() => navigateTo("/cameras")}">
    <div class="header">Webkamera</div>
    <img src="../../assets/KameraCard.png" alt="Løype"/>
</div>


<style>
    .webcam-card {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        color: #004a7c;
        height: 100%;
        padding: 1rem;
        cursor: pointer;
    }
    .webcam-card > img {
        max-height: 169px;
        width: 100%;
    }
    .webcam-card .header {
        padding-bottom: 1.5rem;
    }

    .webcam-card:hover {
        box-shadow: 0 4px 18px 0 rgba(0,0,0,0.2);
        transition: 0.1s;
    }
</style>