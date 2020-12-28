<script>
import { difficulty, difficultyIntToColor, difficultyToInt } from "../helpers/difficulty";


  export let track = {}
</script>

<li class="lh-copy ba bl-0 bt-0 br-0 b--dotted b--black-30 flex flex-row justify-between items-center" on:click={() => selectedTrack({detail: track})}>
  <div class="flex flex-column pv2">
    <div class="b">{track.name} ({track.id})</div>
    <div class={`${difficultyIntToColor[difficultyToInt[track.difficulty]]} b`}>{difficulty[track.difficulty]}</div>
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
</li>