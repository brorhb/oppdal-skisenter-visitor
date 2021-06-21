<script>
    export let importantMessage = {};
</script>

{#if importantMessage.is_live}
    <div class="important-message">
      <p>{importantMessage.message}</p>
    </div>
{/if}

<style>
    .important-message {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        text-align: center;
        background-color: #F5E8E8;
        color: #004A7C;
        height: 112px;
        font-size: 32px;
    }
</style>