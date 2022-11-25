<template>
  <div>
    <div class="dark:bg-gray-800 bg-white dart:text-white">
      <admin-navbar>Fasiliteter</admin-navbar>
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
    facilities: []
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
    itemChanged: async (item, status) => {
      await AuthFetch(
        `${BASE_URL}/admin/toggle-status/facilities/${item.id}/${status}`,
        'PATCH'
      )
    },
    updatedAllWithStatus: async (type, zone) => {
      await AuthFetch(
        `${BASE_URL}/admin/track/status-zone`,
        'PATCH',
        {
          type,
          zone
        }
      )
    }
  }
}
</script>