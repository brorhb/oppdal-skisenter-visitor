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
  <Alert/>
  <section>
    <Route {currentRoute}  {params} />
  </section>
  <Footer />
</div>