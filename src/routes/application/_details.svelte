<script>
  //   import { supabase } from "$lib/db";
  //   import { fade } from "svelte/transition";
  //   import window from "../../assets/window.png";
  //   import { page } from "$app/stores";
  import { Accordion, AccordionGroup } from "renderless-svelte";
  export let selected;
  export let close;
</script>

<section class="px-4 py-4 text-gray-600">
<hgroup class="py-4">
    <h5>Details</h5>
    <h6>{selected.titel}</h6>    
</hgroup>  


  <div>
    <AccordionGroup>
      <Accordion isOpen={true}>
        <button class="acc-btn" slot="header" let:toggle on:click={toggle}
          >Info</button
        >
        <div class="acc-cont">
          <ul class="list-none">
            <li class="text-xl">
              {selected.titel}
            </li>
            <li>
              Id: {selected.id}
            </li>
            <li class="text-base">
              {selected.group}
            </li>
            <li>
              {selected.info}
            </li>
          </ul>
        </div>
      </Accordion>
      <Accordion>
        <button class="acc-btn" slot="header" let:toggle on:click={toggle}
          >Schema</button
        >
        <div class="acc-cont">
          <textarea
            class="bg-gray-50 border border-gray-300 text-gray-600 text-sm
                rounded-lg focus:bg-white focus:text-gray-400 focus:border-blue-500 block w-full
                p-2.5 px-4"
            rows="10">{JSON.stringify(selected.schema, null, 2)}</textarea
          >
        </div>
      </Accordion>
      <Accordion>
        <button class="acc-btn" slot="header" let:toggle on:click={toggle}
          >Option</button
        >
        <div class="acc-cont">
            <textarea
              class="bg-gray-50 border border-gray-300 text-gray-600 text-sm
                  rounded-lg focus:bg-white focus:text-gray-400 focus:border-blue-500 block w-full
                  p-2.5 px-4"
              rows="10">{JSON.stringify(selected.option, null, 2)}</textarea
            >
          </div>
      </Accordion>
      <Accordion>
        <button class="acc-btn" slot="header" let:toggle on:click={toggle}
          >StartValue</button
        >
        <div class="acc-cont">
            <textarea
              class="bg-gray-50 border border-gray-300 text-gray-600 text-sm
                  rounded-lg focus:bg-white focus:text-gray-400 focus:border-blue-500 block w-full
                  p-2.5 px-4"
              rows="10">{JSON.stringify(selected.startval, null, 2)}</textarea
            >
          </div>
      </Accordion>
    </AccordionGroup>
  </div>

  <p class="py-2">
    <button
      on:click={close}
      class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >Close</button
    >
  </p>
</section>

<style>
  .acc-btn {
    @apply flex w-full items-center py-2 border-b;
  }
  .acc-cont {
    @apply block w-full py-2 border-b;
  }
</style>
