<template>
  <div>
    <div v-for="(item, index) in items" v-if="item.hidden !== 1" :key="index">
      <div
        :class="`flex flex-row justify-between items-center cursor-pointer py-1 ${
          isFocused(item) && 'bg-blue-300 dark:bg-blue-700 px-2 rounded-sm'
        }`"
        @mouseenter="() => $emit('onFocus', item)"
        @mouseleave="() => $emit('onFocus', false)"
      >
        <div class="flex flex-row items-end">
          <div class="text-sm">({{ item.map_name }}) {{ item.name }}</div>
          <div v-if="item.difficulty" :class="`font-bold text-xs pl-3 ${itemDifficulty(item).color}`">{{ itemDifficulty(item).text }}</div>
        </div>
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
    itemDifficulty(item) {
      if (!item.difficulty) return;
      let color = "";
      let text = "";
      switch (item.difficulty) {
        case "beginner":
          color = "text-green-500";
          text = "Veldig lett";
          break;
        case "intermediate":
          color = "text-blue-500";
          text = "Lett";
          break;
        case "advanced":
          color = "text-red-500";
          text = "Middels";
          break;
        case "expert":
          color = "text-black";
          text = "Krevende";
          break;
        case "professional":
          color = "text-black";
          text = "Profesjonell";
          break;
        case "not rated":
          color = "text-black";
          text = "Upreparert";
          break;
        case "terrainpark":
          color = "text-yellow-600";
          text = "Terrengpark";
          break;
      }
      return {
        color: color,
        text: text,
      };
    },
    isFocused(item) {
      if (!this.focusedItem) return false;
      return JSON.stringify(this.focusedItem) === JSON.stringify(item);
    },
  },
};
</script>
