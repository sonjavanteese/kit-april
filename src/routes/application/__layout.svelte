<script>
  import {user} from '$lib/stores'
  import { goto } from '$app/navigation'
  import { browser } from "$app/env"
  $: if (!$user) {
      goto('/')
  }
</script>

{#if browser}
    <slot />
{/if}

<style global>
  .scroller {
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
  }

  .scroller > * {
    scroll-snap-align: start;
  }
</style>
