<script>
  import {onMount} from 'svelte'
  import svgPanZoom from 'svg-pan-zoom'
  export let items = []
  export let panAndZoom = false;
  export let isFullscreen = false;
  import {createEventDispatcher} from 'svelte'
  import { map_focus } from '../stores/MapFocusStore';
  import { selected_zone } from '../stores/SelectedZoneStore'; /** Needed for zoning */
  const dispatch = createEventDispatcher();
  const openFullscreen = () => dispatch('open')
  let map;
  let svgObj;
  let height;
  let width;
  let infoBox;
  let x_coord;
  let y_coord;

  const clicked = (item) => infoBox = item;
  const zoomIn = () => svgObj.zoomIn();
  const zoomOut = () => svgObj.zoomOut();
  let beforePan = function (oldPan, newPan) {
    let sizes = this.getSizes();
    let gutterWidth = sizes.width - 10;
    let gutterHeight = sizes.height - 10;
    let leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth;
    let rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom);
    let topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight;
    let bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);
    let customPan = {
      x: Math.max(leftLimit, Math.min(rightLimit, newPan.x)),
      y: Math.max(topLimit, Math.min(bottomLimit, newPan.y))
    }
    return customPan
  }

  onMount(async () => {
    if(!panAndZoom) return;
    svgObj = svgPanZoom(map, {
      minZoom: 1,
      beforePan: beforePan
    });
    height = svgObj.getSizes().viewBox.height
    width = svgObj.getSizes().viewBox.width
  })

function setMapFocus() {
  for (let i=0; i < items.length; i++) {
    if (items[i].name == $map_focus) {
      if(items[i].coords) { //Some tracs/lifts have coords = null
        x_coord = parseInt(items[i].coords.x);
        y_coord = parseInt(items[i].coords.y);
        return true;
      };
    };
  };
  return false;
};
function get_length(text) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext("2d");
  ctx.font = "bold 18px sans-serif";
  var width = ctx.measureText(text).width;
  return width;
}
</script>
<div class="map">
  <svg id="map"  width="{width ? width : null}" height="{height ? height : null}" viewBox="0 0 1209 767" preserveAspectRatio="xMinYMin meet" bind:this="{map}" >
    <g>
    <image width="{width ? width : null}" height="{height ? height : '100%'}" href="../../assets/map.svg" alt="Løypekart"></image> <!--CHANGE TO map2-->
    {#each items as item}
      {#if item.coords}
        <g class="hover_group" opacity="1">
          <circle
            cx={parseInt(item.coords.x)}
            cy={parseInt(item.coords.y)}
            opacity="1"
            fill={`${item.status === "open" ? "green" : "red"}`}
            r="5"
          ></circle>
          <circle
            class="pointer"
            cx={parseInt(item.coords.x) + 7}
            cy={parseInt(item.coords.y) + 7}
            opacity="0"
            r="14"
            on:click={() => clicked(item)}
            on:mouseover={() => clicked(item)}
            on:mouseout={() => clicked()}
          ></circle>
          
        
        <polygon points={`${parseInt(item.coords.x)+get_length(item.name)/2+10},${parseInt(item.coords.y)-20} ${parseInt(item.coords.x)+10},${parseInt(item.coords.y)-20} ${parseInt(item.coords.x)},${parseInt(item.coords.y)} ${parseInt(item.coords.x)-10},${parseInt(item.coords.y)-20} ${parseInt(item.coords.x)-get_length(item.name)/2-10},${parseInt(item.coords.y)-20} ${parseInt(item.coords.x)-get_length(item.name)/2-10},${parseInt(item.coords.y)-50} ${parseInt(item.coords.x)+get_length(item.name)/2+10},${parseInt(item.coords.y)-50}`} style={infoBox == item ? "fill: #2C3B6C": 'display:none'} />
        <text x={parseInt(item.coords.x)-get_length(item.name)/2} y={parseInt(item.coords.y)-30} style={infoBox == item ? 'display: border-box; font: bold 18px sans-serif; fill: #F4F8FF': 'display:none'}>{item.name}</text>  <!---ADD HOVER HERE-->   
        </g>
      {/if}
    {/each}
    {#if $map_focus.length > 0 && setMapFocus()}
      <span id="map_focus_length">{$map_focus}</span>
      <polygon points={`${x_coord+get_length($map_focus)/2+10},${y_coord-20} ${x_coord+10},${y_coord-20} ${x_coord},${y_coord} ${x_coord-10},${y_coord-20} ${x_coord-get_length($map_focus)/2-10},${y_coord-20} ${x_coord-get_length($map_focus)/2-10},${y_coord-50} ${x_coord+get_length($map_focus)/2+10},${y_coord-50}`} style="fill: #2C3B6C"/>
      <text x={x_coord-get_length($map_focus)/2} y={y_coord-30} style='display: border-box; font: bold 18px sans-serif; fill: #F4F8FF'>{$map_focus}</text>  <!---ADD HOVER HERE-->   
    {/if}
  </g>
  </svg>
  {#if panAndZoom}
  <div class="zoom-buttons">
    <button on:click="{zoomIn}"><i class="fas fa-plus"></i></button>
    <button on:click="{zoomOut}"><i class="fas fa-minus"></i></button>
  </div>
  {/if}
  <div class="fullscreen-button">
    {#if !isFullscreen && false} <!-- Remove temp. as it does not work properly on mobile yet -->
    <button on:click="{openFullscreen}"><p>Åpne kart i fullskjerm</p></button>
    {/if}
  </div>
  <div class="live-overlay">
    <div class="direct-circle"></div>
    <p class="smallbold">DIREKTE</p>
  </div>
  <div class="information-overlay">
    <div>
      <div class="overlay-circle green"></div>
      <p>Åpen</p>
    </div>
    <div>
      <div class="overlay-circle red"></div>
      <p>Stengt</p>
    </div>
  </div>
</div>

<style>
  .map {
    box-sizing: border-box;
    width: 100%;
    position: relative;
  }
  .map > svg {
    border-radius: 9px;
  }
  .zoom-buttons {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 4rem;
    right: 2rem;
  }
  .zoom-buttons > button {
    width: 38px;
    height: 38px;
    padding: 11px;
    background: rgba(255, 255, 255, 0.81);
    color: #2C3B6C;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    transition: 0.5s ease;
  }
  .zoom-buttons > button:hover {
    background: #d6efff;
    transition: 0.5s ease;
  }
  .live-overlay {
    width: 68px;
    height: 68px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(35, 35, 35, 0.41);
    border-radius: 8px;
    position: absolute; 
    top: 1rem;
    right: 1rem;
    z-index: 1000;
  }
  .information-overlay {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    width: 111px;
    height: 53px;
    background: rgba(255, 255, 255, 0.81);
    border-radius: 8px;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .information-overlay > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0.5rem;
  }
  .live-overlay > p {
    color: #FFFFFF;
  }
  .overlay-circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-bottom: 4px;
  }
  .direct-circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    margin-bottom: 4px;
    background: #FB3F3F;
    border: 1.3px solid rgba(0, 0, 0, 0.42);
    box-sizing: border-box;
  }
  .red {
    background: #FB3F3F;
    border: 1.3px solid rgba(0, 0, 0, 0.42);
    box-sizing: border-box;
    box-shadow: 0px 1px 6px #FF3B3B;
  }
  .green {
    background: #2FC93E;
    border: 1.3px solid #1DAB2B;
    box-sizing: border-box;
    box-shadow: 0px 1px 6px #74FF82;
  }
  .fullscreen-button {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fullscreen-button > button {
    border: none;
    background: rgba(244, 248, 255, 0.9);
    border-radius: 25px;
    padding: 0.5rem 1rem;
  }
  @media only screen and (max-width: 1000px) {
      .map {
          height: 100%;
      }
  }
</style>
