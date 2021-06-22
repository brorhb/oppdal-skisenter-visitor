<script>
  import { navigateTo } from 'svelte-router-spa'
</script>

<div class="admin-index">
  <div class="nav-item" on:click={() => navigateTo('/admin/meldinger')}>
    <div class="nav-icon">
    </div>
    <div class="nav-title">
        Viktige meldinger
    </div>
  </div>

  <div class="nav-item" on:click={() => navigateTo('/admin/tracks')}>
    <div class="nav-icon">
    </div>
    <div class="nav-title">
        Løyper
    </div>
  </div>

  <div class="nav-item" >
    <div class="nav-icon">
    </div>
    <div class="nav-title">
        Heiser
    </div>
  </div>

  <div class="nav-item" >
    <div class="nav-icon">
    </div>
    <div class="nav-title">
        Snøforhold
    </div>
  </div>

  <div class="nav-item" >
    <div class="nav-icon">
    </div>
    <div class="nav-title">
        Informasjon
    </div>
  </div>
</div>

<style>
  .admin-index {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .nav-item {
    width: 300px;
    height: 200px;
    box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 40px;
    border-radius: 12px;
  }
  .nav-item:hover {
    background-color: rgb(231, 231, 231);
  }
</style>