<script>
  import { makeLiftsStore } from '../stores/LiftsStore'
  import { onDestroy, onMount } from 'svelte'
  let unsubscribe
  let liftsStore = makeLiftsStore()
  let lifts = {}


  onDestroy(() => {
    if(unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
	});
	
	onMount(async () => {
		liftsStore.subscribe((data) => {
			lifts = data
		})
	})
</script>
{JSON.stringify(lifts)}