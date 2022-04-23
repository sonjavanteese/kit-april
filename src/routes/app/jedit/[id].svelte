<script>
  import Loader from "$lib/flow/Loader.svelte";
  import { supabase } from "$lib/db";
  import { _editop } from "$lib/stores";
  import { slide } from "svelte/transition";
  import {
    TabControl,
    TabControlItem,
  } from "renderless-svelte";
  import { page } from "$app/stores";
  let loading, promise, selected, open;
  const fetchDetail = async (id) => {
    let query = supabase
      .from("json_editor")
      .select("*")
      .eq("id", $page.params.id)
      .single();
    selected = null;
    loading = true;
    try {
      let { data, error } = await query;
      if (data) {
        selected = data;
        $_editop = data.option;
        $_editop.schema = data.schema;
        $_editop.startval = data.startval;
      } else {
        throw new Error(error, data);
      }
    } catch (error) {
      console.log("fetchDetail", error);
    } finally {
      loading = false;
    }
  };

  promise = fetchDetail();


  $: console.log($_editop.schema)
</script>


<section
  transition:slide={{duration: 500}}
  class="h-full overflow-x-hidden overflow-y-scroll w-full"
>
  {#await promise}
    <Loader />
  {:then payload}
  <section class="w-full max-w-lg mx-auto px-4 py-4 space-y-4">
      <hgroup>
        <h4>Schema Details</h4>
        <small>{selected.titel}</small>
      </hgroup>

      <TabControl>
        <div class="flex flex-row" slot="tabs" let:tabs>
          {#each tabs as { active, disabled, payload, select }}
            <button
              class="
                block font-medium text-sm
                leading-tight
                w-full
                transition transition-all duration-400
                border-x-0 border-t-0 border-b-2
                px-6
                py-3
                my-2
                outline-none
                {active
                ? 'border-blue-500 hover:bg-blue-50'
                : 'border-gray-100 hover:bg-gray-50'}
                hover:bg-gray-100
                focus:outline-none
                "
              on:click={select}
              {disabled}>{payload}</button
            >
          {/each}
        </div>
        <div class="mt-4">
          <TabControlItem id="S" payload="Info" active>
            <div class="py-2">
              <ul class="list-none">
                <li class="text-xl">
                  {selected.titel}
                </li>
                <li class="py-1">
                  Id: {selected.id}
                </li>
                <li class="py-1">
                  {selected.group}
                </li>
                <li class="py-1">
                  {selected.info}
                </li>
              </ul>
              <div class="mt-6">
                <a href="/app/jedit/editor/{$page.params.id}" class="btn btn-blue">Open in Editor</a>
              </div>
            </div>
          </TabControlItem>
          <TabControlItem id="R" payload="Schema">
            <div class="py-2">
              <textarea
                class="bg-gray-50 border border-gray-300 text-gray-600 text-sm
                          rounded-lg focus:bg-white focus:text-gray-400 focus:border-blue-500 block w-full
                          p-2.5 px-4"
                          on:blur={(e) => {
                            selected.schema = JSON.parse(e.currentTarget.value);
                          }}          
                rows="20">{JSON.stringify(selected.schema, null, 2)}</textarea
              >
            </div>
          </TabControlItem>
          <TabControlItem id="H" payload="Options">
            <div class="py-2">
              <textarea
                class="bg-gray-50 border border-gray-300 text-gray-600 text-sm
                            rounded-lg focus:bg-white focus:text-gray-400 focus:border-blue-500 block w-full
                            p-2.5 px-4"
                            on:blur={(e) => {
                              selected.option = JSON.parse(e.currentTarget.value);
                            }} 
                rows="20">{JSON.stringify(selected.option, null, 2)}</textarea
              >
            </div>
          </TabControlItem>
          <TabControlItem id="D" payload="Start Value">
            <div class="py-2">
              <textarea
                class="bg-gray-50 border border-gray-300 text-gray-600 text-sm
                            rounded-lg focus:bg-white focus:text-gray-400 focus:border-blue-500 block w-full
                            p-2.5 px-4"
                            on:blur={(e) => {
                              selected.startval = JSON.parse(e.currentTarget.value);
                            }} 
                rows="20">{JSON.stringify(selected.startval, null, 2)}</textarea
              >
            </div>
          </TabControlItem>
        </div>
      </TabControl>
    </section>
  {:catch err}
    <pre>{JSON.stringify(err)}</pre>
  {/await}

</section>