<script>
  import { Route } from 'svelte-router-spa'
  import Toast from './Toast.svelte'
  import Navbar from './Navbar.svelte'
  export let currentRoute
  export const params = {} 
</script>

<div class="admin-layout">
  <section>
    <Navbar {currentRoute}/>
    <Route {currentRoute}  {params} />
  </section>
  <Toast />
</div>

<style>
    .admin-layout {
        width: 100%;
        height: 100%;
        max-width: 1100px;
    }
    .admin-layout > section {
        max-width: 1100px;
        margin: 0 auto 0 auto;
    }
</style>