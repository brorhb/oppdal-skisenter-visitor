<script>
  import get_publish_date from "../helpers/publishedDate";
  import { makeAlertStore } from "../stores/AlertStore";
  import { onDestroy } from "svelte";
  import Wrapper from "./max-wrapper.svelte";

  let alertStore = makeAlertStore();
  let alerts = [];
  const unsubscribe = alertStore.subscribe((data) => (alerts = data));
  onDestroy(unsubscribe);
</script>

{#if alerts.length > 0}
  <Wrapper class="px-3 py-6">
    <div class="flex flex-col justify-center bg-alert dark:bg-yellow-900 p-4 w-full rounded-2xl">
      <h3 class="font-semibold text-2xl text-black-900">Oppdateringer fra oss</h3>
      {#each alerts as alert}
        <div class="flex justify-start py-4 text-sm">
          <p class="text-yellow-600 dark:text-yellow-300 pr-3">{get_publish_date(alert.timestamp)}</p>
          <p>{alert.message}</p>
        </div>
      {/each}
    </div>
  </Wrapper>
{/if}
