<script>
    import { navigateTo } from 'svelte-router-spa'
    export let currentRoute
    const logout = () => {
        localStorage.removeItem('user');
        navigateTo(`/login`)
    }
</script>
<div class="admin-nav">
    <div class="{currentRoute.path == "/admin" ? "active" : ""}" on:click="{() => navigateTo("/admin")}">Hjem</div>
    <div class="{currentRoute.path == "/admin/meldinger" ? "active" : ""}" on:click="{() => navigateTo("/admin/meldinger")}">Viktige meldinger</div>
    <div class="{currentRoute.path == "/admin/loyper" ? "active" : ""}" on:click="{() => navigateTo("/admin/loyper")}">Løyper</div>
    <div class="{currentRoute.path == "/admin/heiser" ? "active" : ""}" on:click="{() => navigateTo("/admin/heiser")}">Heiser</div>
    <div class="{currentRoute.path == "/admin/webkamera" ? "active" : ""}" on:click="{() => navigateTo("/admin/webkamera")}">Webkamera</div>
    <div class="{currentRoute.path == "/admin/snoforhold" ? "active" : ""}" on:click="{() => navigateTo("/admin/snoforhold")}">Snøforhold</div>
    <div on:click="{logout}">Logg av</div>
</div>

<style>
     .admin-nav {
        width: 100%;
        height: 75px;
        background: #004a7c;
        display: flex;
        align-content: space-around;
        justify-content: center;
        align-items: flex-end;
    }
    .admin-nav > div {
        min-width: 6rem;
        height: 2rem;
        text-align: center;
        color: #fff;
        margin: 0 0 0.5rem 0;
        cursor: pointer;
    }
    .admin-nav > div:hover {
        border-bottom: 1px solid #fff;
    }
    .active {
        border-bottom: 1px solid #fff;
    }
</style>