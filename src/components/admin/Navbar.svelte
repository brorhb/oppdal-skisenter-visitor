<script>
    import { navigateTo } from 'svelte-router-spa'
    export let currentRoute
    //const logout = () => {
    //    localStorage.removeItem('user');
    //    navigateTo(`/login`)
    //}
    let root;

    function open_hamburger() {
        var navbar = document.getElementById("hamburger");
        navbar.classList.toggle('responsive');
        console.log(navbar.classList);
    };

</script>
<div class="admin-nav" bind:this={root}>
    <div class="max-width-div">
        <div class="nav-left">
            <h4 class="{currentRoute.path == "/admin" ? "active" : ""}" on:click="{() => navigateTo("/admin")}"><i class="fas fa-home home-icon"></i>Hjem</h4>
        </div>
        <div class="nav-right" id="hamburger">
            <div class="{currentRoute.path == "/admin/skredvarsel" ? "active" : ""} nav-text" on:click="{() => navigateTo("/admin/skredvarsel")}">Skredvarsel</div>
            <div class="{currentRoute.path == "/admin/snoforhold" ? "active" : ""} nav-text" on:click="{() => navigateTo("/admin/snoforhold")}">Snøforhold</div>
            <div class="{currentRoute.path == "/admin/meldinger" ? "active" : ""} nav-text" on:click="{() => navigateTo("/admin/meldinger")}">Meldinger</div>
            <div class="{currentRoute.path == "/admin/status" ? "active" : ""} nav-text" on:click="{() => navigateTo("/admin/status")}">Åpne/steng</div>
            <div class="icon" on:click={open_hamburger}>
                <i class="fas fa-bars fa-2x"></i>
            </div>
        </div>
    </div>
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
    .nav-left > h4 {
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
    h4 {
        color: #ffffff;
    }
    .home-icon {
        padding-right: 0.5rem;
    }

    :global(.responsive .nav-text) {
        display: block
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