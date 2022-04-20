<script>
//   import { user } from "$lib/stores";
//   import { openModal } from "renderless-svelte";
//   import { fly } from "svelte/transition";
  const pid = 0;
</script>

<slot />

<style global>
  .scroller {
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
  }

  .scroller > * {
    scroll-snap-align: start;
  }
</style>
