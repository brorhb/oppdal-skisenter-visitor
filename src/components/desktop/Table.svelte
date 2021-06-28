<script>
    import { difficulty } from '../../helpers/difficulty'
    import Lifts from '../../helpers/lifts'
    import TrackItem from '../TrackItem.svelte'
    import LiftItem from '../LiftItem.svelte'
    export let name; 
    export let itemGroups = []
    export let itemArray = []
    let activeGroup;
</script>

<div class="table card">
    {#if itemArray.length}
        <div class="table-header">{name}</div>
        <div class="table-body">
            {#if itemArray.length <= 5}
                {#each itemArray as item}
                    {#if name === 'Heiser'}
                        <LiftItem lift={item} />
                    {:else} 
                        <TrackItem track={item} />
                    {/if}
                {/each}
            {:else}
                {#each Object.keys(itemGroups) as groupName}
                    <div class="table-column-border">
                        <div class="table-column" on:click={activeGroup === groupName ? () => activeGroup = undefined : () => activeGroup = groupName}>
                            {#if name === "Heiser"}
                                <div class="column-left">{Lifts[groupName]}</div>
                                <div class="column-right">
                                    <span>{itemArray.filter((lift) => lift.type === groupName && lift.status === "open").length}</span>
                                    <span>/</span>
                                    <span>{itemArray.filter((lift) => lift.type === groupName).length}</span>
                                    {#if activeGroup !== groupName}
                                        <i class="fas fa-chevron-down fa-lg list-icon"></i>
                                    {:else}
                                        <i class="fas fa-chevron-up fa-lg list-icon"></i>
                                    {/if}
                                </div>
    
                            {:else} 
                                <div class="column-left">{difficulty[groupName]}</div>
                                <div class="column-right">
                                    <span>{itemArray.filter((track) => track.difficulty === groupName && track.status === "open").length}</span>
                                    <span>/</span>
                                    <span>{itemArray.filter((track) => track.difficulty === groupName).length}</span>
                                    {#if activeGroup !== groupName}
                                        <i class="fas fa-chevron-down fa-lg list-icon"></i>
                                    {:else}
                                        <i class="fas fa-chevron-up fa-lg list-icon"></i>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                        {#if activeGroup === groupName}
                            <div>
                                {#each itemGroups[groupName] as item}
                                    {#if name === 'Heiser'}
                                        <LiftItem lift={item} />
                                    {:else}
                                        <TrackItem track={item} /> 
                                    {/if}
                                {/each}
                            </div>
                        {/if}
                    </div>
                {/each}
            {/if}
        </div>
    {/if}
</div> 

<style>
    .table{
        margin: 1.5rem 0 1.5rem 1.5rem;
    }
    
    .table-header{
        background-color: #004A7C;
        color: #FAFAFA;
        padding: 0.5rem;
        font-size: 22px;
        text-align: center;
    }

    .table-body {
        background-color: white;
        padding: 0rem 1rem;
    }

    .table-column {
        display: flex;
        padding: 0.8rem 0rem;
        justify-content: space-between;
    }

    .table-column:hover {
        cursor: pointer;
    }

    .table-column-border {
        border-bottom: 1px solid #BABABA;
    }

    .table-column-border:last-child {
        border: none;
    }

    .list-icon {
        margin-left: 0.8rem;
    }
</style>