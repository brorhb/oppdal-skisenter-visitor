<script>
  import { makeAvalancheStore } from '../stores/AvalancheStore'
  import { onDestroy, onMount } from 'svelte'
  let unsubscribe
  let avalancheStore = makeAvalancheStore()
  let warnings = []
  $: warning = warnings[warnings.length]


  onDestroy(() => {
    if(unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
	});
	
	onMount(async () => {
		avalancheStore.subscribe((data) => {
			warnings = data
		})
  })
</script>

{#if warnings.length}
<div class="flex flex-row bg-yellow pa2 justify-between">
  <div>Skredfare: {warning?.level ?? "ingen"}</div>
  <div>{warning?.timestamp ?? new Date()}</div>
</div>
{/if}