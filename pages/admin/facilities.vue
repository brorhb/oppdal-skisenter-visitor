<template>
  <div>
    <div v-if="isLoading" class="absolute w-full h-full flex justify-center items-center">
      <div class="w-full h-full absolute bg-gray-800 z-10 opacity-70" />
      <loading class="z-20" :active="isLoading" is-full-page />
    </div>
    <div class="dark:bg-gray-800 bg-white dart:text-white">
      <admin-navbar>
        <span>Fasiliteter</span>
        <template v-slot:actions>
          <button :disabled="isLoading"
            :class="`py-2 px-4 mt-2 rounded-full text-white ${!isLoading ? 'bg-yellow-600 dark:bg-yellow-700' : 'bg-gray-400 dark:bg-gray-300'}`"
            @click="updateBillboard">Send til tavle</button>
        </template>
      </admin-navbar>
    </div>
    <div 
      class="flex flex-col items-center font-sans dark:bg-gray-700 bg-white dark:text-white"
    >
      <max-wrapper>
        <admin-open-close :items="facilities" :zones="zones" @itemChanged="itemChanged" @updatedAllWithStatus="updatedAllWithStatus"></admin-open-close>
      </max-wrapper>
    </div>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import AuthFetch from '../../helpers/fetch'
import BASE_URL from '../../helpers/baseurl';
export default {
  middleware({ redirect }) {
    if (!window.localStorage.getItem("token")) {
      redirect("/admin/login");
    }
  },
  components: {
    Loading
  },
  data: () => ({
    zones: [],
    facilities: [],
    updatingBillboard: false,
    updating: false
  }),
  async fetch() {
    this.fetchZones();
    this.fetchFacilities();
  },
  computed: {
    isLoading() {
      if (this.updating === true) return true
      if (this.updateBillboard === true) return true
      return false
    }
  },
  methods: {
    fetchZones() {
      AuthFetch(BASE_URL + "/zones")
        .then((res) => {
          this.zones = res;
        });
    },
    fetchFacilities() {
      AuthFetch(BASE_URL + "/facilities")
        .then((res) => {
          this.facilities = res;
          this.updating = false
        });
    },
    async itemChanged(item, status) {
      this.updating = true
      await AuthFetch(
        `${BASE_URL}/admin/toggle-status/facilities/${item.id}/${status}`,
        'PATCH'
      )
      this.fetchFacilities()
    },
    async updatedAllWithStatus(type, zone) {
      this.updating = true
      await AuthFetch(
        `${BASE_URL}/admin/track/status-zone`,
        'PATCH',
        {
          type,
          zone
        }
      )
      this.fetchFacilities()
    },
    async updateBillboard() {
      this.updatingBillboard = true
      try {
        await AuthFetch(
          `${BASE_URL}/admin/panoramasign/relays`,
          'PATCH'
        )
      } catch (err) {
        console.warn(err)
      }
      this.updatingBillboard = false
    }
  }
}
</script>