<script>
    import { navigateTo } from 'svelte-router-spa'
</script>

<div class="admin-settings">
    <h1>Instillinger</h1>
    <!--<div>  
        <h3>Åpne/steng løyper og heiser</h3>
        <button on:click="{() => navigateTo('/admin/instillinger/status')}" class="admin-text-button">Rediger forhåndsinstillinger</button>
    </div>-->
    <div>
        <h3>Webkamera</h3>
        <button on:click="{() => navigateTo('/admin/instillinger/webkamera')}" class="admin-text-button">Rediger webkamera</button>
    </div>
</div>

<style>
    .admin-settings {
        display: flex;
        flex-direction: column;
    }
    .admin-settings > * {
        padding: 1rem 0 1rem 0;
    }
    @media only screen and (max-width: 600px) {
        .admin-settings {
            padding: 0 1rem 0 1rem;
        }
    }
</style>