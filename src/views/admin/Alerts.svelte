<script>
    import { makeAlertStore, updateAlert } from '../../stores/AlertStore'
    import { toast } from '../../stores/Toast'
    import { onDestroy, onMount } from 'svelte'
    import OFetch from '../../helpers/fetch';
    import config from '../../helpers/config';
    import { formatTimestamp } from '../../helpers/formatTimestamp.js'
    let unsubscribe;
    let alertStore = makeAlertStore();
    let alerts = [];
    let newAlert = '';

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe()
            unsubscribe = null
        }
	});
    onMount(async () => {
        alertStore.subscribe((data) => {
            alerts = data
        })
    })
    async function toggleIsLive(alert){
        alert.is_live = !alert.is_live;
        try {
            const result = await OFetch(
                `${config.BASE_URL}/admin/alert/${alert.id}`,
                "PATCH", alert
            );
            await updateAlert();
        } catch (error) {
            console.warn(error);
        }
    }
    async function createAlert(){
        if(newAlert === '') {
            toast.setToast('Meldingen kan ikke være tom', 'error');
            return;
        }
        try {
            const result = await OFetch(
                `${config.BASE_URL}/admin/alert`,
                "POST", newAlert
            );
            toast.setToast('Ny melding lagret', 'success');
            await updateAlert();
        } catch (error) {
            console.warn(error);
            toast.setToast('En feil har oppstått', 'error');
        }
    }
</script>

<div class="admin-alerts">
    <table class="w-100">
        <thead>
            <tr class="stripe-dark">
                <th>ID</th>
                <th>Melding</th>
                <th>Dato</th>
                <th>Live</th>
            </tr>
        </thead>
        <tbody class="lh-copy">
        {#each alerts as alert}
            <tr class="stripe-dark">
            <th>{alert.id}</th>
            <th>{alert.message}</th>
            <th>{formatTimestamp(alert.timestamp)}</th>
            <th>
                <input on:change="{() => toggleIsLive(alert)}" bind:checked={alert.is_live} type="checkbox"/>
            </th>
            </tr>
        {/each}
        </tbody>
    </table>

    <label for="message">Opprett ny melding</label>
    <input class="oppdal-input" type="text" name="message" bind:value={newAlert} />
    <button class="oppdal-button" on:click={createAlert}>Legg ut ny melding</button>
</div>

<style>
    .admin-alerts {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        margin: 20px;
    }
</style>