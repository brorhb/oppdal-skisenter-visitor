<template>
  <div>
    {{ windDirection }}
  </div>
</template>
<script>
export default {
  props: ["direction"],
  computed: {
    windDirection() {
      const val = parseFloat(this.direction);
      if (val >= 0 && val < 22) {
        return "Nord";
      } else if (val >= 22 && val < 67) {
        return "Nord-øst";
      } else if (val >= 67 && val < 112) {
        return "Øst";
      } else if (val >= 112 && val < 157) {
        return "Sør-øst";
      } else if (val >= 157 && val < 202) {
        return "Sør";
      } else if (val >= 202 && val < 247) {
        return "Sør-vest";
      } else if (val >= 247 && val < 292) {
        return "Vest";
      } else if (val >= 292 && val < 337) {
        return "Nord-vest";
      } else {
        return "Nord";
      }
    },
  },
};
</script>
