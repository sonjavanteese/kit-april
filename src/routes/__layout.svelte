<script>
  import "virtual:windi.css"
  import "../style.css"
  import SignIn from '$lib/flow/SignIn.svelte'
  import UserPanel from "$lib/flow/UserPanel.svelte"
  import { supabase } from "$lib/db"
  import { user } from '$lib/stores'
  import Toasts from '$lib/toast/Toasts.svelte';
  import { Modal, openModal } from 'renderless-svelte'
  import { browser } from "$app/env"
  user.set(supabase.auth.user())

  if (browser) {
    import("virtual:windi-devtools")
  }
  
 
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_IN') {
      user.set(session.user)
      // console.log('SIGNED_IN', session)
    } else {
      user.set(null)
    }
  })  
  let open;
</script>


<Modal let:payload let:close>
  {#if $user}
    <UserPanel {close} />
  {:else}
    <SignIn {close} />
  {/if}
</Modal>

<Toasts />

<header class="bg-black bg-opacity-5 shadow">
  <nav class="flex items-center min-h-14"> 
      <button class="flex items-center justify-center h-14 w-14 hover:bg-black hover:bg-opacity-5">
        <i class="gg-menu-grid-o"></i>
      </button>
      <div class="flex-grow">
        <span class="font-thin text-xl px-1">App-Nwp</span>
      </div>
      <button class="flex items-center justify-center h-14 w-14 hover:bg-black hover:bg-opacity-5" on:click={() => openModal("Rabbit")}>
        {#if $user}
        <i class="gg-user text-blue-700"></i>
        {:else}
        <i class="gg-user-add text-red-700"></i>
        {/if}
      </button>
  </nav>
</header>

<main id="main">
  {#if browser}
      <slot />
  {/if}
</main>

<!--

  <div id="popup-modal" tabindex="-1" class="hiddenx overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
       <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
 
        <header class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                Terms of Service
            </h3>
            <button on:click={close} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
            </button>
        </header>

        <article class="p-6 space-y-6">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
            </p>
        </article>
    
        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button on:click={close} data-modal-toggle="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
            <button on:click={close} data-modal-toggle="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
        </div>
    </div>
</div> 
-->

<style>
  @import url('https://css.gg/notes.css');
  @import url('https://css.gg/menu-grid-o.css');
  @import url('https://css.gg/user.css');
  @import url('https://css.gg/user-add.css');
</style>