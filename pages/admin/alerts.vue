<template>
  <div>
    <div v-if="isLoading" class="absolute w-full h-full flex justify-center items-center">
      <div class="w-full h-full absolute bg-gray-800 z-10 opacity-70" />
      <loading class="z-20" :active="isLoading" is-full-page />
    </div>
    <div class="dark:bg-gray-800 bg-white dart:text-white">
      <admin-navbar>
        <span>Meldinger</span>
        <template v-slot:actions>
          <button :disabled="isLoading"
            :class="`py-2 px-4 mt-2 rounded-full text-white ${!isLoading ? 'bg-yellow-600 dark:bg-yellow-700' : 'bg-gray-400 dark:bg-gray-300'}`"
            @click="updateBillboard">Send til tavle</button>
        </template>
      </admin-navbar>
    </div>
    <div class="flex flex-col items-center font-sans dark:bg-gray-700 bg-white dark:text-white">
      <max-wrapper>
        <h1 class="text-xl font-bold">Oppdater meldinger</h1>
        <p class="pb-2">meldinger publiseres på <a class="underline"
            href="https://tavle.oppdalskisenter.no">tavle.oppdalskisenter.no</a></p>
        <textarea
          class="flex justify-between align-center px-4 w-full max-w-screen-xl dark:bg-gray-800 rounded-2xl bg-gray-200"
          v-model="input" placeholder="Skriv inn viktig melding for tavle og/eller web (max 150 tegn)" maxlength="150"></textarea>
        <button :disabled="!input"
          :class="`py-2 px-4 mt-2 rounded-full ${!!input ? 'bg-yellow-600 dark:bg-yellow-700' : 'bg-gray-400 dark:bg-gray-300'} text-white`"
          @click="() => addAlert(input)">Lagre</button>
        <p class="py-2">Huk av meldinger som skal være aktive</p>
        <div class="py-4 w-full max-w-screen-xl">
          <h1 class="text-l font-bold">Historikk</h1>
          <div class="w-full max-w-screen-xl text-left">
            <div>
              <div v-for="(item, index) in alerts" :key="item.id"
                :class="`flex w-full justify-between py-3 px-2 rounded-2xl ${index % 2 && 'dark:bg-gray-800 bg-gray-200'}`">
                <span class="w-48" v-if="item.timestamp">{{ item.timestamp && get_publish_date(item.timestamp)
                }}</span>
                <span class="flex-1 justify-start">{{ item.message }}</span>
                <select name="billboard" id="billboard" class="text-gray-800" :value="item.billboard"
                  @change="(e) => limitToBillboard(item, e)">
                  <optgroup>
                    <option :value="null">Alle tavler</option>
                    <option v-for="billboard in billboards" :value="billboard.id">{{ billboard.name }}</option>
                  </optgroup>
                </select>
                <div class="pl-2">
                  <input type="checkbox" :checked="!!item.is_live" @change="() => toggleAlert(item)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </max-wrapper>
    </div>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import BASE_URL from '../../helpers/baseurl'
import AuthFetch from '../../helpers/fetch'
import get_publish_date from '../../helpers/publishedDate.js'
export default {
  middleware({ redirect }) {
    if (!window.localStorage.getItem("token")) {
      redirect("/admin/login")
    }
  },
  components: {
    Loading
  },
  data: () => ({
    input: '',
    alerts: [],
    updatingBillboard: false,
    updating: false,
    billboards: []
  }),
  async fetch() {
    await this.fetchBillboards()
    await this.fetchAlerts()
  },
  computed: {
    isLoading() {
      if (this.updating === true) return true
      if (this.updatingBillboard === true) return true
      return false
    }
  },
  methods: {
    async addAlert(input) {
      if (!input) return
      this.updating = true
      await AuthFetch(
        `${BASE_URL}/admin/alert`,
        'POST',
        {
          message: input
        }
      )
      await this.fetchAlerts()
    },
    async fetchBillboards() {
      let res = await AuthFetch(
        BASE_URL + "/billboards",
        'GET'
      )
      this.billboards = res
    },
    async fetchAlerts() {
      let res = await AuthFetch(
        BASE_URL + "/admin/alert",
        'GET'
      )
      this.alerts = res
      this.updating = false
    },
    get_publish_date,
    async toggleAlert(item) {
      this.updating = true
      let newStatus = !!item.is_live
      const newStatusAsNumber = !newStatus ? 1 : 0
      await AuthFetch(
        `${BASE_URL}/admin/alert/${item.id}`,
        'PATCH',
        {
          ...item,
          ...{
            is_live: newStatusAsNumber
          }
        }
      )
      await this.fetchAlerts()
    },
    async limitToBillboard(item, e) {
      this.updating = true
      const billboard = parseInt(e.target.value)
      await AuthFetch(
        `${BASE_URL}/admin/alert/${item.id}`,
        'PATCH',
        {
          ...item,
          ...{
            billboard: billboard
          }
        }
      )
      await this.fetchAlerts()
    },
    async updateBillboard() {
      this.updatingBillboard = true
      const activeAlerts = this.alerts.filter(item => item.is_live)
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      const time = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds}`
      if (activeAlerts.some(item => item.billboard)) {
        for (var i = 0; i < this.billboards.length; i++) {
          const billboard = this.billboards[i]
          let messages = []
          for (var y = 0; y < activeAlerts.length; y++) {
            let activeAlert = activeAlerts[y]
            if (activeAlert.billboard == billboard.id) {
              messages.push(activeAlert.message)
            }
          }
          const message = messages.join('     ')
          const body = {
            message: message,
            time,
          }
          await AuthFetch(
            `${BASE_URL}/admin/panoramasign/message/${billboard.port}`,
            'PATCH',
            body
          )
        }
      } else {
        let message = activeAlerts.map((alert) => alert.message).join('     ')
        const body = {
          message: message,
          time,
        }
        try {
          await AuthFetch(
            `${BASE_URL}/admin/panoramasign/message`,
            'PATCH',
            body
          )
        } catch (error) {
          console.warn(error)
        }
      }
      this.updatingBillboard = false
    }
  }
}
</script>