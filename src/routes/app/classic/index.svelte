<script>
  import Loader from "$lib/flow/Loader.svelte";
  import { user, _order } from "$lib/stores";
  import { supabase } from "$lib/db";
  import { slide } from "svelte/transition";
  const titel = "Nwp-Studio";
  const sub = "BB Classic-Collection";
  let oda = false;
  let daten = [];
  let newTask = "";
  oda = $_order;
  const getAllDataElms = async () => {
    try {
      let { data, error } = await supabase
        .from("bb_classics")
        .select("*")
        .order("id", { ascending: oda });
      daten = data;
    } catch (err) {
      console.log(err);
    }
  };

  const addNewDataEl = async () => {
    try {
      const { data, error } = await supabase
        .from("datalist")
        .insert([{ titel: newTask, uid: $user.id }]);
      // console.log(newTask ? newTask : 'Error')
      await getAllDataElms();
      newTask = "";
    } catch (err) {
      console.log(err);
    }
  };
  // titel,info,tags,fileurl,screen,thumb,id
  let promise = getAllDataElms();
  $: _order.set(oda);
</script>

<section
  transition:slide
  class="h-full overflow-x-hidden overflow-y-auto w-full"
>


  <div class="w-full max-w-lg mx-auto px-4 py-4">
    <hgroup class="flex items-center justify-between">
      <h4>{sub}</h4>
      <label class="text-gray-800">
        <span class="text-sm">Order Asc</span>
        <input bind:checked={oda} on:change={() => { promise = getAllDataElms() }} class="ml-2 checkbox" type="checkbox" />
      </label>
    </hgroup>
    {#await promise}
      <Loader />
    {:then data}
      <section
        class="bg-white flex flex-col py-4 space-y-4"
      >
        
        <div class="flex justify-center">
          <div
            class="bg-white rounded-lg border border-gray-200 w-full text-gray-600"
          >
            {#each daten as { titel,info,tags,fileurl,screen,thumb,id }}
              <a
                href="/app/classic/{id}"
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
                {titel} | {tags} | {info}
              </a>
            {/each}
          </div>
        </div>
      </section>
    {/await}
  </div>
</section>
