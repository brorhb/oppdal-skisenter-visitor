<template>
  <div class="flex justify-start py-4 text-sm">
    <p class="text-yellow-600 dark:text-yellow-300 pr-3">{{get_publish_date(message.timestamp)}}</p>
    <p>{{message.message}}</p>
  </div>
</template>
<script>
import get_publish_date from '../../helpers/publishedDate.js'
export default {
  props: ['message'],
  methods: {
    get_publish_date
  }
}
</script>