<template>
  <div class="flex flex-col w-full items-start" v-click-outside="onClickOutside">
    <button
      class="flex flex-row w-full bg-blue-800 text-white font-bold text-lg p-2 rounded-xl justify-between items-center"
      @click="showDropdown = !showDropdown"
    >
      <div v-if="value">{{ value.name }}</div>
      <chevron-down v-if="!showDropdown"></chevron-down>
      <chevron-up v-else></chevron-up>
    </button>
    <div v-if="showDropdown" class="mt-2 bg-white rounded-xl p-2 w-full">
      <div v-for="(option, index) in options" :key="index" class="w-full">
        <button @click="() => select(option)" class="w-full">
          <div>
            <div
              :class="`${
                option.id == value.id ? 'font-bold' : 'text-sm'
              } flex flex-row justify-between items-center w-full py-2`"
            >
              <div>{{ option.name }}</div>
              <div
                :class="`${
                  isZoneOpen(option.id)
                    ? 'text-green-500'
                    : 'text-gray-400'
                }`"
              >
                {{ isZoneOpen(option.id) ? "Åpen" : "Stengt" }}
              </div>
            </div>
          </div>
          <hr v-if="index != options.length - 1" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["value", "options", "placeholder", "items"],
  methods: {
    select(option) {
      this.$emit("input", option);
      this.showDropdown = false;
    },
    onClickOutside() {
      this.showDropdown = false;
    },
    isZoneOpen(id) {
      return this.openZones.find(zone => zone === id);
    }
  },
  computed: {
    openZones() {
      if (!this.items) return false;
      const openItems = this.items
        .filter(item => item.status === "open")
        .map(item => item.zone);
      return [...new Set(openItems)];
    },
  },
  data() {
    return {
      showDropdown: false,
    };
  },
};
</script>
