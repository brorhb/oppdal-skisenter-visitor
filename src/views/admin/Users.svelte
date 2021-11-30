<script>
  import Navbar from '../../components/admin/Navbar.svelte';
  import { Route } from 'svelte-router-spa'
  import OFetch from '../../helpers/fetch';
  import config from '../../helpers/config';

  let username = ""
  let password = ""
  let saving = false

  function save() {
    saving = true
    OFetch(
      `${config.BASE_URL}/admin/create`,
      "POST",
      {
        username: username,
        password: password,
        role: 1
      }
    ).then(res => {
      saving = false
      if (res.status !== 200) {
        alert(res.data.message)
      }
    })
  }
</script>

<div class="">
  <input type="text" value={username} placeholder="Brukernavn">
  <input type="text" value={password} placeholder="Passord">
  <button on:click={save} disabled={saving}>Lagre</button>
  {#if saving}
    <div>Lagrer...</div>
  {/if}
</div>