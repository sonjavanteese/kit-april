<script>
  import Loader from "$lib/flow/Loader.svelte";
  import { user } from "$lib/stores";
  import { supabase } from "$lib/db";
  import { slide } from "svelte/transition";
  const titel = "Nwp-Studio";
  const sub = "Data-List";
  let daten = [];
  let newTask = "";

  const getAllDataElms = async () => {
    try {
      let { data, error } = await supabase
        .from("datalist")
        .select("*")
        .eq("uid", $user.id);
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
  // id,created_at,titel,group,info,daten,uid,op
  const updateDataEl = async (dataEl) => {
    try {
      const { data, error } = await supabase
        .from("datalist")
        .update({
          titel: dataEl.titel,
          group: dataEl.group,
          info: dataEl.info,
          daten: dataEl.daten,
          op: dataEl.op,
        })
        .eq("id", dataEl.id);
      await getAllDataElms();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteDataEl = async (dataEl) => {
    try {
      //   const { data, error } = await supabase
      //     .from("datalist")
      //     .delete()
      //     .eq("id", dataEl.id);
      console.log("Delete", dataEl.id);
      await getAllDataElms();
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && newTask !== "") {
      addNewDataEl();
    }
  };

  let promise = getAllDataElms();
</script>

<section
  transition:slide
  class="h-full overflow-x-hidden overflow-y-auto w-full"
>
  <header class="container mx-auto px-4">
    <nav class="flex items-center space-x-2">
      <button class="btn" on:click={() => history.back()}>Back</button>
    </nav>
  </header>
  <hr>

  <div class="container mx-auto px-4 py-4">

    {#await promise}
      <Loader />
    {:then data}
      <section
        class="container mx-auto px-4 bg-white flex flex-col py-4 space-y-4"
      >
        <hgroup>
          <h4>{sub}</h4>
        </hgroup>
        <div class="flex justify-center">
          <div
            class="bg-white rounded-lg border border-gray-200 w-full text-gray-600"
          >
            {#each daten as { id, created_at, titel, group, info, daten, uid, op }}
              <a
                href="/app/dlist/{id}"
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
                {titel} | {group} | {info}
              </a>
            {/each}
          </div>
        </div>
      </section>
    {/await}
  </div>
</section>
