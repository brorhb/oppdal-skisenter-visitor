<script>
  import { Route } from 'svelte-router-spa'
  import Header from '../views/Header.svelte';
  import Navbar from '../components/Navbar.svelte'
  import Alert from './Alert.svelte';
  import Footer from './Footer.svelte';
  export let currentRoute
  export const params = {}
</script>

<div>
  <Navbar />
  <Header />
  <div class="alert-wrapper">
    <Alert/>
  </div>
  <section>
    <Route {currentRoute}  {params} />
  </section>
  <Footer />
</div>

<style>
  @media only screen and (max-width: 1000px) {
    .alert-wrapper {
      padding: 0 1rem 0 1rem;
    }
  }
</style>