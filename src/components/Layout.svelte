<script>
  import { Route } from 'svelte-router-spa'
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
  <div class="container">
    <Navbar />
  </div>
  <div class="banner">
    <div class="container">
      <h3>Siste løypestatus</h3>
      <h1>Forhold i løypene akkurat nå</h1>
    </div>
  </div>
  <div class="container">
    {#each alerts as alert}
      <Alert alert={alert}/>
    {/each}
  </div>

  <section class="container">
    <Route {currentRoute}  {params} />
  </section>
</div>

<style>
  .layout {
    height: 100%;
    display: flex;
	  flex-direction: column;
  }
  .container {
    max-width: 1100px;
    margin: 0 auto 0 auto;
    width: 100%;
  }
  .banner {
    background-color: #F4F8FF;
    width: 100%;
    min-height: 150px;  
    display: flex;
    align-items: center;  
    margin: 2rem 0 2rem 0;
  }
</style>