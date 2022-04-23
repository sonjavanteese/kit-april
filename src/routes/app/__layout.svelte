<script>
  import {user, _backbtn, _appname} from '$lib/stores'
  import { goto } from '$app/navigation'
  import { browser } from "$app/env"
  _backbtn.set(true)
  _appname.set("Nwp-Studio")
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
