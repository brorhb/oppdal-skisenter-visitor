<script>
  import { navigateTo } from 'svelte-router-spa'
  import { Route } from 'svelte-router-spa'
  export let currentRoute
  export const params = {} 

  function logout() {
    localStorage.removeItem('user');
    navigateTo(`/login`)
  }
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

  <div class="nav-item" on:click={() => navigateTo('/admin/webcamera')}>
    <div class="nav-icon">
      <i class="fas fa-video"></i>
    </div>
    <div class="nav-title">
        Webkamera
    </div>
  </div>

  <div class="nav-item" on:click={logout}>
    <div class="nav-icon">
      <i class="fas fa-sign-out-alt"></i>
    </div>
    <div class="nav-title">
        Logg av
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
    justify-content: center; 
    
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
    margin: 30px;
    
  }
  .nav-item:hover {
    background-color: rgb(231, 231, 231);
  }
  .nav-icon {
    font-size: 56px;
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 600px) {
    .admin-index {
      justify-content: space-evenly;
    }
    .nav-item {
      margin: 0;
      margin-top: 30px;
    }
  }

</style>