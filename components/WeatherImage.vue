<template>
  <img :src="image" :alt="alt" />
</template>
<script>
export default {
  props: ['name'],
  computed: {
    image() {
      return "/assets/" + this.name + ".svg";
    }
  }
}
</script>