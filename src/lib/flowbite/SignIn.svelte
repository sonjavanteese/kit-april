<script>
    import {user} from "../stores";
	import { supabase } from "../db";
	let loading = false;
	let email, password;
	let message = { success: null, display: "" };

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signIn({ email, password });
			if (error) throw error;
			message = { success: true, display: "Successfully logged in!" };
		} catch (error) {
			let errorMsg = error.error_description || error.message;
			message = { success: false, display: errorMsg };
		} finally {
			loading = false;
		}
	};
</script>


<section class="h-full flex justify-center items-center bg-white">
  <form on:submit|preventDefault={handleLogin}>
    <div
      class="p-10 border -mt-10 border-slate-200 rounded-md flex flex-col items-center space-y-3"
    >
      <div class="py-6">
        <img
          width="90"
          class=""
          src="./img/network-wireless.svg"
        />
      </div>

      <input
        bind:value={email}
        type="email"
        class="p-3 border border-slate-500 rounded-sm w-80"
        placeholder="E-Mail"
        required
      />
      <div class="flex flex-col space-y-1">
        <input
          bind:value={password}
          type="password"
          class="p-3 border border-slate-500 rounded-sm w-80"
          placeholder="Password"
          required
        />
  
      </div>
      <div class="flex flex-col space-y-5 w-full">
        <button
          class="w-full bg-primary hover:bg-blue-800 rounded-3xl p-3 text-white font-bold transition duration-200"
          type="submit" 
          disabled={loading}
          >
          {loading ? "Loading" : "Log in"}
        </button>
        <div
          class="flex items-center justify-center border-t border-t-gray-300 w-full relative"
        >
          <div class="-mt-1 font-bod bg-white px-5 absolute">Or</div>
        </div>
        <button
          type="reset"  
          class="w-full border-blue-100 border rounded-3xl p-3 text-gray-600 font-bold transition duration-200"
        >
          Sign Up
        </button>
      </div>
        {#if message.success != null}
            <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
                {message.display}
            </div>
        {/if}
    </div>
  </form>
</section>
	
    

