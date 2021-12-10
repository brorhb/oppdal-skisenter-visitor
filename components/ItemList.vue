<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <div
        :class="`flex flex-row justify-between items-center cursor-pointer ${
          index !== items.length - 1 && 'pb-1'
        } ${isFocused(item) && 'bg-blue-300 p-1 rounded-sm'}`"
        @mouseenter="() => $emit('onFocus', item)"
        @mouseleave="() => $emit('onFocus', false)"
      >
        <div class="text-sm">{{ item.name }}</div>
        <div class="text-xs font-bold">
          {{ item.status === "open" ? "Åpen ✅" : "Stengt ❌" }}
        </div>
      </div>
      <hr v-if="index !== items.length - 1" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["items", "focusedItem"],
  methods: {
    isFocused(item) {
      if (!this.focusedItem) return false;
      return JSON.stringify(this.focusedItem) === JSON.stringify(item);
    },
  },
};
</script>
