<script>
  import { Route } from 'svelte-router-spa'
  import Footer from './Footer.svelte'
  import Navbar from './Navbar.svelte'
  import Alert from './Alert.svelte'
  import { makeAlertStore } from '../stores/AlertStore'
  import { onDestroy, onMount } from 'svelte'
  export let currentRoute
  export const params = {}
  let alertStore = makeAlertStore();
  let alerts = []
  let unsubscribe
  onDestroy(() => {
    if(unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
	});
  onMount(() => {
    unsubscribe = alertStore.subscribe((data) => alerts = data.filter(alert => alert.is_live))
  })
</script>
<div class="layout">
  <Navbar />
  <div class="main-container">
  {#each alerts as alert}
    <Alert alert={alert}/>
  {/each}
  <section>
    <Route {currentRoute}  {params} />
  </section>
</div>
  <Footer />
</div>

<style>
  .layout {
    height: 100%;
    display: flex;
	  flex-direction: column;
  }
  .main-container {
    max-width: 1440px;
    margin: 0 auto 0 auto;
  }
</style>