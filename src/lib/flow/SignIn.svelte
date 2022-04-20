<script>
  import { supabase } from '../db'
  import {addToast} from '../toast'
  export let close
  let email, password, loading

  const login = () => {
    loading = true
    supabase.auth
      .signIn({ email, password })
      .then((data) => {
        if (data.error) {
          console.log(data.error)
          addToast(data.error.message, "Authentification Failed", "error")
        } else {
          addToast(`Signed In as ${data.user.email}`, "Authentification", "success")
        }
        
      })
      .then(() => {
        loading = false
      })
      .then(close)
      .catch((err) => {
        addToast(err, "Error", "error")
        // alert(err)
      })
  }
</script>

<div
  id="authentication-modal"
  tabindex="-1"
  aria-hidden="true"
  class="fixed bg-black bg-opacity-35 overflow-y-auto overflow-x-hidden z-50
  inset-0">
  <div class="relative p-4 w-full max-w-md mx-auto h-full md:h-auto">
    <div class="relative bg-white rounded-lg shadow">
      <div class="flex justify-end p-2">
        <button
          on:click={close}
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200
          hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex
          items-center">
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414
              1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293
              4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <form on:submit|preventDefault={login} class="px-6 pb-6 space-y-2">
        <fieldset>
          <label for="email" class="block mb-1 text-xs font-thin text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            bind:value={email}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
            p-2.5 px-4"
            placeholder="user@nwp-cgn.de"
            required />
        </fieldset>
        <fieldset>
          <label
            for="password"
            class="block mb-1 text-xs font-thin text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            bind:value={password}
            placeholder="••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
            p-2.5 px-4"
            required />
        </fieldset>
        <div class="py-3">
          <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center">
            {loading ? '... loading' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
