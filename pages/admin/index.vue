<template>
  <div>
    hello admin
  </div>
</template>
<script>
export default {
  middleware({ redirect }) {
    if (!window.localStorage.getItem("token")) {
      redirect("/admin/login");
    }
  },
}
</script>