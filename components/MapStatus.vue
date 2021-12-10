<template>
  <max-wrapper class="pb-2">
    <div class="blue rounded-2xl w-full p-4">
      <div>
        <h1 class="font-bold text-4xl">Hvilke heiser og løyper er åpne nå?</h1>
        <div class="text-sm">
          Åpningstidene varierer etter klokkeslett, sesong og værforhold.
        </div>

        <a
          class="text-sm underline"
          href="https://www.oppdalskisenter.no/%C3%A5pningstider"
          >Gå til informasjon om åpningstider ></a
        >
      </div>
      <div class="py-1"></div>
      <div class="flex md:flex-row flex-col w-full">
        <div class="w-full md:w-2/3 rounded-2xl">
          <Map
            :tracks="tracks"
            :lifts="lifts"
            :focusedItem="focusedItem"
            @onFocus="(value) => (focusedItem = value)"
          ></Map>
        </div>
        <div class="px-2"></div>
        <div class="w-full md:w-1/3">
          <item-statuses
            :focusedItem="focusedItem"
            @onFocus="(value) => (focusedItem = value)"
            :items="items"
            :selectedZone="selectedZone"
            :zones="zones"
            @onZoneChange="(val) => (selectedZone = val)"
          ></item-statuses>
        </div>
      </div>
    </div>
  </max-wrapper>
</template>
<script>
export default {
  props: ["tracks", "lifts", "zones"],
  data() {
    return {
      selectedZone: false,
      focusedItem: false,
    };
  },
  watch: {
    zones(newZones) {
      if (!this.selectedZone) {
        this.selectedZone = newZones[0];
      }
    },
  },
  mounted() {
    if (!this.selectedZone) {
      this.selectedZone = this.zones[0];
    }
  },
  computed: {
    items() {
      return {
        tracks: this.tracks,
        lifts: this.lifts,
      };
    },
    elementsInZone() {
      if (!this.selectedZone) return { tracks: this.tracks, lifts: this.lifts };
      const tracks = this.tracks.filter(
        (track) => track.zone === this.selectedZone.id
      );
      const lifts = this.lifts.filter(
        (lift) => lift.zone === this.selectedZone.id
      );
      return {
        tracks,
        lifts,
      };
    },
  },
};
</script>
