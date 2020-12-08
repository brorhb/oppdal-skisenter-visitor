<script>
  import { Route } from 'svelte-router-spa'
  import Navbar from './Navbar.svelte'
  export let currentRoute
  export const params = {}

  const navItems = [
    {
      route: "/tracks",
      label: "Tracks"
    },
    {
      route: "/lifts",
      label: "Lifts"
    }
  ]
</script>
<div class="h-100 flex flex-column">
  <nav class="pa3 pa4-ns">
    <a class="link dim black b f6 f5-ns dib mr3" href="/admin/tracks">Admin</a>
    {#each navItems as item}
      <a class="link dim gray f6 f5-ns dib mr3" href={"/admin" + item.route}>{item.label}</a>
    {/each}
  </nav>
  <section class="flex h-100 pa2">
    <Route {currentRoute}  {params} />
  </section>
</div>