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
        .from("bb_classics")
        .select("*")
        .eq("id", $page.params.id)
        .single();
      dat = data;
    } catch (err) {
      console.log(err);
    }
  };
  // titel,info,tags,fileurl,screen,thumb,id
  const updateDataEl = async (dataEl) => {
    loading = true;
    try {
      const { data, error } = await supabase
        .from("datalist")
        .update({
          titel: dataEl.titel,
          tags: dataEl.tags,
          info: dataEl.info,
          fileurl: dataEl.fileurl,
          thumb: dataEl.thumb,
          screen: dataEl.screen,
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


  
    {#await promise}
      <Loader />
    {:then data}
    <section class="w-full container mx-auto px-4 py-4 space-y-4">
        <hgroup class="flex justify-between items-center">
          <h4>{dat.titel}</h4>
          <label class="text-gray-800">
            <span class="text-sm">Edit</span>
            <input bind:checked={edit} class="ml-2 checkbox" type="checkbox" />
          </label>
        </hgroup>

        <hr />

        <div class="space-y-2">
          <input
            class="input"
            type="text"
            value={dat.titel}
            placeholder="Titel"
            on:blur={(e) => {
                dat.titel = e.currentTarget.value;
            }}
            disabled={!edit} 
          />
          <input
            class="input"
            type="text"
            value={dat.tags}
            placeholder="Tags"
            on:blur={(e) => {
                dat.tags = e.currentTarget.value;
            }}
            disabled={!edit} 
          />



          <textarea
            rows="3"
            on:blur={(e) => {
                dat.info = e.currentTarget.value;
            }} 
            disabled={!edit}
            class="input"
          >{dat.info}</textarea>

<!-- titel,info,tags,fileurl,screen,thumb,id -->
        <input
          class="input"
          type="text"
          value={dat.fileurl}
          placeholder="File"
          on:blur={(e) => {
              dat.fileurl = e.currentTarget.value;
          }}
          disabled={!edit} 
        />
        <input
        class="input"
        type="text"
        value={dat.thumb}
        placeholder="Thumb"
        on:blur={(e) => {
            dat.thumb = e.currentTarget.value;
        }}
        disabled={!edit} 
      />
      <input
          class="input"
          type="text"
          value={dat.screen}
          placeholder="Screen"
          on:blur={(e) => {
              dat.screen = e.currentTarget.value;
          }}
          disabled={!edit} 
        />
          <div class="py-4">
              <button disabled={!edit} class="btn btn-blue" on:click={update}>{loading ? '... loading' : 'Update'}</button>
          </div>
          
        </div>
      </section>
    {/await}

</section>
