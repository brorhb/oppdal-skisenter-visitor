<script>
  import { Route } from 'svelte-router-spa'
  import Navbar from './Navbar.svelte'
  export let currentRoute
  export const params = {}
</script>
<div>
  <Navbar />
  <section>
    <Route {currentRoute}  {params} />
  </section>
</div>