<script>
    import { navigateTo } from 'svelte-router-spa'
    let root;

    function open_hamburger() {
        var navbar = document.getElementById("hamburger");
        navbar.classList.toggle('responsive');
    };
    function handle_hamburger_click(link) {
        open_hamburger();
        navigateTo(link);
    }

</script>
<div class="admin-nav" bind:this={root}>
    <div class="max-width-div">
        <div class="nav-left">
            <div class="nav-header" on:click="{() => navigateTo("/admin")}"><i class="fas fa-home home-icon"></i>Hjem</div>
        </div>
        <div class="nav-right">
            <div class="nav-text" on:click="{() => navigateTo("/admin/skredvarsel")}">Skredvarsel</div>
            <div class="nav-text" on:click="{() => navigateTo("/admin/snoforhold")}">Snøforhold</div>
            <div class="nav-text" on:click="{() => navigateTo("/admin/meldinger")}">Meldinger</div>
            <div class="nav-text" on:click="{() => navigateTo("/admin/facilities")}">Fasiliteter</div>
            <div class="nav-text" on:click="{() => navigateTo("/admin/status")}">Løyper/Heise</div>
            <div class="icon" on:click={open_hamburger}>
                <i class="fas fa-bars fa-lg"></i>
            </div>
        </div>
    </div>
</div>
<div class="hamburger-div responsive" id="hamburger">
    <div class="hamburger-text" on:click="{() => handle_hamburger_click("/admin/status")}"><img src="../../../assets/toggle_light.svg" alt="toggle-ikon">Åpne/steng løyper, heiser og fasiliteter</div>
    <div class="hamburger-text" on:click="{() => handle_hamburger_click("/admin/meldinger")}"><img src="../../../assets/message_light.svg" alt="message-ikon">Oppdater meldinger</div>
    <div class="hamburger-text" on:click="{() => handle_hamburger_click("/admin/snoforhold")}"><img src="../../../assets/snowflake_light.svg" alt="snowflake-ikon">Oppdater snøforhold</div>
    <div class="hamburger-text" on:click="{() => handle_hamburger_click("/admin/skredvarsel")}"><img src="../../../assets/table_light.svg" alt="table-ikon">Skredvarsel på tavler</div>
</div>

<style>
     .admin-nav {
        width: 100%;
        height: 69px;
        background: #2C3B6C;    
    }
    .max-width-div {
        max-width: 1200px;
        margin: 0 auto 0 auto;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;    
    }
    .nav-right {
        display: flex;
    }
    .nav-header {
        margin: 24px 0;
        cursor: pointer;
    }
    .nav-text {
        margin: 24px;
        cursor: pointer;
    }
    .nav-text:last-child {
        margin-right: 0;
    }
    .nav-right > .icon {
        display: none;
    }
    .nav-text, .nav-header {
        color: #ffffff;
    }
    .home-icon {
        padding-right: 0.5rem;
        margin-left: 1rem;
    }
    .hamburger-text {
        background-color: #2C3B6C;
        color: #FFFFFF;
        padding: 1rem;
        margin: auto 0 auto 0;
    }
    .hamburger-text:hover {
        cursor: pointer;
        background-color: #A0B2DC;
    }
    .hamburger-text > img {
        padding-right: 0.5rem;
    }

    :global(.responsive) {
        display: none;
    }
    @media only screen and (min-width: 800px) {
        .hamburger-div {
            display: none;
        }
    }

    @media only screen and (max-width: 800px) {
        .nav-right > .icon {
            display: flex;
            padding-right: 1rem;
            margin: 24px 0;
            color: #FFFFFF;
        }
        .nav-text {
            display: none;
        }        
    }
   
</style>