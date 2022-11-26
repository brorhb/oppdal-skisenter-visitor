<template>
  <div>
    <div class="dark:bg-gray-800 bg-white dart:text-white">
      <admin-navbar>
        <span>Fasiliteter</span>
        <template v-slot:actions>
          <button :disabled="updatingBillboard || updating"
            :class="`py-2 px-4 mt-2 rounded-full text-white ${!updatingBillboard || !updating ? 'bg-yellow-600 dark:bg-yellow-700' : 'bg-gray-400 dark:bg-gray-300'}`"
            @click="updateBillboard">Oppdater tavle</button>
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
import AuthFetch from '../../helpers/fetch'
import BASE_URL from '../../helpers/baseurl';
export default {
  middleware({ redirect }) {
    if (!window.localStorage.getItem("token")) {
      redirect("/admin/login");
    }
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
  methods: {
    fetchZones() {
      fetch(BASE_URL + "/zones", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      })
        .then((res) => res.json())
        .then((res) => {
          this.zones = res;
        });
    },
    fetchFacilities() {
      fetch(BASE_URL + "/facilities", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      })
        .then((res) => res.json())
        .then((res) => {
          this.facilities = res;
        });
    },
    async itemChanged(item, status) {
      this.updating = true
      await AuthFetch(
        `${BASE_URL}/admin/toggle-status/facilities/${item.id}/${status}`,
        'PATCH'
      )
      this.updating = false
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
      this.updating = false
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