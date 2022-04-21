<script>
  import DetailPane from './_details.svelte';

  import Loader from '$lib/flow/Loader.svelte';

  import { supabase } from "$lib/db";
  import { fade } from "svelte/transition";
  import window from "../../assets/window.png";
  import { page } from "$app/stores";

  const titel = "Nwp-Studio";
  const sub = "Application Start Page";
  const nav = [
    {
      name: "Back",
      path: "/",
    },
    {
      name: "Home",
      path: "/application",
    },
  ];
  let loading, promise, selected, open;
  const fetchDetail = async (id) => {
    let query = supabase.from("json_editor").select("*").eq("id", id).single();
    selected = null;
    loading = true;
    try {
      let { data, error } = await query;
      if (data) {
        selected = data;
      } else {
        throw new Error(error, data);
      }
    } catch (error) {
      console.log("fetchDetail", error);
    } finally {
      loading = false;
    }
  };
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
  const close = () => {
    open = false;
  };
  const show = () => {
    open = true;
  };
  promise = fetchData();
  $: if ($page.url.searchParams.get("id")) {
    fetchDetail($page.url.searchParams.get("id"));
  }

  $: console.log($page.url.searchParams.get("id"), selected);
</script>

<section class="flex flex-col h-full w-full md:flex-row">
  <article
    class="bg-gray-800 h-full overflow-x-hidden overflow-y-auto w-full relative
    md:border-r md:h-auto"
  >
    <div
      class="flex flex-col h-full items-center justify-center px-2 py-2 w-full"
    >
      <a href="/application/start" on:click={reload}>
        <img
          title="RELOAD"
          src={window}
          class="opacity-50"
          width="256"
          height="256"
        />
      </a>
    </div>
    {#if open}
        <section transition:fade={{duration: 600}} class="absolute z-12 bg-white flex flex-col inset-0">
          {#if !selected}
          <Loader />
          {:else}
            <DetailPane {selected} {close} />
          {/if}
        </section>
      {/if}
  </article>
  <article
    class="h-full overflow-x-hidden overflow-y-auto relative w-full md:h-auto"
  >
    {#await promise}
      <Loader />
    {:then payload}
      <section class="absolute z-10 bg-white flex flex-col inset-0">
        <div class="flex justify-center py-4 px-4">
          <div
            class="bg-white rounded-lg border border-gray-200 w-full text-gray-600"
          >
            {#each payload as { id, titel, info, group }}
              <a
                href="/application/start?id={id}"
                on:click={show}
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
                class:bg-blue-600={id == $page.url.searchParams.get("id")}
                class:text-white={id == $page.url.searchParams.get("id")}
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
  </article>
</section>


