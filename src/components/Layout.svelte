<script>
  import { Route } from 'svelte-router-spa'
  import Header from '../views/Header.svelte';
  import Navbar from '../components/Navbar.svelte'
  import Alert from './Alert.svelte';
  import Footer from './Footer.svelte';
  export let currentRoute
  export const params = {}
</script>

<div class="flex flex-col items-center h-full w-full font-sans dark:bg-gray-800 bg-white dark:text-white">
  <Navbar />
  <Header />
  <Alert/>
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