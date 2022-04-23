<script>
  import Loader from "$lib/flow/Loader.svelte";
  import { supabase } from "$lib/db";
  import { slide } from "svelte/transition";
  const titel = "Nwp-Studio";
  const sub = "Css Vars";
  let loading, promise, selected, open;
  const fetchData = async () => {
    let query = supabase
      .from("css_vars")
      .select("*")
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
 
  {#await promise}
    <Loader />
  {:then payload}
    <section class="container mx-auto px-4 bg-white flex flex-col py-4 space-y-4">
      <hgroup>
        <h4>{sub}</h4>
      </hgroup>
      <div class="flex justify-center">
        <div
          class="bg-white rounded-lg border border-gray-200 w-full text-gray-600"
        >
          {#each payload as { name,val,attr,label,elem,eop,id }}
            <a
              href="/app/cssvar"
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
              {label} | {name} | {val}
            </a>
          {/each}
        </div>
      </div>
    </section>
  {:catch err}
    <pre>{JSON.stringify(err)}</pre>
  {/await}
</section>
