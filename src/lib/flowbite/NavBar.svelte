<script>
	import { user } from '../stores';
  import IconMenu from "../../assets/svg1/menu.svelte";
  import database from "./svg/database.svg";
  export let open = false;
  const toggle = () => {
      open = !open;
  };
</script>

<header>
  <nav class="text-white border-gray-200 bg-gray-800">
    <div class="flex flex-wrap items-center min-h-16 px-4 mx-auto">
      <span class="flex items-center">
        <i class="gg-menu-grid-o"></i>
        <a href="/" class="self-center text-xl px-2 font-semibold whitespace-nowrap dark:text-white">
          Nwp-App
        </a>
      </span>
      <span class="flex-grow">
      </span>
      <slot></slot>

    </div>
  </nav>
</header>

