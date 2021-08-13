<script>
  import Navbar from '../../components/admin/Navbar.svelte';
  import { Route } from 'svelte-router-spa'
  import Toast from '../../components/admin/Toast.svelte';
  export let currentRoute
  export const params = {} 
</script>

<div class="admin-index">
  <Navbar {currentRoute}/>
  <section class="max-width-wrapper">
    <Route {currentRoute}  {params} />
  </section>
  <Toast/>
</div>

<style>
  .admin-index {
    min-width: 100%;
    height: 100%;
    background: #F5F2F2;
  }
  .admin-index > * {
    background: #F5F2F2;
  }
  @media only screen and (max-width: 600px) {
    .admin-index {
      justify-content: space-evenly;
    }
  }
</style>