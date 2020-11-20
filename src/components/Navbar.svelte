<script>
  import { Navigate } from 'svelte-router-spa'
  import { onMount } from "svelte"

  // List of navigation items
  const navItems = [
    { label: "Løyper", route: "/" },
    { label: "Heiser", route: "/lifts" },
  ]
</script>
<nav class="pa3 pa4-ns">
  <a class="link dim black b f6 f5-ns dib mr3" href="/">Løypekart</a>
  {#each navItems as item}
    <a class="link dim gray f6 f5-ns dib mr3" href={item.route}>{item.label}</a>
  {/each}
</nav>