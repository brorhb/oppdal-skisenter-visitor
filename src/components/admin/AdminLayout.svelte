<script>
  import { Route } from 'svelte-router-spa'
  import Toast from './Toast.svelte'
  import Navbar from './Navbar.svelte'
  export let currentRoute
  export const params = {} 
</script>

<div class="admin-layout">
  <Navbar {currentRoute}/>
  <section>
    <Route {currentRoute}  {params} />
  </section>
  <Toast />
</div>

<style>
    .admin-layout {
        width: 100%;
        height: 100%;
    }
    .admin-layout > section {
        max-width: 1360px;
        margin: 0 auto 0 auto;
    }
</style>