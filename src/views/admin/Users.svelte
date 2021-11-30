<script>
  import Navbar from '../../components/admin/Navbar.svelte';
  import { Route } from 'svelte-router-spa'
  import OFetch from '../../helpers/fetch';

  let username = ""
  let password = ""
  let saving = false

  function save() {
    saving = true
    OFetch.post("/api/admin/create", {
      username,
      password
    }).then(res => {
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
</div>