<template>
  <MaxWrapper class="px-3 py-6" v-if="alerts.length">
    <div class="flex flex-col justify-center yellow p-4 w-full rounded-2xl">
      <h3 class="font-semibold text-2xl text-black-900">Oppdateringer fra oss</h3>
      <Alert v-for="(alert, index) in alerts" :key="index" :message="alert"></Alert>
    </div>
  </MaxWrapper>
</template>
<script>
export default {
  props: ['alerts'],
}
</script>
<style scoped>
.yellow {
  background-color: #FFF0E4;
}
</style>