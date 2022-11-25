<template>
  <MaxWrapper>
    <nav class="flex justify-between align-center py-4 w-full max-w-screen-xl bg-gray-800">
      <nuxt-link to="/admin" class="p-2 rounded-xl dark:bg-gray-500">
        <img class="mr-4" src="/assets/logo.svg" alt="oppdalskisenter-logo"/>
      </nuxt-link>
      <div class="flex flex-col justify-center">
        <h1 class="text-xl font-bold text-white"><slot></slot></h1>
      </div>
      <div class="flex flex-row items-center">
        <slot name="actions"></slot>
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
