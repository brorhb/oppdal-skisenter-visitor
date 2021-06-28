<script>
  import { UserIcon, LockIcon } from 'svelte-feather-icons'
  import { navigateTo } from 'svelte-router-spa'
  import { toast } from '../../stores/Toast'
  import config from '../../helpers/config';
  import OFetch from '../../helpers/fetch'
  import Toast from '../../components/admin/Toast.svelte'
  let username = ""
  let password = ""

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
      toast.setToast('Feil brukernavn eller passord', 'error');
    }
  }

  const onKeyPress = e => {
    if (e.charCode === 13) login();
  }

</script>
<div class="login">
  <div>
    <h3 class="header">Logg inn</h3>
    <div class="input-wrapper">
      <UserIcon size="28" />
      <input
        type="text"
        class=""
        placeholder="Brukernavn"
        bind:value={username}
        on:keypress={onKeyPress}
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      />
    </div>
    <div class="input-wrapper">
      <LockIcon size="28" />
      <input
        type="password"
        placeholder="Passord"
        bind:value={password}
        on:keypress={onKeyPress}
      />
    </div>
    <div class="input-wrapper">
      <button class="button" on:click={login}>
        Login
      </button>
    </div>
  </div>
  <Toast/>
</div>

<style>
  .login {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    height: 50vh;
  }
  .header {
    font-size: 32px;
    color: #004A7C;
    text-align: center;
  }

  .input-wrapper {
    display: flex;
    margin-top: 10px;
  }
  .input-wrapper > input {
    min-height: 30px;
  }
  .button {
    width: 100%;
    cursor: pointer;
  }
</style>