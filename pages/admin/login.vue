<template>
  <div
    class="absolute flex flex-col items-center h-full w-full font-sans dark:bg-gray-800 bg-white dark:text-white"
  >
    <max-wrapper class="w-full h-full">
      <div class="flex flex-col justify-center w-full h-full">
        <div class="flex flex-row justify-center items-center w-full h-full">
          <div class="w-full p-4 md:w-1/3 bg-gray-700 rounded-xl">
            <div class="p-2 flex flex-row w-full justify-center font-bold text-2xl">Logg inn</div>
            <div class="font-bold">Brukernavn</div>
            <input
              class="w-full p-2 rounded-lg text-gray-100 bg-gray-500"
              placeholder="Brukernavn"
              type="text"
              v-model="username"
            />
            <div class="py-1"></div>
            <div class="font-bold">Passord</div>
            <input
              class="w-full p-2 rounded-lg text-gray-100 bg-gray-500"
              placeholder="Passord"
              type="password"
              v-model="password"
            />
            <div class="py-1"></div>
            <div class="flex flex-row justify-end">
              <button class="p-2 bg-blue-400 rounded-xl" @click="login">Logg inn</button>
            </div>
          </div>
        </div>
      </div>
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
          if (res.token) {
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
