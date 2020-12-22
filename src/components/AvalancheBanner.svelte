<script>
  import { makeAvalancheStore } from '../stores/AvalancheStore'
  import { onDestroy, onMount } from 'svelte'
  import { parse, format } from 'fecha';
  let unsubscribe
  let avalancheStore = makeAvalancheStore()
  let warning = {}
  let expanded = false


  onDestroy(() => {
    if(unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
	});
	
	onMount(async () => {
		avalancheStore.subscribe((data) => {
			warning = data
		})
  })

  const color = (level) => {
    switch (level) {
      case "1":
        return ["bg-green", "white"]
      case "2":
        return ["bg-yellow", "black"]
      case "3":
        return ["bg-orange", "white"]
      case "4":
        return ["bg-red", "white"]
      case "5":
        return ["bg-dark-red", "white"]
      default:
        return ["bg-light-gray", "black"]
    }
  }
</script>
{#if "region" in warning}
<div class={`flex flex-column ${color(warning.level).join(" ")} pa2`}>
  <div class="flex flex-row justify-between">
    <div>Skredfare for {warning.region}: <span class="fw6">{warning.level}</span></div>
    <div>{format(parse(warning.published, 'isoDateTime'), "mediumDate")}</div>
  </div>
  {#if expanded}
    <div class="flex pv2 i">
      {warning.message}
    </div>
    <div class="flex pt2 i fw3">
      Skredvarsel hentet fra NVE
    </div>
  {/if}
  <div class="flex flex-row justify-end pa1" on:click={() => expanded = !expanded}>
    <span class="i underline pointer">
      {#if expanded}
        Skjul
      {:else}
        Vis mer
      {/if}
    </span>
  </div>
</div>
{/if}