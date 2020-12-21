<script>
  export let track = {}
</script>

<div class="flex flex-row justify-between items-center pointer" on:click={() => selectedTrack({detail: track})}>
  <div class="flex flex-column pv2">
    <div class="b">{track.id} {track.name}</div>
  </div>
  <svg height="16" width="16" viewBox="0 0 16 16">
    <circle
      opacity="1.0"
      cx="8"
      cy="8"
      fill={`${track.status === "closed" ? "red" : "green"}`}
      r="8"
    />
  </svg>
</div>