<script>
let innerWidth
</script>
<svelte:window bind:innerWidth={innerWidth} />
<div class={`${innerWidth < 800 ? "w-50" : "w-25"} pa2`}>
  <slot class="bg-light-gray pa2"></slot>
</div>