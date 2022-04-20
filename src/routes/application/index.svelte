<script>
    import {user} from '$lib/stores'
    import { goto } from '$app/navigation'
    import { fly } from 'svelte/transition'
    $: if (!$user) {
        goto('/')
    }
    const pid = 1
</script>


<section class="bg-gray-50 flex flex-col h-full justify-center text-gray-500" data-pg-collapsed> 
    <div class="container mx-auto px-4 relative"> 
        <div class="flex flex-wrap -mx-4  items-center"> 
            <div class="mr-auto p-8 w-full md:w-6/12"> 
                <img src="img/device-computer.png" class="w-64 h-64 mx-auto" alt="Logo"/> 
            </div>             
            <div class="p-4 w-full md:w-5/12"> 
                <h3 class="font-bold mb-2 text-4xl text-gray-800">We Work Together To Play, Have Fun, Design And Create</h3>
                <p class="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae congue tortor.</p>
                <div in:fly="{{ x: 250, duration: 600 }}"> <a href="/" class="bg-blue-600 hover:bg-blue-700 inline-block px-5 py-2 rounded text-white">Back To Start</a> 
                </div>
            </div>             
        </div>         
    </div>     
</section>

