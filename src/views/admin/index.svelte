<script>
  import { navigateTo } from 'svelte-router-spa'
  import { Route } from 'svelte-router-spa'
  export let currentRoute
  export const params = {} 
</script>

<div class="admin-index">
  <div class="nav-item" on:click={() => navigateTo('/admin/alerts')}>
    <div class="nav-icon">
      <i class="fas fa-info-circle"></i>
    </div>
    <div class="nav-title">
        Viktige meldinger
    </div>
  </div>

  <div class="nav-item" on:click={() => navigateTo('/admin/tracks')}>
    <div class="nav-icon">
      <i class="fas fa-route"></i>
    </div>
    <div class="nav-title">
        Løyper
    </div>
  </div>

  <div class="nav-item" on:click={() => navigateTo('/admin/lifts')}>
    <div class="nav-icon">
      <i class="fas fa-skiing"></i>
    </div>
    <div class="nav-title">
        Heiser
    </div>
  </div>

  <div class="nav-item" on:click={() => navigateTo('/admin/snowconditions')}>
    <div class="nav-icon">
      <i class="fas fa-snowflake"></i>
    </div>
    <div class="nav-title">
        Snøforhold
    </div>
  </div>
  <section>
    <Route {currentRoute}  {params} />
  </section>

</div>

<style>
  .admin-index {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly; 
    
  }
  .nav-item {
    width: 150px;
    height: 150px;
    box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    border-radius: 12px;
    margin-top: 30px;
    
  }
  .nav-item:hover {
    background-color: rgb(231, 231, 231);
  }
  .nav-icon {
    font-size: 56px;
    margin-bottom: 20px;
  }


</style>