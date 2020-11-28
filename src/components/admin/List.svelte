<script>
  import { Trash2Icon, EditIcon } from 'svelte-feather-icons'
  import {createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher();
  export let items = []
  export let columns = []
  export let columnLabels = []


</script>
<table>
  <tr>
    {#each columns as column, index}
      <th>{columnLabels[index]}</th>
    {/each}
    <th>Edit</th>
    <th>Delete</th>
  </tr>
  {#each items as item}
  <tr>
    {#each columns as column}
      <th>{item[column]}</th>
    {/each}
    <th on:click={() => dispatch('edit', item)}><EditIcon size="20" class="blue pointer" /></th>
    <th on:click={() => dispatch('delete', item)}><Trash2Icon size="20" class="red pointer" /></th>
  </tr>
  {/each}
</table>