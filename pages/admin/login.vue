<template>
  <div
    class="absolute flex flex-col items-center h-full w-full font-sans dark:bg-gray-800 bg-white dark:text-white"
  >
    <max-wrapper>
      Hello
    </max-wrapper>
  </div>
</template>
<script>
import MaxWrapper from '../../components/user/MaxWrapper.vue';
export default {
  components: { MaxWrapper },
  data: () => ({
    username: "",
    password: "",
  }),
  methods: {
    login() {
      fetch(process.env.BASE_URL + "/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            window.localStorage.setItem("token", res.token);
            this.$router.push("/admin");
          } else {
            alert("Invalid username or password");
          }
        });
    },
  },
};
</script>
