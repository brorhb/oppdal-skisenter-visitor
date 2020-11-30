<script>
  import { Trash2Icon, EditIcon } from 'svelte-feather-icons'
  import {createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher();
  export let items = []
  export let columns = []
  export let columnLabels = []

  const color = (val) => {
    if (val === "closed") return "red"
    if (val === "open") return "green"
    else return "black"
  }

</script>
<table class="f6 w-100 mw8 center">
  <thead>
    <tr class="stripe-dark">
      {#each columns as column, index}
        <th>{columnLabels[index]}</th>
      {/each}
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody class="lh-copy">
    {#each items as item}
    <tr class="stripe-dark">
      {#each columns as column}
        <th class={color(item[column])}>{item[column]}</th>
      {/each}
      <th on:click={() => dispatch('edit', item)}><EditIcon size="20" class="blue pointer" /></th>
      <th on:click={() => dispatch('delete', item)}><Trash2Icon size="20" class="red pointer" /></th>
    </tr>
  {/each}
  </tbody>
</table>