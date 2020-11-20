<script>
  import {createEventDispatcher, onMount} from 'svelte'
  const dispatch = createEventDispatcher();
  export let items = []
  let innerWidth

  function clicked(item) {
    dispatch('select', item)
  }

  onMount(() => {
    console.log(items)
  })

</script>
<svelte:window bind:innerWidth={innerWidth} />

<div class={`${innerWidth < 800 ? "h-100" : ""} w-100 overflow-auto`}>
  <svg class={`${innerWidth < 800 ? 'h-100': 'w-100'}`} viewBox="0 0 1209 767" preserveAspectRatio="xMinYMin meet">
    <image height="100%" href="../../assets/map.svg" alt="Løypekart"></image>
    {#each items as item}
      {#if item.coords}
        <g class="hover_group" opacity="1">
          <circle
            class="pointer"
            cx={parseInt(item.coords.x) + 7}
            cy={parseInt(item.coords.y) + 7}
            opacity="1"
            fill={`${item.status === "closed" ? "red" : "green"}`}
            r="14"
            on:click={() => clicked(item)}
          >
          <div>hello</div>
        </circle>
        </g>
      {/if}
    {/each}
  </svg>
</div>
