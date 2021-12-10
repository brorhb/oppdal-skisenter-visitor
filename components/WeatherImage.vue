<template>
  <img :src="image" alt="Vær illustrasjon" />
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