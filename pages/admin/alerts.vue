<template>
  <div>
    <div class="dark:bg-gray-800 bg-white dart:text-white">
      <admin-navbar>
        <span>Meldinger</span>
        <template v-slot:actions>
          <button :disabled="updatingBillboard || updating"
            :class="`py-2 px-4 mt-2 rounded-full text-white ${!updatingBillboard || updating ? 'bg-yellow-600 dark:bg-yellow-700' : 'bg-gray-400 dark:bg-gray-300'}`"
            @click="updateBillboard">Oppdater tavle</button>
        </template>
      </admin-navbar>
    </div>
    <div class="flex flex-col items-center font-sans dark:bg-gray-700 bg-white dark:text-white">
      <max-wrapper>
        <h1 class="text-xl font-bold">Oppdater snøforhold</h1>
        <p class="pb-2">Snøforhold publiseres på <a class="underline"
            href="https://tavle.oppdalskisenter.no">tavle.oppdalskisenter.no</a></p>
        <textarea
          class="flex justify-between align-center px-4 w-full max-w-screen-xl dark:bg-gray-800 rounded-2xl bg-gray-200"
          v-model="input" placeholder="Skriv litt om snøforhold her (max 150 tegn)" maxlength="150"></textarea>
        <button :disabled="!input"
          :class="`py-2 px-4 mt-2 rounded-full ${!!input ? 'bg-yellow-600 dark:bg-yellow-700' : 'bg-gray-400 dark:bg-gray-300'} text-white`"
          @click="() => addAlert(input)">Oppdater</button>
        <div class="py-4 w-full max-w-screen-xl">
          <h1 class="text-l font-bold">Historikk</h1>
          <div class="w-full max-w-screen-xl text-left">
            <div>
              <div v-for="(item, index) in alerts"
                :class="`flex w-full justify-between py-3 px-2 rounded-2xl ${index % 2 && 'dark:bg-gray-800 bg-gray-200'}`">
                <span class="w-48" v-if="item.timestamp">{{ item.timestamp && get_publish_date(item.timestamp) }}</span>
                <span class="flex-1 justify-start">{{ item.message }}</span>
                <select name="billboard" id="billboard" class="text-gray-800" :value="item.billboard" @change="(e) => limitToBillboard(item, e)">
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
import BASE_URL from '../../helpers/baseurl'
import AuthFetch from '../../helpers/fetch'
import get_publish_date from '../../helpers/publishedDate.js'
export default {
  middleware({ redirect }) {
    if (!window.localStorage.getItem("token")) {
      redirect("/admin/login")
    }
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
      this.fetchAlerts()
    },
    async fetchBillboards() {
      let res = await AuthFetch(
        BASE_URL + "/admin/billboards",
        'GET'
      )
      this.billboards = res
    },
    fetchAlerts() {
      fetch(BASE_URL + "/admin/alert", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      })
        .then((res) => res.json())
        .then((res) => {
          this.alerts = res
          this.updating = false
        })
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
      this.updating = false
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
      this.updating = false
    },
    async updateBillboard() {
      this.updateBillboard = true
      const activeAlerts = this.alerts.filter(item => item.is_live)
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      const time = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds}`
      if (activeAlerts.some(item => item.billboard)) {
        for (var i = 0; i < this.billboards.length; i++) {
          const billboard = this.billboards[i]
          let message = ''
          for (let activeAlert in activeAlerts) {
            if (!activeAlert.billboard || activeAlert.billboard == billboard.id) {
              message += `${activeAlert.message} `
            }
          }
          const body = {
            message: message,
            time,
          }
          await AuthFetch(
            `${BASE_URL}/admin/panoramasign/message/${billboard.id}`,
            'PATCH',
            body
          )
        }
      } else {
        let message = ''
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
      this.updateBillboard = false
    }
  }
}
</script>