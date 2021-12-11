<template>
  <MaxWrapper>
    <nav class="flex justify-between align-center py-4 w-full max-w-screen-xl">
      <div v-if="comesFromMainSite">
        <a class="text-xl font-semibold hover:opacity-70 cursor-pointer" href="https://oppdalskisenter.no">Gå til oppdalskisenter.no</a>
      </div>
      <div class="p-2 rounded-xl dark:bg-gray-500">
        <img class="mr-4" src="/assets/logo.svg" alt="oppdalskisenter-logo"/>
      </div>
    </nav>
  </MaxWrapper>
</template>

<script>
export default {
  data() {
    return {
      comesFromMainSite: false
    }
  },
  mounted() {
    this.comesFromMainSite = document.referrer.includes('oppdalskisenter')
  }
}
</script>
