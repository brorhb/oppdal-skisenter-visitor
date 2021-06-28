<script>
  import {createEventDispatcher} from 'svelte'
import { difficulty } from '../helpers/difficulty';
  const dispatch = createEventDispatcher();
  export let items = []
  let selectedItem = undefined
  function clicked(item) {
    dispatch('select', item)
  }
  function showDetails(item) {
    selectedItem = item;
  }   

</script>

<div class="card card-hover">
  <svg class="map" viewBox="0 0 1209 767" preserveAspectRatio="xMinYMin meet">
    <image height="100%" href="../../assets/map.svg" alt="Løypekart"></image>
    {#each items as item}
      {#if item.coords}
        <g class="hover_group" opacity="1" on:click="{() => showDetails(item)}">
          <circle
            class="pointer"
            cx={parseInt(item.coords.x) + 7}
            cy={parseInt(item.coords.y) + 7}
            opacity="0"
            fill={`${item.status === "closed" ? "red" : "green"}`}
            r="14"
            on:click={() => clicked(item)}
          >
        </circle>
        <circle
            cx={parseInt(item.coords.x)}
            cy={parseInt(item.coords.y)}
            opacity="1"
            fill={`${item.status === "closed" ? "red" : "green"}`}
            r="5"
          ></circle>
        </g>
      {/if}
    {/each}
  </svg>
  {#if selectedItem}
    <div class="item-detail">
      <div>{selectedItem.name}</div>
      <div>{selectedItem.status}</div>
      <div>{selectedItem.difficulty}</div>
      <button on:click="{() => selectedItem = undefined}">Lukk</button>
    </div>
    {/if}
</div>

<style>
  .map {
    margin: 20px;
  }
  .item-detail {
    z-index: 1000;
    width: 250px;
    height: 250px;
    color: #fff;
    background: #000;
  }
</style>
