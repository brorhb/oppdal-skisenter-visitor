<script>
let innerWidth
</script>
<svelte:window bind:innerWidth={innerWidth} />
<div class={`${innerWidth < 800 ? "w-100" : "w-25"} pa2`}>
  <div class="bg-lightest-blue pa2">
    <slot></slot>
  </div>
</div>