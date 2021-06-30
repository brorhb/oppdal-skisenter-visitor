<script>
  import {createEventDispatcher} from 'svelte'
  import { difficulty } from '../helpers/difficulty';
  import LiftItem from './LiftItem.svelte';
  const dispatch = createEventDispatcher();
  export let items = []
  let fullscreen = false;
  function clicked(item) {
    dispatch('select', item)
  }

</script>
{#if !fullscreen}
  <div class="card card-hover" on:click="{() => fullscreen = true}">
    <svg id="map" class="map" viewBox="0 0 1209 767" preserveAspectRatio="xMinYMin meet">
      <image height="100%" href="../../assets/map.svg" alt="Løypekart"></image>
      {#each items as item}
        {#if item.coords}
          <g class="hover_group" opacity="1">
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
  </div>
{:else}
<div class="map-fullscreen">
  <div class="map-nav"><i on:click="{() => fullscreen = false}" class="fas fa-times"></i></div>
  <svg class="map" viewBox="0 0 1209 767" preserveAspectRatio="xMinYMin meet">
    <image height="100%" href="../../assets/map.svg" alt="Løypekart"></image>
    {#each items as item}
      {#if item.coords}
        <g class="hover_group" opacity="1">
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
  <div class="overlay" on:click="{() => fullscreen = false}"></div>
</div>
{/if}


<style>
  .map {
    margin: 20px;
  }
  .map-fullscreen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .overlay {
    height: 50%;
    width: 100%;
    background:  gray;
    opacity: 0.75;
    padding: 0; 
    margin: 0;
  }
  .map-fullscreen > .map {
    margin: 0;
    padding: 0;
  }
  .map-nav {
    width: 100%;
    height: 50px;
    background: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .map-nav > i {
    font-size: 26px;
    padding: 0 15px 0 15px;
    cursor: pointer;
  }
  .map-nav > i:hover {
    background: #e9e9e9
  }
</style>
