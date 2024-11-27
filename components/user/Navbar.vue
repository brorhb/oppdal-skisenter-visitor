<template>
  <MaxWrapper>
    <nav class="flex justify-between align-center py-4 w-full max-w-screen-xl">
      <a href="https://oppdalskisenter.no" class="p-2 rounded-xl dark:bg-gray-500">
        <img
          class="mr-4 h-16"
          src="/assets/new-logo.png"
          alt="oppdalskisenter-logo"
        />
      </a>
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
