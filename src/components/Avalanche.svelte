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
        unsubscribe = avalancheStore.subscribe((data) => {
            warnings = data
        })
    });

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
    const isToday = (timestamp) => {
        let date = new Date(timestamp)
        let today = new Date();
        return date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear();
    }
</script>

<div class="avalanche card">
    {#if warnings.length > 0} <!-- If statement added because accessing warnings[4] (today) might happen before warnings are loaded -->
    <div class="avalanche-header smallbold">Skredvarsel</div>
    <div class="avalanche-today">
        <div class={`avalanche-big-circle ${color(warnings[4].DangerLevel)}`}>
            <h3>{warnings[4].DangerLevel}</h3>
            <p>{dangerLevelToText[warnings[4].DangerLevel]}</p>
        </div>
        <div>
            <h3>Snøskredvarsel for Trollheimen {formatTimestamp(warnings[4].PublishTime)}</h3>
            <p>{warnings[0].MainText}</p>
        </div>
    </div>
    <div class="avalanche-border"></div>
    <div class="avalanche-week">
        <h3>Varsel til uka</h3>
        <p>Varsler fra Snøskredvarslingen i Norge og www.varsom.no</p>
        <div class="avalanche-circle-container">
            {#each warnings as warning}
            <div class={isToday(warning.PublishTime) ? `active`:null}>
                <div class={`avalanche-small-circle ${color(warning.DangerLevel)}`}>
                    <h3>{warning.DangerLevel}</h3>
                </div>
                <p>{formatTimestamp(warning.PublishTime)}</p>
            </div>
            {/each}
        </div>
    </div>
    {/if}
</div>

<style>
    .avalanche {
        display: grid;
        grid-template-rows: 20px auto;
        grid-template-areas: 
        "header header header"
        "today border week";
        height: 100%;
    }
    .avalanche-header {
        grid-area: header;
    }
    .avalanche-today {
        grid-area: today;
        display: flex;
        align-items: center;
        
    }
    .avalanche-week {
        grid-area: week;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .avalanche-big-circle {
        min-width: 98px;
        min-height: 98px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        margin-right: 1rem;
    }
    .avalanche-small-circle {
        min-width: 36px;
        min-height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .avalanche-circle-container {
        display: flex;
        justify-content: space-evenly;
        text-align: center;
        margin-top: 1rem;
    }
    .active {
        background: #EAEEF9;
        border-radius: 9px;
    }
    .avalanche-border {
        grid-area: border;
        height: 100%;
        border: 0.840336px solid #A0B2DC;
        margin: 0 1rem 0 0.3rem; 
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
    @media only screen and (max-width: 1000px) {
        .avalanche {
            grid-template-areas: 
            "header"
            "today"
            "border"
            "week";
        }
        .avalanche-border {
            height: 0;
            width: 100%;
            margin: 1rem 0 1rem 0;
        }
        .avalanche-circle-container {
            max-width: 400px;
            justify-content: space-between;
        }
    }
</style>