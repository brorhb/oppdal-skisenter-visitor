<script>
    import { toast } from '../../stores/Toast'
    import { onMount } from 'svelte'
    import OFetch from '../../helpers/fetch';
    import config from '../../helpers/config';
    import { formatTimestamp } from '../../helpers/formatTimestamp.js'
    import get_publish_date from '../../helpers/publishedDate';

    let alerts = [];
    let newAlert = '';
    let editItem = undefined;
    let get_char_left = 500;

    onMount(async () => {
        fetchAllAlerts();
    })
    
    const fetchAllAlerts = async () => {
        try {
            alerts = await OFetch(
                `${config.BASE_URL}/admin/alert/`,
                "GET"
            )
            console.log(alerts);
        } catch (error) {
            console.warn(error);
            toast.setToast('En feil har oppstått', 'error');
        }
    }
    const toggleIsLive = async (alert) => {
        alert.is_live = !alert.is_live;
        try {
            const result = await OFetch(
                `${config.BASE_URL}/admin/alert/${alert.id}`,
                "PATCH", alert
            );
            await fetchAllAlerts();
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
            await fetchAllAlerts();
            newAlert = '';
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
            await fetchAllAlerts();
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
            await fetchAllAlerts();
        } catch (error) {
            console.warn(error);
            toast.setToast('En feil har oppstått', 'error');
        }

        editItem = undefined;
    }
    const deleteNonActiveAlerts = async () => {
        for(let i = 0; i < alerts.length; i++){
            if(!alerts[i].is_live) await deleteAlert(alerts[i]);
        }
    }
</script>
<div class="admin-alerts">
    <div class="admin-add">
        <h1 class="sub-header">Oppdater meldinger</h1>
        <p class="snow-subheader">Meldingene publiseres på <a href="https://beta.oppdalskisenter.no">oppdalskisenter.no/loypestatus</a></p>
        <textarea class="oppdal-input" type="text" name="message" placeholder="Skriv en oppdatering her (max 150 tegn)" maxlength="150" bind:value={newAlert}></textarea>
        <div class="button-wrapper"><button class="admin-button" on:click={createAlert}>Publiser</button></div>
    </div>

    <div class="history">
        <h3>Historikk</h3>
        <table class="admin-table">
            <tbody>
            {#each alerts as alert}
                <tr class="admin-table-row">
                <th><p class="table-timestamp">{get_publish_date(alert.timestamp)}</p></th>
                <th><p>{alert.message}</p></th>
                <th class="toggle-col">
                    <div class="toggle-text" style={alert.is_live ? 'color: #22A830' : 'color: #BABABA'}><p>{alert.is_live ? "Aktiv" : "Ikke aktiv"}</p></div>
                    <div><label class="toggle-switch"><input type="checkbox" on:change="{() => toggleIsLive(alert)}" bind:checked={alert.is_live}><span class="slider"></span></label></div>
                </th>
                <th on:click="{() => editItem = alert}"><i class="fas fa-edit"></i></th>
                <th on:click="{() => deleteAlert(alert)}"><i class="fas fa-trash-alt"></i></th>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
    <!--<button class="admin-text-button" on:click="{deleteNonActiveAlerts}">Slett alle meldinger som ikke er aktiv</button>-->
</div>


{#if editItem}
    <div class="admin-blur" on:click="{() => editItem = undefined}"></div>
    <div class="admin-edit">
        <h3 class="sub-header">Rediger melding</h3>
        <p class="small-info">max. 500 tegn</p>
        <textarea class="oppdal-input" type="text" name="message" bind:value={editItem.message} />
        <div>
            <button class="admin-button" on:click={() => editItem = undefined}>Avbryt</button>
            <button class="admin-button" on:click={editAlert}>Lagre endring</button>
        </div>
    </div>
{/if}

<style>
    .history {
        overflow: scroll;
    }
    .admin-alerts {
        margin: 1rem 0 0 0;
    }
    .admin-alerts > * {
        margin: 1rem 0 0 0;
    }
    .snow-subheader {
        margin: 0.5rem 0 3rem 0; 
    }
    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 30px;
    }

    .toggle-switch input { 
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: 4px;
        top: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: #2FC93E;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(30px);
        -ms-transform: translateX(30px);
        transform: translateX(30px);
    }
    .toggle-col {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding-right: 4rem;
    }
    .toggle-text {
        padding-right: 1rem;
    }
    @media only screen and (max-width: 1000px) {
        .admin-alerts {
            padding: 1rem;
        }
    }
</style>