<script>
    import { toast } from '../../stores/Toast'
    import { onDestroy, onMount } from 'svelte'
    import OFetch from '../../helpers/fetch';
    import config from '../../helpers/config';
    import { makeZoneStore } from '../../stores/ZoneStore'
    import get_publish_date from '../../helpers/publishedDate';

    let zoneStore = makeZoneStore()
    let zones = []
    let snowConditions = [];
    let newCondition = {
        message: ''
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
    function get_char_left() {
        var textAreaLength = this.value.length;
        var charactersLeft = 150 - textAreaLength;
        var count = document.getElementById('remain-count');
        count.innerHTML = "Bokstaver igjen: " + charactersLeft;
    }
</script>


<div class="admin-add">
    <h1 class="sub-header">Oppdater snøforhold</h1>
    <p>Snøforhold publiseres på oppdalskisenter.no/loypestatus</p>
    <textarea class="oppdal-input" type="text" name="message" placeholder="Skriv litt om snøforhold her (max 150 tegn)" maxlength="150" on:keypress={get_char_left} bind:value={newCondition.message}></textarea>
    <p id="remain-count"></p>
    <button class="admin-button" on:click={createSnowCondition}>Oppdater</button>
</div>

{#if snowConditions}
<div class="admin-snowconditions">
    <h3>Meldinger</h3>
    <table class="admin-table">
        <thead class="admin-table-header">
            <tr class="admin-table-row">
                <th>Dato</th>
                <th style="width: 580px">Melding</th>
                <th>Live</th>
                <th>Endre</th>
                <th>Slett</th>
            </tr>
        </thead>
        <tbody>
        {#each snowConditions as condition}
            <tr class="admin-table-row">
            <th>{get_publish_date(condition.timestamp)}</th>
            <th>{condition.message}</th>
            <th><input on:change="{() => toggleIsLive(condition)}" bind:checked={condition.is_live} type="checkbox"/></th>
            <th on:click="{() => editItem = condition}"><i class="fas fa-edit"></i></th>
            <th on:click="{() => deleteSnowCondition(condition)}"><i class="fas fa-trash-alt"></i></th>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
{/if}

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


<style>
    .admin-snowconditions > table{
        margin-bottom: 5rem;
    }
</style>