<script>
  import { Route } from 'svelte-router-spa'
  export let currentRoute
  export const params = {} 
  import { navigateTo } from 'svelte-router-spa'

  function logout() {
    localStorage.removeItem('user');
    navigateTo(`/login`)
  }
</script>

<div>
  <div class="nav">
    <h1 class="oppdal-title" on:click={() => navigateTo('/admin')}>Oppdal Skisenter Admin</h1>
    <button on:click={logout}>Logg av</button>
  </div>

  <section>
    <Route {currentRoute}  {params} />
  </section>
</div>

<style>
  .nav {
    width: 100%;
    background-color: #393E46;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 30px;
  }
  .nav > h1 {
    cursor: pointer;
  }
  .nav > h1:hover {
    color: rgb(231, 231, 231);
  }
  .nav > button {
    cursor: pointer;
    width: 100px;
  }

  @media only screen and (max-width: 600px) {
    .nav {
      flex-direction: column;
    }
    .nav > h1 {
      text-align: center;
    }
    .nav > button {
      margin-bottom: 20px;
    }
  }
</style>