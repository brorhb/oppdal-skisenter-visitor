<script>
	import { Router } from 'svelte-router-spa'
  import { routes } from './routes'
  import { onDestroy, onMount } from 'svelte'
</script>
<Router {routes} />