<script>
    import { onMount, onDestroy } from 'svelte';
    import { makeZoneStore } from '../../stores/ZoneStore';
    import { makeLiftsStore, updateLifts } from '../../stores/LiftsStore'
    import { makeTracksStore, updateTracks } from '../../stores/TrackStore';
    import { toast } from '../../stores/Toast'
    import OFetch from '../../helpers/fetch'
    import config from '../../helpers/config'

    let unsubscribe_zone;
    let unsubscribe_lift;
    let unsubscribe_track;
    let root;
    let zoneStore = makeZoneStore();
    let zones = [];
    let liftStore = makeLiftsStore();
    let lifts = [];
    let trackStore = makeTracksStore();
    let tracks = [];

    $: console.log(lifts.map(lift => lift.zone))

    onMount(() => {
        unsubscribe_zone = zoneStore.subscribe(data => {zones = data;});
        unsubscribe_lift = liftStore.subscribe(data => {lifts = data;});
        unsubscribe_track = trackStore.subscribe(data => {tracks = data;});
    });

    onDestroy(() => {
        unsubscribe_zone();
        unsubscribe_lift();
        unsubscribe_track();
    });

    function handleClick(zone) {
        if (zone) {
            let selected_zone = root.querySelector(`.${zone.name}`)
            if (selected_zone) {
                console.log(selected_zone.classList)
                selected_zone.classList.toggle('open-container');
            };
        };
    };

    const setStatusByZone = async (type, zone) => {
        try {
            await OFetch(
                `${config.BASE_URL}/admin/track/status-zone`,
                "PATCH", {type, zone}
            );
            await updateTracks();
            await OFetch(
                `${config.BASE_URL}/admin/lift/status-zone`,
                "PATCH", {type, zone}
            )
            await updateLifts()
            toast.setToast('Endring lagret', 'success');
        } catch(err) {
            console.warn(err);
            toast.setToast('Noe gikk galt', 'error');
        };
    };

    const setTrackStatus = async (track, status) => {
        try {
            await OFetch(
            `${config.BASE_URL}/admin/toggle-status/tracks/${track.id}/${status}`,
            "PATCH"
        )
        toast.setToast('Lagret', 'success');
        await updateTracks();
        } catch(err) {
            console.warn(err);
            toast.setToast('Noe gikk galt', 'error');
        }
    };
    const setLiftStatus = async (lift, status) => {
        try {
            await OFetch(
            `${config.BASE_URL}/admin/toggle-status/lifts/${lift.id}/${status}`,
            "PATCH"
        )
        toast.setToast('Lagret', 'success');
        await updateLifts();
        } catch(err) {
            console.warn(err);
            toast.setToast('Noe gikk galt', 'error');
        }
    };
</script>

<div bind:this={root}>
    {#each zones as zone}
    <div class="custom-select-wrapper">
        <div class={`${zone.name} custom-select`}>
            <div class="custom-select__trigger" on:click={() => handleClick(zone)}>
                <h3>{zone.name}</h3>
                {#if lifts.length > 0}
                    <p>{`${(lifts.filter((lift) => lift.zone == zone.id && lift.status == "open")).length}/${(lifts.filter((lift) => lift.zone == zone.id)).length} heiser`}</p>
                    <p>{`${(tracks.filter((track) => track.zone == zone.id && track.status == "open")).length}/${(tracks.filter((track) => track.zone == zone.id)).length} løyper`}</p>
                {/if}
                <div><i class="fas fa-angle-down"></i></div>    
            </div>
            <div  class="custom-options">
                <div class="table-container">
                    <div>
                        {#if zone.name != "Transport"}
                        <div class="header-wrapper">
                            <h3>Heiser i {zone.name}</h3>
                            <button class="admin-text-button" on:click="{() => setStatusByZone("open", zone.id)}">Åpne alle</button>
                            <button class="admin-text-button" on:click="{() => setStatusByZone("maintanence", zone.id)}">Deaktiver alle</button>
                        </div>
                        
                        <table class="admin-table">
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th><p class="smallinfo text-center">Stengt</p></th>
                                <th><p class="smallinfo text-center">Åpen</p></th>
                                <th><p class="smallinfo text-center">Blank</p></th>
                            </tr>
                            <tbody>
                            {#each lifts as lift}
                                {#if lift.zone == zone.id}
                                <tr class="admin-table-row">
                                <th><div class="information-bold">{(lift.map_name).toUpperCase()}</div></th>
                                <th><p>{lift.name}</p></th>

                                {#if lift.status == "open"}
                                <th><p class="color-open">Åpen</p></th>
                                {:else if lift.status == "closed"}
                                <th><p class="color-closed">Stengt</p></th>
                                {:else}
                                <th><p class="color-blank">Blank</p></th>
                                {/if}
                                <th>
                                    <input on:change="{() => setLiftStatus(lift, 2)}" type="checkbox" checked={lift.status == "closed"}/>
                                </th>
                                <th>
                                    <input on:change="{() => setLiftStatus(lift, 1)}" type="checkbox" checked={lift.status == "open"}/>
                                </th>
                                <th>
                                    <input on:change="{() => setLiftStatus(lift, 3)}" type="checkbox" checked={lift.status == "maintanence"}/>
                                </th>
                                </tr>
                                {/if}
                            {/each}
                            </tbody>
                        </table>
                        {/if}
                    </div>
                    <div>
                        <h3>Løyper i {zone.name}</h3>
                        <table class="admin-table">
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th><p class="smallinfo text-center">Stengt</p></th>
                                <th><p class="smallinfo text-center">Åpen</p></th>
                                <th><p class="smallinfo text-center">Blank</p></th>
                            </tr>
                            <tbody>
                            {#each tracks as track}
                                {#if track.zone == zone.id}
                                <tr class="admin-table-row">
                                <th class="information-bold">{track.id}</th>
                                <th><p>{track.name}</p></th>
                                {#if track.status == "open"}
                                <th><p class="color-open">Åpen</p></th>
                                {:else if track.status == "closed"}
                                <th><p class="color-closed">Stengt</p></th>
                                {:else}
                                <th><p class="color-blank">Blank</p></th>
                                {/if}
                                <th>
                                    <input on:change="{() => setTrackStatus(track, 2)}" type="checkbox" checked={track.status == "closed"}/>
                                </th>
                                <th>
                                    <input on:change="{() => setTrackStatus(track, 1)}" type="checkbox" checked={track.status == "open"}/>
                                </th>
                                <th>
                                    <input on:change="{() => setTrackStatus(track, 3)}" type="checkbox" checked={track.status == "maintanence"}/>
                                </th>
                            
                                </tr>
                                {/if}
                            {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/each}
</div>



<style>
    table {
        border-collapse: collapse;
    }
    .custom-select-wrapper {
        position: relative;
        user-select: none;
        width: 100%;
        margin: 2rem 0;
    }
    .custom-select {
        position: relative;
        display: flex;
        flex-direction: column;
    }
    .custom-select__trigger {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        background: #FFFFFF;
        cursor: pointer;
        border-radius:4px;
    }
    .custom-options {
        top: 100%;
        left: 0;
        right: 0;
        background: #FFFFFF;
        transition: all 0.5s;
        display: none;
        visibility: hidden;
        pointer-events: none;
    }
    :global(.open-container .custom-options) {  /*Global is needed to ensure that the Svelte compiler does not remove the CSS rule */
        display: block;
        visibility: visible;
        pointer-events: all;
    }
    .status-button-container{
        display: flex;
        padding: 1rem;
        background: #ffffff;
    }
    .header-wrapper {
        display: flex;
        flex-wrap: wrap;
    }

    .status-button-text:hover {
        color: #E48D42;
        border-bottom: 1px solid #E48D42;
        cursor: pointer;
    }
    .table-container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 2rem 1rem 3rem 1rem;
    }
    .item-name{
        text-align: left;
    }
    .admin-table {
        margin-right: 4rem;
        max-width: 100%;
    }
    .arrow {
    position: absolute;
    right: 20px;
    height: 10px;
    width: 10px;
    }
    .arrow::before, .arrow::after {
    content: "";
    position: absolute;
    bottom: 0px;
    width: 0.15rem;
    height: 100%;
    transition: all 0.5s;
    }
    .arrow::before {
    left: -3px;
    transform: rotate(-45deg);
    background-color: #2C3B6C;
    }
    .arrow::after {
    left: 3px;
    transform: rotate(45deg);
    background-color: #2C3B6C;
    }
    :global(.open .arrow::before) {
    left: -3px;
    transform: rotate(45deg);
    }
    :global(.open .arrow::after) {
    left: 3px;
    transform: rotate(-45deg);
    }
    .item-status {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding-right: 1rem;
        align-items: center;
    }
    .item-status-text {
        padding-right: 1rem;
    }
    input[type="checkbox"]{
    width: 20px;
    height: 20px;
    }

    .color-open {
        color: #2FC93E;
    }
    .color-closed {
        color: #C92F2F; 
    }
    .color-blank {
        color: #2C3B6C;
    }
    .text-center {
        text-align: center;
    }
    @media only screen and (max-width: 600px) {
        .custom-select__trigger {
        }
        .table-container {
            
            justify-content: left;
        }
        .admin-table > th {
            min-width: 100%;
        }
    }
</style>