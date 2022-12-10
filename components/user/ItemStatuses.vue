<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex flex-col bg- rounded-2xl w-full pb-4 pt-4 lg:pt-0">
      <div class="flex flex-col">
        <div class="text-xs font-bold">Område</div>
        <div class="py-1"></div>
        <div class="w-full flex flex-row">
          <map-items-dropdown
            :value="selectedZone"
            @input="onSelect"
            :options="zones"
            :items="[...items.tracks, ...items.lifts]"
          ></map-items-dropdown>
        </div>
      </div>
    </div>
    <div class="h-full overflow-scroll overscroll-contain bg-white dark:bg-gray-800 rounded-2xl">
      <div class="flex flex-col w-full p-4 mt-2">
        <div class="text-xs font-bold pb-4">Heiser</div>
        <item-list
          :focusedItem="focusedItem"
          @onFocus="(val) => $emit('onFocus', val)"
          :items="liftsInActiveZone"
        ></item-list>
      </div>
      <div class="flex flex-col w-full p-4">
        <div class="text-xs font-bold pb-4">Løyper</div>
        <item-list
          :focusedItem="focusedItem"
          @onFocus="(val) => $emit('onFocus', val)"
          :items="tracksInActiveZone"
        ></item-list>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["items", "selectedZone", "zones", "focusedItem"],
  methods: {
    onSelect(zone) {
      this.$emit("onZoneChange", zone);
    },
  },
  computed: {
    liftsInActiveZone() {
      if (!this.selectedZone) return [];
      const items = this.items.lifts.filter(
        (lift) => lift.zone === this.selectedZone.id
      );
      const openItems = items.filter((lift) => lift.status === "open");
      const closedItems = items.filter((lift) => lift.status !== "open");
      return [...openItems, ...closedItems];
    },
    tracksInActiveZone() {
      if (!this.selectedZone) return [];
      const items = this.items.tracks.filter(
        (track) => track.zone === this.selectedZone.id
      );
      const openItems = items.filter((track) => track.status === "open");
      const closedItems = items.filter((track) => track.status !== "open");
      return [...openItems, ...closedItems];
    },
  },
};
</script>
