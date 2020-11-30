<script>
  export let currentRoute
  import { makeTracksStore } from '../../stores/TrackStore'
  import { makeLiftsStore } from '../../stores/LiftsStore'
  import Select from 'svelte-select';
	
	const items = ['One', 'Two', 'Three'];
  import { onMount } from 'svelte'
  $: itemType = currentRoute.name.split("/")[currentRoute.name.split("/").length -2]
  $: itemId = currentRoute.name.split("/")[currentRoute.name.split("/").length -1]
  let item
  let store
  let lifts = []
  let tracks = []
  let trackStore = makeTracksStore()
  let liftsStore = makeTracksStore()
  let connectedTracks = []
  let connectedLifts = []
  let selectedSeason
  let selectedStatus
  $: {
    /*switch (itemType) {
      case "tracks":
        break
      case "lifts":
        store = makeLiftsStore()
        break
    }*/
  }
  $: if (store) {
    if (item.itemType !== "tracks" || item.itemType !== "lifts") {
      store.subscribe((data) => {
        item = data.find((i) => i.id == itemId)
        if (item && item.status) {
          selectedStatus = {
            value: item.status === "open" ? 2 : 1,
            label: item.status
          }
        }
      })
    }
  }

  onMount(() => {
    trackStore.subscribe((data) => {
      if (itemType === "tracks") {
        item = data.find((i) => i.id == itemId)
        //selectedSeason = {value: item.season, label: item.season === 1 ? "summer" : "winter"}
        if (item && item.season) {
          selectedSeason = {value: item.season, label: item.season === 1 ? "summer" : "winter"}
        }
      }
      if (item && item["connected_tracks"]) {
        connectedTracks = item.connected_tracks?.map(t => ({
          "value": t.id,
          "label": data.find(x => x.id === t.id).name
        }))
      }
      if (item && item.status) {
        selectedStatus = {
          value: item.status === "open" ? 2 : 1,
          label: item.status
        }
      }
      tracks = data
    })
    liftsStore.subscribe((data) => {
      if (itemType === "lifts") {
        item = data.find((i) => i.id == itemId)
        if (item && item.season) {
          selectedSeason = {value: item.season, label: item.season === 1 ? "summer" : "winter"}
        }
      }
      if (item && item["lifts"]) {
        connectedLifts = item.lifts.map((lift) => {
          return {
            value: lift.id,
            label: lift.name
          }
        })
      }
      if (item && item.status) {
        selectedStatus = {
          value: item.status === "open" ? 2 : 1,
          label: item.status
        }
      }
      lifts = data
    })
  })
</script>

<div class="w-80">
  {JSON.stringify(selectedStatus)}
  {#if item}
  <form class="measure center">
    <fieldset class="ba b--transparent ph0 mh0">
      <legend class="f4 fw6 ph0 mh0">{item.name}</legend>
      {#each Object.keys(item) as key}
        {#if key !== "id"}
          {#if key === "connected_tracks"}
            <div class="mt3">
              <label class="db fw6 lh-copy f6" for={key}>{key}</label>
              <Select
                isMulti={true}
                items={tracks.map((t) => ({value: t.id, label: t.name}))}
                bind:selectedValue={connectedTracks}
              ></Select>
            </div>
          {:else if key === "lifts"}
            <div class="mt3">
              <label class="db fw6 lh-copy f6" for={key}>{key}</label>
              <Select
                isMulti={true}
                items={lifts.map((t) => ({value: t.id, label: t.name}))}
                bind:selectedValue={connectedLifts}
              ></Select>
            </div>
          {:else if key === "season"}
            <div class="mt3">
              <label class="db fw6 lh-copy f6" for={key}>{key}</label>
              <Select
                items={[{value: 1, label: "summer"}, {value: 2, label: "winter"}]}
                bind:selectedValue={selectedSeason}
              ></Select>
            </div>
            {:else if key === "status"}
              <div class="mt3">
                <label class="db fw6 lh-copy f6" for={key}>{key}</label>
                <Select
                  items={[{value: 2, label: "open"}, {value: 1, label: "closed"}]}
                  bind:selectedValue={selectedStatus}
                ></Select>
              </div>
          {:else}
          <div class="mt3">
            <label class="db fw6 lh-copy f6" for={key}>{key}</label>
            <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" bind:value={item[key]} >
          </div>
          {/if}
        {/if}
      {/each}
    </fieldset>
  </form>
  {/if}
</div>