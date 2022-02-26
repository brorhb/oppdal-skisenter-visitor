<template>
  <div>
    <div class="dark:bg-gray-800 bg-white dart:text-white">
      <admin-navbar></admin-navbar>
    </div>
    <div 
      class="flex flex-col items-center font-sans dark:bg-gray-700 bg-white dark:text-white"
    >
      <max-wrapper>
        <admin-open-close :items="tracks" :zones="zones"></admin-open-close>
      </max-wrapper>
    </div>
  </div>
</template>
<script>
export default {
  middleware({ redirect }) {
    if (!window.localStorage.getItem("token")) {
      redirect("/admin/login");
    }
  },
  data: () => ({
    zones: [],
    tracks: []
  }),
  async fetch() {
    this.fetchZones();
    this.fetchTracks();
  },
  methods: {
    fetchZones() {
      fetch(process.env.BASE_URL + "/zones", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      })
        .then((res) => res.json())
        .then((res) => {
          this.zones = res;
        });
    },
    fetchTracks() {
      fetch(process.env.BASE_URL + "/tracks", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      })
        .then((res) => res.json())
        .then((res) => {
          this.tracks = res;
        });
    },
  }
}
</script>