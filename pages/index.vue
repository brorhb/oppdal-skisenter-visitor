<template>
  <div class="flex flex-col items-center h-full w-full font-sans">
    <Navbar></Navbar>
    <Banner></Banner>
    <Alerts :alerts="alerts"></Alerts>
    <WeatherAndCameras
      :cameras="cameras"
      :weatherStations="weatherStations"
      :weatherPredictions="weatherPredictions"
    ></WeatherAndCameras>
    <map-status :tracks="tracks" :lifts="lifts" :zones="zones"></map-status>
  </div>
</template>

<script>
export default {
  data: () => ({
    alerts: [],
    weatherStations: [],
    cameras: [],
    weatherPredictions: [],
    tracks: [],
    lifts: [],
    zones: [],
  }),
  async fetch() {
    this.fetchAlerts();
    this.fetchWeather();
    this.fetchCameras();
    this.fetchYR();
    this.fetchTracks();
    this.fetchLifts();
    this.fetchZones();
  },
  mounted() {
    /*
    const client = new WebSocket(`wss://${process.env.BASE_URL}`)
    client.onopen = () => {
      console.log('Connected to server')
    }
    client.onmessage = (event) => {
      console.log(data)
    }
    */
  },
  methods: {
    fetchAlerts() {
      fetch(process.env.BASE_URL + "/alert")
        .then((res) => res.json())
        .then((res) => {
          this.alerts = res;
        });
    },
    fetchWeather() {
      fetch(process.env.BASE_URL + "/weather-report")
        .then((res) => res.json())
        .then((res) => {
          this.weatherStations = res;
        });
    },
    fetchCameras() {
      fetch(process.env.BASE_URL + "/cameras")
        .then((res) => res.json())
        .then((res) => {
          this.cameras = res;
        });
    },
    fetchYR() {
      fetch(process.env.BASE_URL + "/rain-report")
        .then((res) => res.json())
        .then((res) => {
          this.weatherPredictions = res;
        });
    },
    fetchTracks() {
      fetch(process.env.BASE_URL + "/tracks")
        .then((res) => res.json())
        .then((res) => {
          this.tracks = res;
        });
    },
    fetchLifts() {
      fetch(process.env.BASE_URL + "/lifts")
        .then((res) => res.json())
        .then((res) => {
          this.lifts = res;
        });
    },
    fetchZones() {
      fetch(process.env.BASE_URL + "/zones")
        .then((res) => res.json())
        .then((res) => {
          this.zones = res;
        });
    },
  },
};
</script>