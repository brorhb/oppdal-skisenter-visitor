<template>
  <div>
    <div class="dark:bg-gray-800 bg-white dart:text-white">
      <admin-navbar>Snøforhold</admin-navbar>
    </div>
    <div class="flex flex-col items-center font-sans dark:bg-gray-700 bg-white dark:text-white">
      <max-wrapper>
        <h1 class="text-xl font-bold">Sett skredfare på tavle</h1>
        <div class="py-4 w-full max-w-screen-xl">
          <div v-for="_, index in new Array(4)" class="w-full py-2 flex">
            <div class="dark:bg-gray-800 bg-gray-200 w-full rounded-2xl py-2 px-4 flex items-center">
              <div :class="`w-16 h-16 ${getColor(index)} rounded-full`"></div>
              <h1 class="px-2">{{ getText(index) }}</h1>
              <div class="flex-1"></div>
              <button class="py-2 px-4 mt-2 rounded-full bg-yellow-600 dark:bg-yellow-700 text-white" @click="() => sendAvalanche(index)">
                Send
              </button>
            </div>
          </div>
        </div>
      </max-wrapper>
    </div>
  </div>
</template>
<script>
import BASE_URL from '../../helpers/baseurl';
import AuthFetch from '../../helpers/fetch';
export default {
  middleware({ redirect }) {
    if (!window.localStorage.getItem("token")) {
      redirect("/admin/login");
    }
  },
  methods: {
    getColor(num) {
      switch (num) {
        case 0:
          return 'bg-green-700'
        case 1:
          return 'bg-yellow-500'
        case 2:
          return 'bg-red-700'
        case 3:
          return 'bg-gray-500'
      }
    },
    getText(num) {
      switch (num) {
        case 0:
          return 'Grønn (trygt)'
        case 1:
          return 'Gult (vær forsiktig)'
        case 2:
          return 'Rødt (farlig)'
        case 3:
          return 'Slå av'
      }
    },
    async addAlert(input) {
      if (!input) return
      await AuthFetch(
        `${BASE_URL}/admin/alert`,
        'POST',
        {
          message: input
        }
      )
      this.fetchAlerts()
    },
    async sendAvalanche(byte) {
      const res = await AuthFetch(
          `${BASE_URL}/admin/panoramasign/avalanche`,
          "PATCH",
          { color: byte }
      )
    }
  }
}
</script>