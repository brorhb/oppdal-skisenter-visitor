<template>
  <div
    @click="() => $emit('click')"
    class="flex w-1/2 p-2 cursor-pointer"
  >
    <div class="dark:bg-gray-800 py-4 px-4 w-full h-full bg-white rounded-xl">
      <h1 class="text-xl font-bold">{{ name }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  props: ['name']
}
</script>