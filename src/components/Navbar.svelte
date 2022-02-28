<script>
  import { onMount } from "svelte";
  import Wrapper from "./max-wrapper.svelte";
  let comesFromMainSite = false;

  onMount(() => {
    comesFromMainSite = document.referrer.includes("oppdalskisenter");
  });
</script>

<Wrapper>
  <nav class="flex justify-between align-center py-4 w-full max-w-screen-xl">
    <a href="https://oppdalskisenter.no" class="p-2 rounded-xl dark:bg-gray-500">
      <img src="../../assets/logo.svg" alt="oppdalskisenter-logo" />
    </a>
  </nav>
</Wrapper>
