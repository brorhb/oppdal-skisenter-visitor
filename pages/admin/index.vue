<template>
  <div>
    <div class="dark:bg-gray-800 bg-white dart:text-white">
      <admin-navbar></admin-navbar>
    </div>
    <div 
      class="absolute flex flex-col items-center h-full w-full font-sans dark:bg-gray-700 bg-white dark:text-white"
    >
      <max-wrapper>
        <div class="flex flex-wrap">
          <admin-home-card name="⛷ Løyper" @click="() => $router.push('admin/tracks')"></admin-home-card>
          <admin-home-card name="🚡 Heiser" @click="() => $router.push('admin/lifts')"></admin-home-card>
          <admin-home-card name="👩‍🍳 Fasiliteter" @click="() => $router.push('admin/facilities')"></admin-home-card>
          <admin-home-card name="❄️ Snøforhold" @click="() => $router.push('admin/conditions')"></admin-home-card>
          <admin-home-card name="📨 Meldinger" @click="() => $router.push('admin/alerts')"></admin-home-card>
          <admin-home-card name="⚠️ Skredvarsel (Tavle)" @click="() => $router.push('admin/avalanche')"></admin-home-card>
          <admin-home-card name="⚠️ Skru av tavler"></admin-home-card>
        </div>
      </max-wrapper>
    </div>
  </div>
</template>
<script>
import MaxWrapper from '../../components/user/MaxWrapper.vue';
export default {
  components: { MaxWrapper },
  middleware({ redirect }) {
    if (!window.localStorage.getItem("token")) {
      redirect("/admin/login");
    }
  }
}
</script>