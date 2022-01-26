<template>
  <div class="absolute flex flex-col items-center h-full w-full font-sans dark:bg-gray-700 bg-white dark:text-white">
    <admin-navbar></admin-navbar>
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