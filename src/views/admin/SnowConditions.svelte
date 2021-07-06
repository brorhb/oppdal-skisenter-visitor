<script>
    import { toast } from '../../stores/Toast'
    import { onDestroy, onMount } from 'svelte'
    import OFetch from '../../helpers/fetch';
    import config from '../../helpers/config';
    import { formatTimestamp } from '../../helpers/formatTimestamp.js'
    import { makeZoneStore } from '../../stores/ZoneStore'
    let zoneStore = makeZoneStore()
    let zones = []
    let snowConditions = [];
    let newCondition = {
        message: '',
        zone_id: 1
    };
    let editItem;
    onMount(async () => {
        loadSnowConditions();
        zoneStore.subscribe((data) => {
            zones = data
        })
    });

    async function loadSnowConditions() {
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
    
    async function toggleIsLive(condition){
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
    async function createSnowCondition(){
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
    async function editSnowCondition() {
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
    async function deleteSnowCondition(condition) {
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
    <h1 class="oppdal-title">{zone.name}</h1>
    <table class="w-100">
        <thead>
            <tr class="stripe-dark">
                <th>ID</th>
                <th>Melding</th>
                <th>Dato</th>
                <th>Live</th>
                <th>Sone</th>
                <th>Endre</th>
                <th>Slett</th>
            </tr>
        </thead>
        <tbody class="lh-copy">
        {#each snowConditions as condition}
        {#if condition.zone_id == zone.id}
            <tr class="stripe-dark">
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

    <label for="message">Opprett ny melding om snøforhold</label>
    <input class="oppdal-input" type="text" name="message" bind:value={newCondition.message} />
    <select id="zone" class="oppdal-select" bind:value={newCondition.zone_id}>
        {#each zones as zone}
          <option value={zone.id}>{zone.name}</option>
        {/each}
      </select>
    <button class="oppdal-button" on:click={createSnowCondition}>Lagre ny melding</button>

    {#if editItem}
    <div class="edit-item" >
        <input class="oppdal-input" type="text" name="message" bind:value={editItem.message} />
        <select id="zone" class="oppdal-select" bind:value={editItem.zone_id}>
            {#each zones as zone}
            <option value={zone.id}>{zone.name}</option>
            {/each}
        </select>
        <button class="oppdal-button" on:click={editSnowCondition}>Lagre endringer</button>
        <button class="oppdal-button" on:click={() => editItem = undefined}>Angre</button>
    </div>
    {/if}
</div>

<style>
    .admin-snowconditions {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        margin: 20px;
    }
    .edit-item {
        position: absolute;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 100px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        background: #FAFAFA;

    }
</style>