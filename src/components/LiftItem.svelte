<script>
  import lifts from "../helpers/lifts";
  export let lift = {}
</script>
<li class="lh-copy ba bl-0 bt-0 br-0 b--dotted b--black-30 flex flex-row justify-between items-center">
  <div class="flex flex-column pv2">
    <div class="b">{lift.name} ({lift.map_name.toUpperCase()})</div>
    <div class={`b`}>{lifts[lift.type]}</div>
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
</li>
