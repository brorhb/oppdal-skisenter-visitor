<script>
  export let lift = {}
</script>
<div class="flex flex-row justify-between items-center">
  <div class="flex flex-column pv2">
    <div class="b">{lift.map_name.toUpperCase()} {lift.name}</div>
  </div>
  <svg height="16" width="16" viewBox="0 0 16 16">
    <circle
      opacity="1.0"
      cx="8"
      cy="8"
      fill={`${lift.status === "closed" ? "red" : "green"}`}
      r="8"
    />
  </svg>
</div>
