<script>
    import get_publish_date from '../helpers/publishedDate';
    import { makeAlertStore } from '../stores/AlertStore';
    import { onDestroy } from 'svelte';

    let alertStore = makeAlertStore();
    let alerts = []
    const unsubscribe = alertStore.subscribe(data => alerts = data);
    onDestroy(unsubscribe);
</script>

<div class="alerts max-width-wrapper">
    <div class="alerts-wrapper">
        <h3>Oppdateringer fra oss</h3>
        {#each alerts as alert}
        <div class="alert">
            <p class="smallinfo">{get_publish_date(alert.timestamp)}</p>
            <p>{alert.message}</p>
        </div>
        {/each}
    </div> 
</div>

<style>
    .alerts {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 9px;
        min-height: 67px;
        background-color: #FFF0E4;
        margin: 2rem auto 0 auto;
    }
    .alerts-wrapper {
        padding: 16px;
    }
    .alert {
        display: flex;
        align-items: flex-start;
        padding: 8px 0 8px 0;
    }
    .alert > .smallinfo {
        padding: 0 16px 0 0;
        color: #B7631A;
    }
    @media only screen and (max-width: 1000px) {
        .alerts {
            margin-right: 21rem;
        }
    }
</style>