<script>
  import { Navigate } from 'svelte-router-spa'
  import { onMount } from "svelte"

  // List of navigation items
  const navItems = [
    {
      label: "Kamera",
      route: "/cameras"
    }
  ]
</script>
<nav class="pa3 bb b--black-10">
  <a class="link dim black b f6 f5-ns dib mr3" href="/">Løypekart</a>
  {#each navItems as item}
    <a class="link dim gray f6 f5-ns dib mr3 pointer" href={item.route}>{item.label}</a>
  {/each}
</nav>