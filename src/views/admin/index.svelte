<script>
  import NavigationButton from '../../components/admin/NavigationButton.svelte'
  import { navigateTo } from 'svelte-router-spa'
  import OFetch from '../../helpers/fetch';
  import config from '../../helpers/config';
  import Navbar from '../../components/admin/Navbar.svelte';
  import { Route } from 'svelte-router-spa'
import Toast from '../../components/admin/Toast.svelte';
  export let currentRoute
  export const params = {} 
  function logout() {
    localStorage.removeItem('user');
    navigateTo(`/login`)
  }
  async function testAvalanche() {
    try {
      console.log("TEST AVALANCHE")
            const res = await OFetch(
                `${config.BASE_URL}/admin/panoramasign/avalanche`,
                "PATCH", 0
            )
            console.log(res)
            
        } catch(err) {
            console.warn(err)
        }
  }
  async function testRelays() {
    try {
      console.log("TEST RELAYS")
            const res = await OFetch(
                `${config.BASE_URL}/admin/panoramasign/relays`,
                "PATCH"
            )
            console.log(res)
            
        } catch(err) {
            console.warn(err)
        }
  }
</script>

<div class="admin-index">
  <Navbar {currentRoute}/>
  <section class="max-width-wrapper">
    <Route {currentRoute}  {params} />
  </section>
  <Toast/>
</div>

<style>
  .admin-index {
    min-width: 100%;
    height: 100%;
    background: #F5F2F2;
  }
  @media only screen and (max-width: 600px) {
    .admin-index {
      justify-content: space-evenly;
    }
  }
</style>