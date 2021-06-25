<script>
  import { Route, navigateTo } from 'svelte-router-spa'
  import Toast from './Toast.svelte'
  export let currentRoute
  export const params = {} 
</script>

<div class="admin-layout">
  {#if currentRoute.path !== "/admin"}
    <button class="button-circle" on:click={() => navigateTo("/admin")}><i class="fas fa-arrow-circle-left"></i></button>
  {/if}
  <section>
    <Route {currentRoute}  {params} />
  </section>
  <Toast />
</div>

<style>
    .admin-layout {
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 1000;        
    }
    .button-circle {
      font-size: 32px;
      border: none;
      background: #fff;
      z-index: 1000;
      cursor: pointer;
      margin: 10px;
    }
    .button-circle:hover {
      color: rgb(75, 75, 75);
    }
    
</style>