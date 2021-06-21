<script>
  import { Route } from 'svelte-router-spa'
  import Navbar from './Navbar.svelte'
  import AvalancheBanner from '../components/AvalancheBanner.svelte'
  export let currentRoute
  export const params = {}
</script>
<div class="h-100 flex flex-column">
  <div class="flex w-100 justify-center pa2 items-center bg-red white fw5">
    <div>BETA</div>
  </div>
  <AvalancheBanner />
  <Navbar />
  <section>
    <Route {currentRoute}  {params} />
  </section>
</div>