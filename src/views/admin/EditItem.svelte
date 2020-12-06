<script>
  export let currentRoute
  import { makeTracksStore } from '../../stores/TrackStore'
  import { makeLiftsStore } from '../../stores/LiftsStore'
  import { makeZoneStore } from "../../stores/ZoneStore"
  import { makeDifficultyStore } from "../../stores/DifficultyStore"
  import { difficultyToInt, difficulty } from "../../helpers/difficulty"
  import OFetch from "../../helpers/fetch"
  import Select from 'svelte-select';
  import { onMount } from 'svelte'
  import config from "../../helpers/config"

  $: itemType = currentRoute.name.split("/")[currentRoute.name.split("/").length -2]
  $: itemId = currentRoute.name.split("/")[currentRoute.name.split("/").length -1]
  let zones
  let item
  let store
  let lifts
  let tracks
  let difficulties
  let trackStore = makeTracksStore()
  let liftsStore = makeLiftsStore()
  let zoneStore = makeZoneStore()
  let difficultyStore = makeDifficultyStore()
  /*
  let connectedTracks = []
  let connectedLifts = []
  let selectedSeason
  let selectedStatus
  let selectedZone
  */
  $: {
    /*switch (itemType) {
      case "tracks":
        break
      case "lifts":
        store = makeLiftsStore()
        break
    }*/
  }
  $: {
    if (tracks) {
      if (itemType === "tracks") {
        item = tracks.find((i) => i.id == itemId)
        if (item && item.season) {
          item.season = {value: item.season, label: item.season === 1 ? "summer" : "winter"}
        }
      }
      if (item && item.connected_tracks) {
        item.connected_tracks = item.connected_tracks.map((track) => {
          return {
            value: track.id,
            label: tracks.find((t) => t.id == track.id).name
          }
        })
      }
      if (item && item.connected_lifts && lifts) {
        item.lifts = item.lifts.map(l => ({
          "value": l.id,
          "label": tracks.find(x => x.id === l.id).name
        }))
      }
      if (item && item.status) {
        item.status = {
          value: item.status === "open" ? 2 : 1,
          label: item.status
        }
      }
      if (item && item.lifts) {
        item.lifts = item.lifts.map(l => ({
          value: l.id,
          label: l.name
        }))
      }
      if (item && item.zone) {
        item.zone = {
          value: item.zone,
          label: zones.find(zone => zone.id == item.zone).name
        }
      }
      if (item && item.difficulty) {
        item.difficulty = {
          value: difficultyToInt[item.difficulty],
          label: difficulty[item.difficulty]
        }
      }
    }
  }

  $: {
    if (lifts) {
      if (itemType === "lifts") {
        item = lifts.find((i) => i.id == itemId)
        if (item && item.season) {
          item.season = {value: item.season, label: item.season === 1 ? "summer" : "winter"}
        }
        if (item && item.status) {
          item.status = {
            value: item.status === "open" ? 2 : 1,
            label: item.status
          }
        }
        if (item && item.zone && zones) {
          console.log(zones)
          /*item.zone = {
            value: item.zone,
            label: zones.find(zone => zone.id == item.zone).name
          }*/
        }
      }
    }
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
    difficultyStore.subscribe((data) => {
      difficulties = data
    })
    zoneStore.subscribe((data) => {
      zones = data
    })
    trackStore.subscribe((data) => {
      tracks = data
    })
    liftsStore.subscribe((data) => {
      lifts = data
    })
  })

  async function save() {
    let endpoint
    switch (itemType) {
      case "tracks":
        endpoint = "track"
        break;
      case "lifts":
        endpoint = "lift"
        break;
    }
    let body = item
    console.log(item.lifts)
    if (item.lifts) body.lifts = item.lifts.map((item) => item.value)
    if (item.connected_tracks) body.connected_tracks = item.connected_tracks.map((item) => item.value)
    if (item.season) body.season = item.season.value
    if (item.status) body.status = item.status.value
    if (item.zone) body.zone = item.zone.value
    if (item.coords.x && item.coords.y) body.coords = `${item.coords.x}, ${item.coords.y}`
    if (item.difficulty) body.difficulty = item.difficulty.value
    console.log(JSON.stringify(body))
    let res = await OFetch(
      `${config.BASE_URL}/admin/${endpoint}/${item.id}`,
      "PATCH",
      body
    )
    console.log(res)
  }
</script>

<div class="w-80">
  {#if item}
  <form class="measure center">
    <fieldset class="ba b--transparent ph0 mh0">
      <div class="flex flex-row w-100 justify-between items-center">
        <legend class="f4 fw6 ph0 mh0">{item.name}</legend>
        <div class="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-blue pointer" on:click={save}>Save</div>
      </div>
      {#each Object.keys(item) as key}
        {#if key !== "id"}
          {#if key === "connected_tracks"}
            <div class="mt3">
              <label class="db fw6 lh-copy f6" for={key}>{key}</label>
              <Select
                isMulti={true}
                items={tracks.map((t) => ({value: t.id, label: t.name}))}
                bind:selectedValue={item.connected_tracks}
              ></Select>
            </div>
          {:else if key === "lifts"}
            <div class="mt3">
              <label class="db fw6 lh-copy f6" for={key}>{key}</label>
              <Select
                isMulti={true}
                items={lifts.map((t) => ({value: t.id, label: t.name}))}
                bind:selectedValue={item.lifts}
              ></Select>
            </div>
          {:else if key === "season"}
            <div class="mt3">
              <label class="db fw6 lh-copy f6" for={key}>{key}</label>
              <Select
                items={[{value: 1, label: "summer"}, {value: 2, label: "winter"}]}
                bind:selectedValue={item.season}
              ></Select>
            </div>
            {:else if key === "status"}
              <div class="mt3">
                <label class="db fw6 lh-copy f6" for={key}>{key}</label>
                <Select
                  items={[{value: 2, label: "open"}, {value: 1, label: "closed"}]}
                  bind:selectedValue={item.status}
                ></Select>
              </div>
            {:else if key === "zone"}
            <div class="mt3">
              <label class="db fw6 lh-copy f6" for={key}>{key}</label>
              <Select
                items={zones.map((zone) => ({value: zone.id, label: zone.name}))}
                bind:selectedValue={item.zone}
              ></Select>
            </div>
            {:else if key == "coords"}
            <div>
              <label class="db fw6 lh-copy f6" for={key}>{key}</label>
              <div>
                <label for="xcord" class="db fw5 lh-copy f5">X coordinate on map</label>
                <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="xcord" bind:value={item.coords.x}>
              </div>
              <div>
                <label for="ycord" class="db fw5 lh-copy f5">Y coordinate on map</label>
                <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="ycord" bind:value={item.coords.y}>
              </div>
            </div>
            {:else if key === "difficulty"}
              <div class="mt3">
                <label class="db fw6 lh-copy f6" for={key}>{key}</label>
                <Select
                  items={[...difficulties.map((item) => ({value: item.id, label: difficulty[item.label]}))]}
                  bind:selectedValue={item.difficulty}
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