<template>
  <div class="flex justify-start py-4 text-sm">
    <p class="text-yellow-600 dark:text-yellow-300 pr-3">{{get_publish_date(message.timestamp)}}</p>
    <span class="flex flex-row"><b v-if="message.billboard" class="pr-2">{{`${getBillboard(message.billboard)}:`}}</b><p>{{message.message}}</p></span>
  </div>
</template>
<script>
import get_publish_date from '../../helpers/publishedDate.js'
export default {
  props: ['message', 'billboards'],
  methods: {
    get_publish_date,
    getBillboard(id) {
      return this.billboards.find(item => item.id == id).name || ""
    }
  }
}
</script>