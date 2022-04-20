<script>
  import { supabase } from '$lib/db'
  import { user } from '$lib/stores'
  import {addToast} from '../toast'
  import { sleep } from '$lib/data'
  export let close
  let loading
  const logout = () => {
    loading = true
    sleep(1000).then(() => {
      supabase.auth
      .signOut()
      .then(() => {
        addToast("Successfully Signed Out", "Logged Out", "success")
      })
      .catch((err) => {
        addToast(err, "Error", "error")
        // alert(err)
      })
    })
    .then(() => {
      loading = false
    })
    .then(close)
  }
</script>

<div
  id="user-modal"
  tabindex="-1"
  aria-hidden="true"
  class="fixed bg-black bg-opacity-35 overflow-y-auto overflow-x-hidden z-50
  inset-0">
  <div class="relative p-4 w-full max-w-md mx-auto h-full md:h-auto">
    <!-- Modal content -->
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
      <form on:submit|preventDefault class="px-6 pb-6 space-y-2">
        <fieldset>
          <label for="t1" class="block mb-1 text-xs font-thin text-gray-600">
            User Email
          </label>
          <input
            type="text"
            id="t1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
            p-2.5 px-4"
            placeholder={$user ? $user.email : ''}
            disabled />
        </fieldset>
        <fieldset>
          <label
            for="t2"
            class="block mb-1 text-xs font-thin text-gray-600">
            User Id
          </label>
          <input
            type="text"
            id="t2"
            placeholder={$user ? $user.id : ''}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
            p-2.5 px-4"
            disabled />
        </fieldset>
        <div class="py-3">
          <button
            on:click={logout}
            type="submit"
            class="w-full text-white bg-red-700 hover:bg-red-800
            focus:outline-none focus:ring-red-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center">
            {loading ? '... loading' : 'Logout'}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
