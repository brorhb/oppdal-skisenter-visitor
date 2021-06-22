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
        <div>
            Akkurat nå vises denne meldingen til brukerne: <br/>
            <div class="highlight">
                {importantMessage.message}
            </div>
        </div>
        <button class="oppdal-button" on:click={removeMessage}>Fjern melding</button>
    {:else}
        Det er ingen aktive meldinger.
    {/if}

    <label for="message">Opprett ny melding</label>
    <input class="oppdal-input" type="text" name="message" bind:value={newMessage} />
    <button class="oppdal-button" on:click={createMessage}>Legg ut ny melding</button>
</div>

<style>
    .admin-messages {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        margin: 20px;
    }
    .highlight {
        border: 1px solid black;
        padding: 10px;
        border-radius: 8px;
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>