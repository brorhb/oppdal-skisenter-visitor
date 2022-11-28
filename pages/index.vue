<template>
  <div class="flex flex-col items-center h-full w-full font-sans dark:bg-gray-800 bg-white dark:text-white">
    <Navbar></Navbar>
    <Banner></Banner>
    <Alerts :alerts="alerts"></Alerts>
    <WeatherAndCameras
      :cameras="cameras"
      :weatherStations="weatherStations"
      :weatherPredictions="weatherPredictions"
    ></WeatherAndCameras>
    <map-status :tracks="tracks" :lifts="lifts" :zones="zones"></map-status>
    <security :avalancheWarnings="avalancheWarnings"></security>
    <div class="pt-4"></div>
    <Footer></Footer>
  </div>
</template>

<script>
import BASE_URL from '../helpers/baseurl';
export default {
  data: () => ({
    alerts: [],
    weatherStations: [],
    cameras: [],
    weatherPredictions: [],
    tracks: [],
    lifts: [],
    zones: [],
    avalancheWarnings: [],
  }),
  async fetch() {
    this.fetchAlerts();
    this.fetchWeather();
    this.fetchCameras();
    this.fetchYR();
    this.fetchTracks();
    this.fetchLifts();
    this.fetchZones();
    this.fetchAvalancheWarnings();
  },
  mounted() {
    /*
    const client = new WebSocket(`wss://${BASE_URL}`)
    client.onopen = () => {
      console.log('Connected to server')
    }
    client.onmessage = (event) => {
      console.log(data)
    }
    */
  },
  methods: {
    async fetchAlerts() {
      let res = await fetch(BASE_URL + "/alert")
      res = await res.json()
      this.alerts = res
      setTimeout(this.fetchAlerts, 300000)
    },
    async fetchWeather() {
      let res = await fetch(BASE_URL + "/weather-report")
      res = await res.json()
      this.weatherStations = res
      setTimeout(this.fetchWeather, 300000)
    },
    async fetchCameras() {
      let res = await fetch(BASE_URL + "/cameras")
      res = await res.json()
      this.cameras = res
      setTimeout(this.fetchCameras, 300000)
    },
    async fetchYR() {
      let res = await fetch(BASE_URL + "/rain-report")
      res = await res.json()
      this.weatherPredictions = res
      setTimeout(this.fetchYR, 300000)
    },
    async fetchTracks() {
      let res = await fetch(BASE_URL + "/tracks")
      res = await res.json()
      this.tracks = res.filter(item => item["hide_for_user"] !== 1);
      setTimeout(this.fetchTracks, 300000)
    },
    async fetchLifts() {
      let res = await fetch(BASE_URL + "/lifts")
      res = await res.json()
      this.lifts = res
      setTimeout(this.fetchLifts, 300000)
    },
    async fetchZones() {
      let res = await fetch(BASE_URL + "/zones")
      res = await res.json()
      this.zones = res
      setTimeout(this.fetchZones, 300000)
    },
    async fetchAvalancheWarnings() {
      let res = await fetch(BASE_URL + "/avalanche-warning")
      res = await res.json()
      this.avalancheWarnings = res
      setTimeout(this.fetchAvalancheWarnings, 300000)
    }
  },
};
</script>
