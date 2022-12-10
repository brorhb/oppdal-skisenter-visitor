<template>
  <div>
    <div class="dark:bg-gray-800 bg-white dart:text-white">
      <admin-navbar>Snøforhold</admin-navbar>
    </div>
    <div class="flex flex-col items-center font-sans dark:bg-gray-700 bg-white dark:text-white">
      <max-wrapper>
        <h1 class="text-xl font-bold">Oppdater snøforhold</h1>
        <p class="pb-2">Snøforhold publiseres på <a class="underline" href="https://tavle.oppdalskisenter.no">tavle.oppdalskisenter.no</a></p>
        <textarea class="flex justify-between align-center px-4 w-full max-w-screen-xl dark:bg-gray-800 rounded-2xl bg-gray-200" v-model="input" placeholder="Skriv litt om snøforhold her (max 150 tegn)" maxlength="150"></textarea>
        <button :disabled="!input" :class="`py-2 px-4 mt-2 rounded-full ${!!input ? 'bg-yellow-600 dark:bg-yellow-700' : 'bg-gray-400 dark:bg-gray-300'} text-white`" @click="() => addCondition(input)">Oppdater</button>
        <div class="py-4 w-full max-w-screen-xl">
          <h1 class="text-l font-bold">Historikk</h1>
          <div class="w-full max-w-screen-xl text-left">
            <div>
              <div v-for="(item, index) in conditions"
                :key="item.id"
                :class="`flex w-full justify-between py-3 px-2 rounded-2xl ${index % 2 && 'dark:bg-gray-800 bg-gray-200' }`">
                <span class="w-48">{{get_publish_date(item.timestamp)}}</span>
                <span class="flex-1 justify-start">{{item.message}}</span>
                <div>
                  <input type="checkbox" :checked="!!item.is_live" @change="() => toggleCondition(item)" />
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
import BASE_URL from '../../helpers/baseurl';
import AuthFetch from '../../helpers/fetch';
import get_publish_date from '../../helpers/publishedDate.js'
export default {
  middleware({ redirect }) {
    if (!window.localStorage.getItem("token")) {
      redirect("/admin/login");
    }
  },
  data: () => ({
    input: '',
    conditions: []
  }),
  async fetch() {
    await this.fetchConditions()
  },
  methods: {
    async addCondition(input) {
      if (!input) return
      await AuthFetch(
        `${BASE_URL}/admin/snow-conditions`,
        'POST',
        {
          message: input
        }
      )
      this.fetchConditions()
    },
    fetchConditions() {
      fetch(BASE_URL + "/admin/snow-conditions", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
      })
        .then((res) => res.json())
        .then((res) => {
          this.conditions = res;
        });
    },
    get_publish_date,
    toggleCondition: async (item) => {
      let newStatus = !!item.is_live
      const newStatusAsNumber = !newStatus ? 1 : 0
      await AuthFetch(
        `${BASE_URL}/admin/snow-conditions/${item.id}`,
        'PATCH',
        {
          ...item,
          ...{
            is_live: newStatusAsNumber
          }
        }
      )
    }
  }
}
</script>