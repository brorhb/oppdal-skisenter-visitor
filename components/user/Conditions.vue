<template>
  <MaxWrapper class="px-3 py-6" v-if="conditions.conditions.length">
    <div class="flex flex-col justify-center bg-blue-400 dark:bg-blue-700 p-4 w-full rounded-2xl">
      <h3 class="font-semibold text-2xl text-black-900">Snøforhold</h3>
      <div v-for="(condition, index) in conditions.conditions" :key="index" class="flex justify-start py-4 text-sm">
        <p class="text-blue-700 dark:text-blue-300 pr-3">{{get_publish_date(condition.timestamp)}}</p>
        <p>{{condition.message}}</p>
      </div>
    </div>
  </MaxWrapper>
</template>
<script>
  import get_publish_date from '../../helpers/publishedDate.js'
  export default {
    props: ['conditions'],
    methods: {
      get_publish_date,
    }
  }

</script>