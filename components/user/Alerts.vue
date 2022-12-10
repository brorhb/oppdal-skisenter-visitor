<template>
  <MaxWrapper class="px-3 py-6" v-if="alerts.length">
    <div class="flex flex-col justify-center bg-alert dark:bg-yellow-900 p-4 w-full rounded-2xl">
      <h3 class="font-semibold text-2xl text-black-900">Oppdateringer fra oss</h3>
      <Alert v-for="(alert, index) in alerts" :billboards="billboards" :key="index" :message="alert"></Alert>
    </div>
  </MaxWrapper>
</template>
<script>
export default {
  props: ['alerts', 'billboards'],
}
</script>