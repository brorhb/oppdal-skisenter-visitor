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
    let editItem = undefined;
    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe()
            unsubscribe = null
        }
	});
    onMount(async () => {
        unsubscribe = alertStore.subscribe((data) => {
            alerts = data
        })
    })
    const toggleIsLive = async (alert) => {
        alert.is_live = !alert.is_live;
        try {
            const result = await OFetch(
                `${config.BASE_URL}/admin/alert/${alert.id}`,
                "PATCH", alert
            );
            await updateAlert();
            toast.setToast('Ny endring lagret', 'success');
        } catch (error) {
            console.warn(error);
            toast.setToast('En feil har oppstått', 'error');
        }
    }
    const createAlert = async () => {
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
    const deleteAlert = async (alert) => {
        try {
            const result = await OFetch(
                `${config.BASE_URL}/admin/alert/${alert.id}`,
                "DELETE"
            )
            toast.setToast('Slettet melding', 'success');
            await updateAlert();
        } catch (error) {
            console.warn(error);
            toast.setToast('En feil har oppstått', 'error');
        }
    }
    const editAlert = async () => {
        try {
            const result = await OFetch(
                `${config.BASE_URL}/admin/alert/${editItem.id}`,
                "PATCH", editItem
            )
            toast.setToast('Endring lagret', 'success');
            await updateAlert();
        } catch (error) {
            console.warn(error);
            toast.setToast('En feil har oppstått', 'error');
        }

        editItem = undefined;
    }
</script>

<div class="admin-alerts">
    <h1 class="header">Viktige meldinger</h1>
    <table class="admin-table">
        <thead class="admin-table-header">
            <tr class="admin-table-row">
                <th>ID</th>
                <th>Melding</th>
                <th>Dato</th>
                <th>Live</th>
                <th>Endre</th>
                <th>Slett</th>
            </tr>
        </thead>
        <tbody>
        {#each alerts as alert}
            <tr class="admin-table-row">
            <th>{alert.id}</th>
            <th>{alert.message}</th>
            <th>{formatTimestamp(alert.timestamp)}</th>
            <th>
                <input on:change="{() => toggleIsLive(alert)}" bind:checked={alert.is_live} type="checkbox"/>
            </th>
            <th on:click="{() => editItem = alert}"><i class="fas fa-edit"></i></th>
            <th on:click="{() => deleteAlert(alert)}"><i class="fas fa-trash-alt"></i></th>
            </tr>
        {/each}
        </tbody>
    </table>
    <div class="admin-add">
        <h1 class="sub-header">Opprett ny melding</h1>
        <input class="oppdal-input" type="text" name="message" placeholder="Ny melding..." bind:value={newAlert} />
        <button class="admin-button" on:click={createAlert}>Legg ut ny melding</button>
    </div>

    {#if editItem}
    <div class="admin-blur" on:click="{() => editItem = undefined}"></div>
    <div class="admin-edit">
        <h1 class="sub-header">Endre melding</h1>
        <input class="oppdal-input" type="text" name="message" placeholder="Ny melding..." bind:value={editItem.message} />
        <div>
            <button class="admin-button" on:click={editAlert}>Lagre endring</button>
            <button class="admin-button" on:click={() => editItem = undefined}>Avbryt</button>
        </div>
    </div>
    {/if}
</div>