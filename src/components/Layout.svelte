<script>
  import { Route } from 'svelte-router-spa'
  import Footer from './Footer.svelte'
  import Navbar from './Navbar.svelte'
  export let currentRoute
  export const params = {}
</script>
<div class="layout">
  <Navbar />
  <section>
    <Route {currentRoute}  {params} />
  </section>
  <Footer />
</div>

<style>
  .layout {
    height: 100%;
    display: flex;
	  flex-direction: column;
  }
</style>