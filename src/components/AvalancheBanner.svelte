<script>
  import { makeAvalancheStore } from '../stores/AvalancheStore'
  import { onDestroy, onMount } from 'svelte'
  import { parse, format } from 'fecha';
  let unsubscribe
  let avalancheStore = makeAvalancheStore()
  let warnings = []
  $: warning = warnings[warnings.length-1]


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

  const levels = {
    "none": "Ingen",
    "low": "Lav",
    "medium": "Middels",
    "high": "Høy"
  }
</script>

{#if warning}
<div class="flex flex-row bg-yellow pa2 justify-between">
  <div>Skredfare: <span class="fw6">{levels[warning.level.value]}</span></div>
  <div>{format(parse(warning.timestamp, 'isoDateTime'), "mediumDate")}</div>
</div>
{/if}