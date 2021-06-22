<script>
    import { makeImportantMessageStore, updateMessage } from '../../stores/ImportantMessageStore'
    import { onDestroy, onMount } from 'svelte'
import OFetch from '../../helpers/fetch';
import config from '../../helpers/config';
import ImportantMessage from '../../components/ImportantMessage.svelte';

    let unsubscribe;
    let importantMessageStore = makeImportantMessageStore();
    let importantMessage = {};
    let newMessage = '';

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe()
            unsubscribe = null
        }
	});
    onMount(async () => {
        importantMessageStore.subscribe((data) => {
            importantMessage = data
        })
    })
    async function removeMessage(){
        importantMessage.is_live = false;
        try {
            const result = await OFetch(
                `${config.BASE_URL}/admin/important-message/${importantMessage.id}`,
                "PATCH", importantMessage
            );
            console.log(result);
            await updateMessage();
        } catch (error) {
            console.warn(error);
        }
    }
    async function createMessage(){
        if(newMessage === '') return;
        try {
            const result = await OFetch(
                `${config.BASE_URL}/admin/important-message/`,
                "POST", {newMessage}
            );
            await updateMessage();
        } catch (error) {
            console.warn(error);
        }
    }
</script>


<div class="admin-messages">
    {#if importantMessage.is_live}
        <div class="current-message">
            Akkurat nå vises denne meldingen til brukerne: <br/>
            <ImportantMessage importantMessage={importantMessage}/>
        </div>
        <button on:click={removeMessage}>Fjern melding</button>
    {:else}
        Det er ingen aktive meldinger.
    {/if}

    <div>
        <p>Opprett ny melding:</p>
        <input type="text" name="message" bind:value={newMessage} />
        <button on:click={createMessage}>Legg ut ny melding</button>
    </div>
</div>

<style>
    .admin-messages {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: flex-start;
        align-items: flex-start;
        margin: 20px;
    }
    .current-message {
        font-size: 24px;
        text-align: center;
    }
</style>