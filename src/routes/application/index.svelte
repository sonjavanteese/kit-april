<script>
  import { fly } from "svelte/transition";
  import device from "../../assets/device-computer.png";
  const pid = 1;
  // let { titel, sub, bg, uri } = pageData[pid];
  const titel = "Nwp-Studio"
  const sub = "Application Home"
  const nav = [{
    name: "Back",
    path: "/"
  },
  {
    name: "Start",
    path: "/application/start"
  }]
</script>

<section class="flex flex-col h-full w-full md:flex-row">
  <article
    class="bg-gray-800 h-full overflow-x-hidden overflow-y-auto w-full
    md:border-r md:h-auto"
  >
    <div
      class="flex flex-col h-full items-center justify-center px-2 py-2 w-full"
    >
      <img src={device} class="opacity-50" width="256" height="256" />
    </div>
  </article>
  <article
    class="h-full overflow-x-hidden overflow-y-auto relative w-full md:h-auto"
  >
    <section
      class="absolute bg-white flex flex-col inset-0 justify-center px-2 py-2"
    >
      <div class="max-w-sm mx-auto px-6 py-6 space-y-4 text-center w-full">
        <h3 class="font-bold mb-2 text-5xl text-gray-600">{titel ? titel : 'Nwp-Studio'}</h3>
        <p class="text-lg text-gray-500">{sub ? sub : 'Application'}</p>
        <div in:fly="{{ x: 250, duration: 600 }}" class="space-x-2"> 
            {#each nav as {path, name}, i}
                <a href={path} class="bg-blue-600 hover:bg-blue-700 inline-block px-5 py-2 rounded text-white">
                    {name}
                </a>
            {/each}
        </div>

      </div>
    </section>
  </article>
</section>
