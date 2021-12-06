<script>
  import {
    makeFacilitiesStore,
    updateFacilities,
  } from '../../stores/FacilitiesStore';
  import { onDestroy, onMount } from 'svelte';
  import OFetch from '../../helpers/fetch';
  import config from '../../helpers/config';
  import { toast } from '../../stores/Toast';
  let unsubscribe;
  let facilitiesStore = makeFacilitiesStore();
  let facilities = [];
  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });

  onMount(async () => {
    facilitiesStore.subscribe((data) => {
      facilities = data;
    });
  });

  const updatePanoramaSign = async () => {
    try {
      const res = await OFetch(
        `${config.BASE_URL}/admin/panoramasign/relays`,
        'PATCH'
      );
      toast.setToast('Tavle oppdatert', 'success');
    } catch (err) {
      console.warn(err);
      toast.setToast('Noe gikk galt', 'error');
    }
  };

  const setStatus = async (item, status) => {
    await OFetch(
      `${config.BASE_URL}/admin/toggle-status/facilities/${item.id}/${status}`,
      'PATCH'
    );
    toast.setToast('Lagret', 'success');
    await updateFacilities();
  };
  const setStatusAll = async (type) => {
    try {
      const res = await OFetch(
        `${config.BASE_URL}/admin/facilities/status`,
        'PATCH',
        { type }
      );
      console.log(res);
      toast.setToast('Endring lagret', 'success');
      await updateFacilities();
    } catch (err) {
      console.warn(err);
      toast.setToast('Noe gikk galt', 'error');
    }
  };
</script>

<div>
  <h1 class="header">Fasiliteter</h1>
  <div class="header-wrapper">
    <button
      class="admin-text-button bg-white"
      on:click={() => setStatusAll(1)}>Åpne alle</button
    >
    <button
      class="admin-text-button bg-white"
      on:click={() => setStatusAll(3)}
      >Deaktiver alle</button
    >
    <button
      class="admin-text-button bg-white"
      on:click={() => updatePanoramaSign()}>Oppdater tavler</button
    >
  </div>
  <div class="tracks-options">
    <div>
      <button class="admin-button" on:click={() => setStatusAll('open')}
        >Åpne alle fasiliteter</button
      >
      <button class="admin-button" on:click={() => setStatusAll('closed')}
        >Steng alle fasiliteter</button
      >
    </div>
  </div>
  <table class="admin-table">
    <thead class="admin-table-header">
      <tr class="admin-table-row">
        <th>ID</th>
        <th>Navn</th>
        <th>Åpen</th>
        <th>Lukket</th>
      </tr>
    </thead>
    <tbody>
      {#each facilities as facility}
        <tr class="admin-table-row">
          <th>{facility.id}</th>
          <th>{facility.name}</th>
          <th
            ><input
              checked={facility.status.name === 'open'}
              type="radio"
              value="open"
              name={facility.id}
              on:click={() => setStatus(facility, 1)}
            /></th
          >
          <th
            ><input
              checked={facility.status.name === 'closed'}
              type="radio"
              value="open"
              name={facility.id}
              on:click={() => setStatus(facility, 2)}
            /></th
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .tracks-options {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .tracks-options:nth-child(n) {
    margin: 0 0 1rem 0;
  }
  .header-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 1rem;
  }
</style>
