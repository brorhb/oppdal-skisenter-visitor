<template>
  <div>
    <div v-if="turningOff" class="absolute w-full h-full flex justify-center items-center">
      <div class="w-full h-full absolute bg-gray-800 z-10 opacity-70" />
      <loading class="z-20" :active="turningOff" is-full-page />
    </div>
    <div class="dark:bg-gray-800 bg-white dart:text-white">
      <admin-navbar></admin-navbar>
    </div>
    <div class="absolute flex flex-col items-center h-full w-full font-sans dark:bg-gray-700 bg-white dark:text-white">
      <max-wrapper>
        <div class="flex flex-wrap">
          <admin-home-card name="⛷ Løyper" @click="() => $router.push('/admin/tracks/')"></admin-home-card>
          <admin-home-card name="🚡 Heiser" @click="() => $router.push('/admin/lifts/')"></admin-home-card>
          <admin-home-card name="👩‍🍳 Fasiliteter" @click="() => $router.push('/admin/facilities/')"></admin-home-card>
          <admin-home-card name="❄️ Snøforhold" @click="() => $router.push('/admin/conditions/')"></admin-home-card>
          <admin-home-card name="📨 Meldinger" @click="() => $router.push('/admin/alerts/')"></admin-home-card>
          <admin-home-card name="⚠️ Skredvarsel (Tavle)" @click="() => $router.push('/admin/avalanche/')">
          </admin-home-card>
          <admin-home-card name="⚠️ Skru av tavler" @click="() => turningOff ? {} : turnOffBillboards()"></admin-home-card>
        </div>
      </max-wrapper>
    </div>
  </div>
</template>
<script>
import MaxWrapper from '../../components/user/MaxWrapper.vue'
import BASE_URL from '../../helpers/baseurl'
import AuthFetch from '../../helpers/fetch'
import Loading from 'vue-loading-overlay';
export default {
  components: { MaxWrapper },
  middleware({ redirect }) {
    if (!window.localStorage.getItem("token")) {
      redirect("/admin/login");
    }
  },
  components: {
    Loading
  },
  data: () => ({
    turningOff: false
  }),
  mounted() {
    document.body.className = "dark:bg-gray-800 bg-white"
  },
  methods: {
    async turnOffBillboards() {
      this.turningOff = true
      try {
        await AuthFetch(
          `${BASE_URL}/admin/panoramasign/clear-relays`,
          "PATCH"
        )
      } catch (err) {
        console.warn(err)
      }
      this.turningOff = false
    }
  }
}
</script>