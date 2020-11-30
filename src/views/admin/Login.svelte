<script>
  import { UserIcon, LockIcon } from 'svelte-feather-icons'
  import { navigateTo } from 'svelte-router-spa'
  import config from '../../helpers/config';
  import OFetch from '../../helpers/fetch'
  let showPassword = false
  let error
  let username = ""
  let password = ""

  function toggleShowPassword() {
    showPassword = !showPassword
  }

  async function login() {
    const body = {
      "username": username,
      "password": password
    }
    try {
      let response = await OFetch(
        `${config.BASE_URL}/admin/login`,
        "POST",
        body
      )
      const user = {
        username: response.user.username,
        token: response.token
      }
      localStorage.setItem("user", JSON.stringify(user))
      navigateTo("/admin")
    } catch (err) {
      console.log(err)
      error = "Wrong username or password"
    }
  }

</script>
<div class="mt5 tc">
  <div class="ma3" style="width: 300px">
    <h3 class="near-black">Login</h3>
    <div class="mt2 flex">
      <UserIcon size="28" />
      <input
        type="text"
        class="dib flex-auto"
        placeholder="Username"
        bind:value={username}
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      />
    </div>
    <div class="mt2 flex">
      <LockIcon size="28" />
      <div class="relative dib flex-auto">
        <input
          type="password"
          class="w-100"
          style="padding-right: 30px"
          placeholder="Password"
          bind:value={password}
        />
        <div
          on:click={toggleShowPassword}
          class="absolute pointer near-black"
          style="top: calc(50% - 9px); right: 6px"
        >
          <eco-icon
            type="feather"
            size="18"
            :name="showPassword ? 'eye-off' : 'eye'"
          ></eco-icon>
        </div>
      </div>
    </div>
    <div class="flex flex-column mt3">
      <button
        class="btn near-black bg-lightest-blue"
        on:click={login}
      >
        Login
      </button>
      {#if error}
      <div class="flex-auto">
        <div class="light-red">{ error }</div>
      </div>
      {/if}
    </div>
  </div>
</div>