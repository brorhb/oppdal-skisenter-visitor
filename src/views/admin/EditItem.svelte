<script>
  export let currentRoute
  import { navigateTo } from 'svelte-router-spa'
  import { makeTracksStore, updateTracks } from '../../stores/TrackStore'
  import { makeLiftsStore, updateLifts } from '../../stores/LiftsStore'
  import { makeZoneStore } from "../../stores/ZoneStore"
  import { makeDifficultyStore } from "../../stores/DifficultyStore"
  import { difficultyToInt, difficulty } from "../../helpers/difficulty"
  import Lifts, {liftTypeToInt} from "../../helpers/lifts"
  import OFetch from "../../helpers/fetch"
  import Select from 'svelte-select';
  import { onMount } from 'svelte'
  import config from "../../helpers/config"
import { intros } from 'svelte/internal';

  $: itemType = currentRoute.name.split("/")[currentRoute.name.split("/").length -2]
  $: itemId = currentRoute.name.split("/")[currentRoute.name.split("/").length -1]
  let saving = false
  let zones
  let item
  let store
  let lifts
  let tracks
  let difficulties
  let liftTypes
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



  $: if (store) {
    if (item.itemType !== "tracks" || item.itemType !== "lifts") {
      store.subscribe((data) => {
        item = data.find((i) => i.id == itemId)
        if (item && item.status) {
          selectedStatus = {
            value: item.status === "open" ? 1 : 2,
            label: item.status
          }
        }
      })
    }
  }

  onMount(() => {
    setup()
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

  async function setup() {
    if (!lifts || !tracks || !zones || !difficulties) {
      setTimeout(setup, 500)
      return
    }
    if (itemType === "tracks") {
      const t = tracks.find((i) => i.id == itemId)
      if (t) {
        item = JSON.parse(JSON.stringify(t))
      }
      if (item && item.season) {
        item.season = {value: item.season, label: item.season === 1 ? "summer" : "winter"}
      }
      if (item && !item.coords) {
        item.coords = {
          x: null,
          y: null
        }
      }
      if (item && item.connected_tracks) {
        item.connected_tracks = item.connected_tracks.map((track) => {
          if (track.id && tracks.find((t) => t.id == track.id)) return {
            value: track.id,
            label: tracks.find((t) => t.id == track.id).name
          }
        })
      }
      if (item && item.connected_lifts && lifts) {
        item.lifts = item.lifts.map(l => {
          if (tracks.find(x => x.id === l.id)) return {
            "value": l.id,
            "label": tracks.find(x => x.id === l.id).name
          }
        })
      }
      if (item && item.status) {
        item.status = {
          value: item.status === "open" ? 1 : 2,
          label: item.status
        }
      }
      if (item && item.lifts) {
        item.lifts = item.lifts.map(l => ({
          value: l.id,
          label: l.name
        }))
      }
      if (item && item.zone && zones) {
        if (zones.find(zone => zone.id == item.zone)) item.zone = {
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

    if (itemType === "lifts") {
      const liftTypesResult = await OFetch(
        `${config.BASE_URL}/lift-types`,
      )
      liftTypes = liftTypesResult.map((item) => ({
        value: item.id,
        label: Lifts[item.type]
      }))
      item = lifts.find((i) => i.id == itemId)
      if (item && item.season) {
        item.season = {value: item.season, label: item.season === 1 ? "summer" : "winter"}
      }
      if (item && item.status) {
        item.status = {
          value: item.status === "open" ? 1 : 2,
          label: item.status
        }
      }
      if (item && item.type) {
        item.type = {
          value: liftTypeToInt[item.type],
          label: Lifts[item.type]
        }
      }
      if (item && !item.coords) {
        item.coords = {
          "x": null,
          "y": null
        }
      }
      if (item && item.zone && zones) {
        if (zones.find(zone => zone.id == item.zone)) item.zone = {
          value: item.zone,
          label: zones.find(zone => zone.id == item.zone).name
        }
      }
    }
  }

  async function save() {
    saving = true
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
    console.log(item.coords.x)
    if (item.lifts) body.lifts = item.lifts.map((item) => item.value)
    if (item.connected_tracks) body.connected_tracks = item.connected_tracks.map((item) => item.value)
    if (item.season) body.season = item.season.value
    if (item.status) body.status = item.status.value
    if (item.zone) body.zone = item.zone.value
    if (item.coords.x && item.coords.y) {
      let x = parseInt(item.coords.x)
      let y = parseInt(item.coords.y)
      body.coords = `${x}, ${y}`
    } else {
      body.coords = null
    }
    if (item.difficulty) body.difficulty = item.difficulty.value
    if (item.type) body.type = item.type.value
    console.log(body)
    const res = await OFetch(
      `${config.BASE_URL}/admin/${endpoint}/${item.id}`,
      "PATCH",
      body
    )
    await updateTracks()
    await updateLifts()
    saving = false
    if (res.success) {
      navigateTo(`/admin/${itemType}`)
    }
  }
</script>

<div class="w-80">
  {JSON.stringify(item)}
  {#if item}
  <form class="measure center">
    <fieldset class="ba b--transparent ph0 mh0">
      <div class="flex flex-row w-100 justify-between items-center">
        <legend class="f4 fw6 ph0 mh0">{item.name}</legend>
        <div class={`f6 link dim br3 ph3 pv2 mb2 dib white ${saving ? "gray" : "bg-dark-blue"} pointer`} on:click={!saving ? save : null}>Save</div>
      </div>
      {#each Object.keys(item) as key}
        {#if key !== "id"}
          {#if key === "connected_tracks" && item.connected_tracks}
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
          {:else if key === "type"}
            <div class="mt3">
              <label class="db fw6 lh-copy f6" for={key}>{key}</label>
              <Select
                items={liftTypes}
                bind:selectedValue={item.type}
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
                  items={[{value: 1, label: "open"}, {value: 2, label: "closed"}]}
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