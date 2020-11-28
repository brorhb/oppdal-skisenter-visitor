<script>
  export let items = []
  export let columns = []
  export let columnLabels = []
</script>
<table>
  <tr>
    {#each columns as column, index}
      <th>{columnLabels[index]}</th>
    {/each}
  </tr>
  {#each items as item}
  <tr>
    {#each columns as column}
      <th>{item[column]}</th>
    {/each}
  </tr>
  {/each}
</table>