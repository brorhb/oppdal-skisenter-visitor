<script>
  import { Route } from 'svelte-router-spa'
  import Navbar from './Navbar.svelte'
  export let currentRoute
  export const params = {}
</script>
<div class="h-100 flex flex-column">
  <Navbar />
  <section class="flex h-100">
    <Route {currentRoute}  {params} />
  </section>
</div>