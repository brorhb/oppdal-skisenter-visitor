<template>
  <div ref="Map">
    <svg
      class="rounded-2xl"
      id="map"
      width="100%"
      height="100%"
      viewBox="0 0 1209 767"
      preserveAspectRatio="xMinYMin meet"
    >
      <g>
        <image
          width="100%"
          height="100%"
          href="/assets/map-2.svg"
          alt="Løypekart"
        ></image>

        <g v-for="(item, index) in items" :key="index">
          <g v-if="item.coords">
            <circle
              @mouseenter="() => $emit('onFocus', item)"
              @mouseleave="() => $emit('onFocus', false)"
              :cx="parseInt(item.coords.x)"
              :cy="parseInt(item.coords.y)"
              opacity="1"
              :fill="getStatusColor(item)"
              :r="isFocused(item) ? '10' : '5'"
            ></circle>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  props: ["tracks", "lifts", "focusedItem"],
  computed: {
    items() {
      if (!this.tracks || !this.lifts) return false;
      return [...this.tracks, ...this.lifts];
    },
  },
  methods: {
    isFocused(item) {
      const itemAsString = JSON.stringify(item);
      const focusedItemAsString = JSON.stringify(this.focusedItem);
      return itemAsString === focusedItemAsString;
    },
    getStatusColor(item) {
      const itemAsString = JSON.stringify(item);
      const focusedItemAsString = JSON.stringify(this.focusedItem);
      if (itemAsString === focusedItemAsString) {
        return "yellow";
      }
      if (item.status === "open") {
        return "green";
      } else if (item.status === "closed") {
        return "red";
      } else {
        return "grey";
      }
    },
  },
};
</script>
