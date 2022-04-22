<script>
  import Loader from "$lib/flow/Loader.svelte";
  import { supabase } from "$lib/db";
  import { slide } from "svelte/transition";
  const titel = "Nwp-Studio";
  const sub = "Application Start Page";
  let loading, promise, selected, open;
  const fetchData = async () => {
    let query = supabase
      .from("json_editor")
      .select("*")
      .order("group", { ascending: true })
      .order("id", { ascending: true });
    open = false;
    selected = null;
    loading = true;
    try {
      let { data, error } = await query;
      if (data) {
        return data;
      } else {
        throw new Error(error, data);
      }
    } catch (error) {
      console.log("fetchData", error);
    } finally {
      loading = false;
    }
  };
  const reload = () => {
    promise = fetchData();
  };
  promise = fetchData();
</script>

<section
  transition:slide
  class="h-full overflow-x-hidden overflow-y-auto w-full"
>
  <header class="container mx-auto px-4">
    <nav class="flex items-center space-x-2">
      <button on:click={() => history.back()}>Back</button>

      <button on:click={reload}>Reload</button>
    </nav>
  </header>
  <hr />
  {#await promise}
    <Loader />
  {:then payload}
    <section class="container mx-auto px-4 bg-white flex flex-col py-4 space-y-4">
      <hgroup>
        <h4>Json Editor Schemata</h4>
      </hgroup>
      <div class="flex justify-center">
        <div
          class="bg-white rounded-lg border border-gray-200 w-full text-gray-600"
        >
          {#each payload as { id, titel, info, group }}
            <a
              href="/app/jedit/{id}"
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
              {titel}
            </a>
          {/each}
        </div>
      </div>
    </section>
  {:catch err}
    <pre>{JSON.stringify(err)}</pre>
  {/await}
</section>
