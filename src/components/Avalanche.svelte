<script>
    import { makeAvalancheStore } from '../stores/AvalancheStore'
    import { onDestroy, onMount } from 'svelte'
    import { dangerLevelToText } from '../helpers/avalancheLevel'
    let unsubscribe
    let avalancheStore = makeAvalancheStore()
    let warnings = []

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe()
            unsubscribe = null
        }
    });
        
        onMount(async () => {
            avalancheStore.subscribe((data) => {
                warnings = data
            })
    })

    const color = (level) => {
        switch (level) {
        case "1":
            return "bg-green"
        case "2":
            return "bg-yellow"
        case "3":
            return "bg-orange"
        case "4":
            return "bg-red"
        case "5":
            return "bg-dark-red"
        default:
            return "bg-light-gray"
        }
    }

    const formatTimestamp = (timestamp) => {
        let date = new Date(timestamp);
        const d = date.getDate();
        let month = date.getMonth();
        month++;
        return d + '.' + month;     
    }
</script>

<div class="avalanche card card-hover">
    {#if warnings.length > 0}
    <div class="avalanche-info">
        <div class={`avalanche-icon ${color(warnings[0].DangerLevel)}`}>
            <div>{warnings[0].DangerLevel}</div>
            <div>{dangerLevelToText[warnings[0].DangerLevel]}</div>
        </div>
        <div class="avalanche-text">
            <div class="avalanche-header">
                Snøskredvarsel for Trollheimen, {formatTimestamp(warnings[0].PublishTime)}
            </div>
            <div class="avalanche-message">
                {warnings[0].MainText}
            </div>
        </div>

    </div>
    <div class="avalanche-dates">
        {#each warnings as warning}
        <div>
            <div class={`avalanche-dangerlevel ${color(warning.DangerLevel)}`}>{warning.DangerLevel}</div>
            <div>{formatTimestamp(warning.PublishTime)}</div>
        </div>
        {/each}
    </div>
    <div class="avalanche-footer">
        Varsler fra Snøskredvarslingen i Norge og <a href="https://varsom.no">www.varsom.no</a>
    </div>
    {/if}
</div>

<style>
    .avalanche {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #004A7C;
        padding: 1rem;
        max-width: 600px;
    }
    .avalanche-info {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        margin: 10px 0 10px 0;
    }
    .avalanche-icon {
        min-width: 80px;
        min-height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .avalanche-header {
        font-size: 26px;
        margin-bottom: 6px;
    }
    .avalanche-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
    }
    .avalanche-dangerlevel {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        min-width: 32px;
    }
    .avalanche-dates {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        text-align: center;
    }
    .avalanche-footer {
        display: flex;
        justify-content: flex-end;
        padding: 10px;
    }
    .avalanche-footer > a {
        padding-left: 5px;
    }

    .bg-green {
        color: #fff;
        background: #75b100;
    }
    .bg-yellow {
        color: black;
        background: #fc3;
    }
    .bg-orange {
        color: #fff;   
        background: #f36000; 
    }
    .bg-red {
        color: #fff;
        background: #e3000f;

    }
    .bg-dark-red {
        color: #fff;
        background: #000;
    }
    .bg-light-gray {
        color: #fff;
        background: #AAAAAA;
    }
</style>