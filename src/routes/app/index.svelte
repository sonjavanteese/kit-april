<script>
  import Loader from "$lib/flow/Loader.svelte";
  import { slide, fly } from "svelte/transition";
  const titel = "Nwp-Studio";
  const sub = "Application Start Page";
  
  const nav = [
  {
    name: "Json-Editor",
    path: "/app/jedit"
  },
  {
    name: "Data-List",
    path: "/app/dlist"
  },
  {
    name: "BB-Classic",
    path: "/app/classic"
  },
  {
    name: "Css-Vars",
    path: "/app/cssvar"
  }]

</script>

<section
  transition:slide
  class="h-full overflow-x-hidden overflow-y-auto w-full"
>

  <section class="w-full max-w-lg mx-auto px-4 bg-white flex flex-col py-4 space-y-4">
    <hgroup class="text-center py-12">
      <h1>{titel}</h1>
      <h4>{sub}</h4>
    </hgroup>
      <div in:fly={{ x: 250, duration: 600 }} class="flex justify-center">
        <div
          class="bg-white rounded-lg border border-gray-200 w-full text-gray-600"
        >
          {#each nav as { name, path }}
            <a
              href={path}
              class="
                        block
                        px-4
                        py-2
                        border-b border-gray-200
                        w-full
                        first:rounded-t-lg
                        last:rounded-b-lg
                        last:border-b-0
                        hover:bg-gray-100 hover:text-gray-500
                        focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
                        transition
                        duration-500
                        cursor-pointer
                        "
            >
              {name}
            </a>
          {/each}
        </div>
      </div>
    </section>

</section>

