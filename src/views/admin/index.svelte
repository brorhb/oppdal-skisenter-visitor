<script>
  import NavigationButton from '../../components/admin/NavigationButton.svelte'
  import { navigateTo } from 'svelte-router-spa'
  function logout() {
    localStorage.removeItem('user');
    navigateTo(`/login`)
  }
</script>

<div class="admin-index">
  <NavigationButton navigate={"/admin/meldinger"} faIcon={"info-circle"} title="Viktige meldinger"/>
  <NavigationButton navigate={"/admin/loyper"} faIcon={"route"} title="Løyper"/>
  <NavigationButton navigate={"/admin/heiser"} faIcon={"skiing"} title="Heiser"/>
  <NavigationButton navigate={"/admin/webkamera"} faIcon={"video"} title="Webkamera"/>
  <NavigationButton navigate={"/admin/snoforhold"} faIcon={"snowflake"} title="Snøforhold"/>
  <NavigationButton onclick={logout} faIcon={"sign-out-alt"} title="Logg av" /> 
</div>

<style>
  .admin-index {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  @media only screen and (max-width: 600px) {
    .admin-index {
      justify-content: space-evenly;
    }
  }
</style>