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
            await loadSnowConditions();            
            newCondition = {
                message: ''
            };
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

    async function handleClick(message) {
        await createSnowCondition();
    }
</script>
<div class="admin-snowconditions">
<div class="admin-add snow-top-section">
    <h2>Oppdater snøforhold</h2>
    <p>Snøforhold publiseres på <a href="https://beta.oppdalskisenter.no">oppdalskisenter.no/loypestatus</a></p>
    <textarea class="oppdal-input" type="text" name="message" placeholder="Skriv litt om snøforhold her (max 150 tegn)" maxlength="150" on:keypress={get_char_left} bind:value={newCondition.message}></textarea>
    <!--<p id="remain-count"></p>-->
    <div class="button-wrapper"><button class="admin-button" on:click={() => handleClick(newCondition.message)}>Oppdater</button></div>
</div>

{#if snowConditions}
<div class="history">
    <h3>Historikk</h3>
    <table class="admin-table">
        <tbody>
        {#each snowConditions as condition}
            <tr class="admin-table-row">
            <th><p class="table-timestamp">{get_publish_date(condition.timestamp)}</p></th>
            <th class="snow-message"><p>{condition.message}</p></th>
            <th class="toggle-col">
                <div class="toggle-text" style={condition.is_live ? 'color: #22A830' : 'color: #BABABA'}><p>{condition.is_live ? "Aktiv" : "Ikke aktiv"}</p></div>
                <div><label class="toggle-switch"><input type="checkbox" on:change="{() => toggleIsLive(condition)}" bind:checked={condition.is_live}><span class="slider"></span></label></div>
            </th>
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
        <h3>Endre melding om snøforhold</h3>
        <input class="oppdal-input" type="text" name="message" bind:value={editItem.message} />
        <div>
            <button class="admin-button" on:click={() => editItem = undefined}>Avbryt</button>
            <button class="admin-button" on:click={editSnowCondition}>Lagre endring</button>
        </div>
    </div>
{/if}
</div>

<style>
    .admin-snowconditions {
        margin: 1rem 0 0 0;
    }
    .history {
        overflow: scroll;
    }
    table {
        border-collapse: collapse;
    }
    .snow-message{
        text-align: left;
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
    @media only screen and (max-width: 600px) {
        .admin-snowconditions {
            padding: 1rem;
        }
    }
</style>