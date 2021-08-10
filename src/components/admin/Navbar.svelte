<script>
    import { navigateTo } from 'svelte-router-spa'
    export let currentRoute
    const logout = () => {
        localStorage.removeItem('user');
        navigateTo(`/login`)
    }
</script>
<div class="admin-nav">
        <div class="nav-left">
            <h4 class="{currentRoute.path == "/admin" ? "active" : ""}" on:click="{() => navigateTo("/admin")}">Hjem</h4>
        </div>
        <div class="nav-right">
            <h4 class="{currentRoute.path == "/admin/skredvarsel" ? "active" : ""}" on:click="{() => navigateTo("/admin/skredvarsel")}">Skredvarsel</h4>
            <h4 class="{currentRoute.path == "/admin/snoforhold" ? "active" : ""}" on:click="{() => navigateTo("/admin/snoforhold")}">Snøforhold</h4>
            <h4 class="{currentRoute.path == "/admin/meldinger" ? "active" : ""}" on:click="{() => navigateTo("/admin/meldinger")}">Meldinger</h4>
            <h4 class="{currentRoute.path == "/admin/status" ? "active" : ""}" on:click="{() => navigateTo("/admin/status")}">Åpne/steng</h4>
        </div>
</div>

<style>
     .admin-nav {
        width: 100%;
        height: 69px;
        background: #2C3B6C;
        display: flex;
        align-content: space-around;
        justify-content: space-between;
        align-items: flex-end;        
    }
    .nav-right {
        display: flex;
    }
    .nav-right > h4, .nav-left > h4 {
        margin: 24px;
        cursor: pointer;
    }
    h4 {
        color: #ffffff;
    }
    @media only screen and (max-width: 800px) {
        
    }
    @media only screen and (max-width: 1000px) {
        .admin-nav {
            justify-content: left;
        }
    }
</style>