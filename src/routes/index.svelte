<script>
  import { user } from "$lib/stores";
  import { openModal } from "renderless-svelte";
  import { fly } from "svelte/transition";
  const pid = 0;
</script>

<section class="flex flex-col h-full w-full md:flex-row">
  <article
    class="{$user
      ? 'bg-emerald-800'
      : 'bg-red-800'} h-full overflow-x-hidden overflow-y-auto w-full
    md:border-r md:h-auto"
  >
    <div
      class="flex flex-col h-full items-center justify-center px-2 py-2 w-full"
    >
      <img
        src={$user ? "img/shield-ok.png" : "img/shield-error.png"}
        width="256"
        height="256"
        class="opacity-50"
      />
    </div>
  </article>
  <article
    class="h-full overflow-x-hidden overflow-y-auto relative w-full md:h-auto"
  >
    <section
      class="absolute bg-white flex flex-col inset-0 justify-center px-2 py-2"
    >
      <div class="max-w-sm mx-auto px-6 py-6 space-y-8 w-full">
        <h2 class="font-semibold font-serif text-4xl text-center text-gray-600">
          Application
        </h2>

        {#if $user}
          <div in:fly={{ x: 250, duration: 600 }} class="text-center">
            <a
              href="/app"
              class="bg-blue-700 focus:outline-none focus:ring-blue-300
              font-medium hover:bg-blue-800 px-12 py-3.5 rounded-full
              text-center text-white"
            >
              Start
            </a>
          </div>
        {:else}
          <div in:fly={{ x: 250, duration: 600 }} class="text-center">
            <button
              on:click={openModal}
              type="button"
              class="bg-red-700 focus:outline-none focus:ring-red-300
              font-medium hover:bg-red-800 px-12 py-2.5 rounded-full
              text-center text-white hover:shadow-lg"
            >
              Signin
            </button>
          </div>
        {/if}
      </div>
    </section>
  </article>
</section>

<!-- 
    <section
      class="absolute bg-white flex flex-col inset-0 justify-center px-2 py-2">
      <div
        class="max-w-sm mx-auto px-6 py-6 space-y-2 w-full"
        >
        <fieldset>
          <label for="email" class="block mb-1 text-xs font-thin text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
            p-2.5 px-4"
            placeholder="name@company.com"
            required />
        </fieldset>
        <fieldset>
          <label
            for="password"
            class="block mb-1 text-xs font-thin text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
            p-2.5 px-4"
            required />
        </fieldset>
        <div class="py-3">
          <button
            type="button"
            class="w-full text-white bg-blue-700 hover:bg-blue-800
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center">
            Login
          </button>
        </div>
      </div>
    </section>

 -->
