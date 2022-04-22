<script>
  import Loader from "$lib/flow/Loader.svelte";
  import {_edit} from "$lib/stores";
  import { supabase } from "$lib/db";
  import { slide } from "svelte/transition";
  import { page } from "$app/stores";
  const titel = "Nwp-Studio";
  const sub = "Data-List";
  let edit = $_edit;
  let loading;
  let dat;
  $: _edit.set(edit);
  const getData = async () => {
    try {
      let { data, error } = await supabase
        .from("datalist")
        .select("*")
        .eq("id", $page.params.id)
        .single();
      dat = data;
    } catch (err) {
      console.log(err);
    }
  };
  const updateDataEl = async (dataEl) => {
    loading = true;
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
      await getData();
    } catch (err) {
      console.log(err);
    } finally {
        loading = false;
    }

  };
  const deleteDataEl = async (dataEl) => {
    try {
      //   const { data, error } = await supabase
      //     .from("datalist")
      //     .delete()
      //     .eq("id", dataEl.id);
      console.log("Delete", dataEl.id);
      await getData();
    } catch (err) {
      console.log(err);
    }
  };
  const update = () => {
      updateDataEl(dat)
  };
  let promise = getData();
  // id,created_at,titel,group,info,daten,uid,op
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
  <hr />

  <div class="container mx-auto px-4 py-4">
    {#await promise}
      <Loader />
    {:then data}
      <section
        class="container mx-auto px-4 bg-white flex flex-col py-4 space-y-4"
      >
        <hgroup class="flex justify-between items-center">
          <h4>{dat.titel}</h4>
          <label class="text-gray-800">
            <span class="text-sm">Edit</span>
            <input bind:checked={edit} class="ml-2 leading-tight" type="checkbox" />
          </label>
        </hgroup>

        <hr />

        <div class="space-y-2">
          <input
            class="input"
            type="text"
            value={dat.titel}
            placeholder="Enter text"
            on:blur={(e) => {
                dat.titel = e.currentTarget.value;
            }}
            disabled={!edit} 
          />

          <select
            value={dat.group}
            on:blur={(e) => {
                dat.group = e.currentTarget.value;
            }} 
            disabled={!edit}
            class="input"
          >
            <option>Image</option>
            <option>Video</option>
            <option>Link</option>
          </select>

          <textarea
            rows="3"
            on:blur={(e) => {
                dat.info = e.currentTarget.value;
            }} 
            disabled={!edit}
            class="input"
          >{dat.info}</textarea>
          <textarea
            rows="10"
            on:blur={(e) => {
                dat.daten = JSON.parse(e.currentTarget.value);
            }} 
            disabled={!edit}
            class="input"
          >{JSON.stringify(dat.daten, null, 2)}</textarea>
          <div class="py-1">
            <label class="text-gray-600 space-x-4">
            <input class="checkbox" 
            checked={dat.op} 
            on:blur={(e) => {
                dat.op = e.currentTarget.checked;
            }} 
            disabled={!edit}
            type="checkbox">
            <span class="text-lg">Show</span>
          </label>  
          </div>

          <div class="py-4">
              <button disabled={!edit} class="btn btn-blue" on:click={update}>{loading ? '... loading' : 'Update'}</button>
          </div>
          
        </div>
      </section>
    {/await}
  </div>
</section>
