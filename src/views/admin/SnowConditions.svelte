<script>
    import { toast } from '../../stores/Toast'
    import { onDestroy, onMount } from 'svelte'
    import OFetch from '../../helpers/fetch';
    import config from '../../helpers/config';
    import { formatTimestamp } from '../../helpers/formatTimestamp.js'
    import { makeZoneStore } from '../../stores/ZoneStore'
import AdminLayout from '../../components/admin/AdminLayout.svelte';
import Alerts from './Alerts.svelte';
    let zoneStore = makeZoneStore()
    let zones = []
    let snowConditions = [];
    let newCondition = {
        message: '',
        zone_id: 1
    };
    let editItem = undefined;
    onMount(async () => {
        loadSnowConditions();
        zoneStore.subscribe((data) => {
            zones = data
        })
    });

    const loadSnowConditions = async () => {
        try {
            const result = await OFetch(
                `${config.BASE_URL}/admin/snow-conditions`,
                "GET"
            );
            snowConditions = result;
        } catch (error) {
            console.warn(error);
            toast.setToast('En feil har oppstått ved lasting av snøforhold', 'error');
        }
    }
    
    const toggleIsLive = async (condition) => {
        let conditionsToUpdate = [];
        condition.is_live = !condition.is_live;
        conditionsToUpdate.push(condition);
        if(condition.is_live){
            snowConditions.forEach(snowCondition => {
                if (snowCondition.is_live && snowCondition.zone_id == condition.zone_id && snowCondition.id !== condition.id) {
                    snowCondition.is_live = false;
                    conditionsToUpdate.push(snowCondition);
                }
            })
        }

        for(const snowCondition of conditionsToUpdate) {
            try {
                const result = await OFetch(
                    `${config.BASE_URL}/admin/snow-conditions/${snowCondition.id}`,
                    "PATCH", snowCondition
                );
            } catch (error) {
                console.warn(error);
                toast.setToast('En feil har oppstått', 'error');
            }
        }
        loadSnowConditions();
        toast.setToast('Endring lagret', 'success');
        
    }
    const createSnowCondition = async () => {
        if(newCondition.message === '') {
            toast.setToast('Meldingen kan ikke være tom', 'error');
            return;
        }
        try {
            const result = await OFetch(
                `${config.BASE_URL}/admin/snow-conditions`,
                "POST", newCondition
            );
            toast.setToast('Ny melding lagret', 'success');
            loadSnowConditions();
        } catch (error) {
            console.warn(error);
            toast.setToast('En feil har oppstått', 'error');
        }
    }
    const editSnowCondition = async () => {
        try {
            const result = await OFetch(
                `${config.BASE_URL}/admin/snow-conditions/${editItem.id}`,
                "PATCH", editItem
            );
            loadSnowConditions();
            editItem = undefined;
            toast.setToast('Endring lagret', 'success');
        } catch (error) {
            console.warn(error);
            toast.setToast('En feil har oppstått', 'error');
        }
    }
    const deleteSnowCondition = async (condition) => {
        try {
            const result = await OFetch(
                `${config.BASE_URL}/admin/snow-conditions/${condition.id}`, "DELETE"
            );
            loadSnowConditions();
            toast.setToast('Slettet', 'success');
        } catch (error) {
            console.warn(error);
            toast.setToast('En feil har oppstått', 'error');
        }
    }
</script>

<div class="admin-snowconditions">
    {#each zones as zone}
    {#if zone.name !== "Transport"}
    <h1 class="header">Snøforhold i {zone.name}</h1>
    <table class="admin-table">
        <thead class="admin-table-header">
            <tr class="admin-table-row">
                <th>ID</th>
                <th style="width: 580px">Melding</th>
                <th>Dato</th>
                <th>Live</th>
                <th>Sone</th>
                <th>Endre</th>
                <th>Slett</th>
            </tr>
        </thead>
        <tbody>
        {#each snowConditions as condition}
        {#if condition.zone_id == zone.id}
            <tr class="admin-table-row">
            <th>{condition.id}</th>
            <th>{condition.message}</th>
            <th>{formatTimestamp(condition.timestamp)}</th>
            <th>
                <input on:change="{() => toggleIsLive(condition)}" bind:checked={condition.is_live} type="checkbox"/>
            </th>
            <th>{zones[condition.zone_id-1] ? zones[condition.zone_id-1].name : condition.zone_id}</th>
            <th on:click="{() => editItem = condition}"><i class="fas fa-edit"></i></th>
            <th on:click="{() => deleteSnowCondition(condition)}"><i class="fas fa-trash-alt"></i></th>
            </tr>
        {/if}
        {/each}
        </tbody>
    </table>
    {/if}   
    {/each}
    <div class="admin-add">
        <h1 class="sub-header">Opprett ny melding om snøforhold</h1>
        <input class="oppdal-input" type="text" name="message" placeholder="Melding om snøforhold..." bind:value={newCondition.message} />
        <select id="zone" class="oppdal-select" bind:value={newCondition.zone_id}>
            {#each zones as zone}
            <option value={zone.id}>{zone.name}</option>
            {/each}
        </select>
        <button class="admin-button" on:click={createSnowCondition}>Lagre ny melding</button>
    </div>

    {#if editItem}
    <div class="admin-blur" on:click="{() => editItem = undefined}"></div>
    <div class="admin-edit">
        <h1 class="sub-header">Endre melding om snøforhold</h1>
        <input class="oppdal-input" type="text" name="message" bind:value={editItem.message} />
        <select id="zone" class="oppdal-select" bind:value={editItem.zone}>
            {#each zones as zone}
            <option value={zone.id}>{zone.name}</option>
            {/each}
        </select>
        <div>
            <button class="admin-button" on:click={editSnowCondition}>Lagre endring</button>
            <button class="admin-button" on:click={() => editItem = undefined}>Avbryt</button>
        </div>
    </div>
    {/if}
</div>

<style>
    .admin-snowconditions > table{
        margin-bottom: 5rem;
    }
</style>