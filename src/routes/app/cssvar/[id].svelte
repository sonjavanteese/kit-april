<script>
  import Loader from "$lib/flow/Loader.svelte";
  import { supabase } from "$lib/db";
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
</script>

<section
  transition:slide
  class="h-full overflow-x-hidden overflow-y-auto w-full"
>
 
  {#await promise}
    <Loader />
  {:then payload}
    <section
      class="container mx-auto px-4 bg-white flex flex-col py-4 space-y-0"
    >
      <hgroup>
        <h4>Schema Details</h4>
        <small>{selected.titel}</small>
      </hgroup>

      <TabControl>
        <div class="flex" slot="tabs" let:tabs>
          {#each tabs as { active, disabled, payload, select }}
            <button
              class="
                block font-medium text-sm
                leading-tight
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
        <div class="tab">
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
