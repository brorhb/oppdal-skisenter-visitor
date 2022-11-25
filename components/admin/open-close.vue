<template>
    <div>
      <div v-for="key in Object.keys(reduceIntoZones)" :key="key">
        <h1 class="text-xl font-bold">{{ getZone(key).name }}</h1>
        <div class="py-4">
          <div :class="`py-2 px-4 rounded-xl dark:bg-gray-900 bg-gray-100`">
            <div class="w-full flex flex-row justify-between">
              <button class="underline" @click="() => updateAllWithStatus('open', getZone(key).id)">Åpne alle</button>
              <button class="underline" @click="() => updateAllWithStatus('closed', getZone(key).id)">Steng alle</button>
              <button class="underline" @click="() => updateAllWithStatus('maintanence', getZone(key).id)">Deaktiver alle</button>
              <button @click="() => toggleZone(getZone(key).id)">
                <span v-if="expandedZones.includes(getZone(key).id)">⬆️</span>
                <span v-else>⬇️</span>
              </button>
            </div>
            <div class="pt-6" v-show="expandedZones.includes(getZone(key).id)">
              <table class="table-auto w-full">
                <thead>
                  <th class="border-b text-left p-4 pl-8 pt-0 pb-3">Kart</th>
                  <th class="border-b text-left p-4 pl-8 pt-0 pb-3">Navn</th>
                  <th class="border-b text-left p-4 pl-8 pt-0 pb-3">Status</th>
                  <th class="border-b text-left p-4 pl-8 pt-0 pb-3">Åpne</th>
                  <th class="border-b text-left p-4 pl-8 pt-0 pb-3">Steng</th>
                  <th class="border-b text-left p-4 pl-8 pt-0 pb-3">Blank</th>
                </thead>
                <tbody class="bg-white dark:bg-gray-800">
                  <tr v-for="item in reduceIntoZones[key]" :key="item.id" class="">
                    <td class="p-4 pl-8 border-b border-gray-100 dark:border-gray-700 text-left">{{ item["map_name"] || item["id"] }}</td>
                    <td class="p-4 pl-8 border-b border-gray-100 dark:border-gray-700 text-left">{{ item["name"] }}</td>
                    <td :class="`p-4 pl-8 border-b border-gray-100 dark:border-gray-700 text-left ${item['status'] == 'open' ? 'text-green-600' : 'text-red-600' }`">{{ item["status"] == "open" ? "Åpen" : "Stengt" }}</td>
                    <td class="p-4 pl-8 border-b border-gray-100 dark:border-gray-700 text-left">
                      <input type="radio" :checked="item.status == 'open'" :name="item.id" @click="() => itemStatusClicked(item, 1)" />
                    </td>
                    <td class="p-4 pl-8 border-b border-gray-100 dark:border-gray-700 text-left">
                      <input type="radio" :checked="item.status == 'closed'" :name="item.id" @click="() => itemStatusClicked(item, 2)" />
                    </td>
                    <td class="p-4 pl-8 border-b border-gray-100 dark:border-gray-700 text-left">
                      <input type="radio" :checked="item.status == 'maintanence'" :name="item.id" @click="() => itemStatusClicked(item, 3)" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: ['items', 'zones'],
  data: () => ({
    expandedZones: [],
  }),
  computed: {
    reduceIntoZones() {
      const zones = this.items.reduce((acc, item) => {
        if (item.zone) {
          if (!acc[item.zone]) {
            acc[item.zone] = [];
          }
          acc[item.zone].push(item);
        }
        return acc;
      }, {});
      return zones
    },
  },
  methods: {
    getZone(zone) {
      return this.zones.find((z) => z.id == zone);
    },
    toggleZone(id) {
      if (this.expandedZones.includes(id)) {
        this.expandedZones = this.expandedZones.filter((z) => z != id);
      } else {
        this.expandedZones.push(id);
      }
    },
    itemStatusClicked(item, status) {
      this.$emit('itemChanged', item, status)
    },
    updateAllWithStatus(status, zone) {
      this.$emit('updatedAllWithStatus', status, zone)
    }
  }
}
</script>