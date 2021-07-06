<script>
  import lifts from "../helpers/lifts";
  export let lift = {}
</script>

<li class="list-item">
  <div>
    <div>{lift.name} ({lift.map_name.toUpperCase()})</div>
    <div>{lifts[lift.type]}</div>
  </div>
  <div>
    {#if lift.status === "closed"}
      <i class="fas fa-times-circle closed-icon fa-lg"></i>
    {:else}
      <i class="fas fa-check-circle open-icon fa-lg"></i>
    {/if}
  </div>
</li>

<style>
  .list-item {
    border-bottom: 1px dashed #BABABA;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    padding-left: 2rem;
  }

  .list-item:last-child {
    border: none
  }
  
  .closed-icon {
    color: red;
  }
  .open-icon {
    color: green;
  }
</style>
