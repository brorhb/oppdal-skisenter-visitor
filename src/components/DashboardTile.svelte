<script>
let innerWidth
</script>
<svelte:window bind:innerWidth={innerWidth} />
<div>
  <div>
    <slot></slot>
  </div>
</div>

<style>

</style>