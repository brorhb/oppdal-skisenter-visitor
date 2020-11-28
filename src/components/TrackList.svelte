<script>
  export let tracks = []
</script>
<div class="flex flex-wrap">
  {#each tracks as track}
    <div class="pa1">
      <div class="pa2 flex flex-column ba bw1 b--gray br2">
        <div class="b">{track.id} {track.name}</div>
        <div>{track.difficulty}</div>
        <div class="flex flex-row items-center">
          <span class="pr1">status:</span>
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
      </div>
    </div>
  {/each}
</div>