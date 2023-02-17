<script>
  import { goto } from "@roxi/routify";
  import { pb } from "../stores";

  let domain, password, errors, loading;
  const login = async (e) => {
    loading = true;
    errors = false;
    try {
      const res = await pb
        .collection("users")
        .authWithPassword(domain, password);
      if (res) $goto("/dashboard");
    } catch (err) {
      errors = true;
    }
    loading = false;
  };
</script>

{#if pb.authStore.isValid}
  {$goto("/dashboard")}
{:else}
  <section class="h-full gradient-form bg-gray-200 md:h-screen">
    <div class="container py-12 px-6 h-full mx-auto">
      <div
        class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
      >
        <div class="xl:w-10/12">
          <div class="block bg-white shadow-lg rounded-lg">
            <div class="lg:flex lg:flex-wrap g-0">
              <div class="lg:w-6/12 px-4 md:px-0">
                <div class="md:p-12 md:mx-6">
                  <div class="text-center">
                    <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">
                      Elegant Web Creations Ticket Portal
                    </h4>
                  </div>
                  <!-- Form -->
                  <form on:submit|preventDefault={login}>
                    <p class="mb-4">Please login to your account</p>
                    <div class="relative flex items-center mt-2">
                      <span class="absolute">
                        <i
                          class="fas fa-globe text-[#d1d5db] text-[18px] px-3"
                        />
                      </span>

                      <input
                        bind:value={domain}
                        type="text"
                        class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-10 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Domain (ex: elegantwebcreations.com)"
                      />
                    </div>

                    <div class="relative flex items-center mt-2">
                      <span class="absolute">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>

                      <input
                        bind:value={password}
                        type="password"
                        class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Password"
                      />
                    </div>
                    <div class="text-center mt-2 mb-3">
                      <button
                        disabled={loading}
                        class="bg-blue-600 inline-block px-6 flex items-center justify-center py-2.5 text-white font-medium text-md leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                        type="submit"
                      >
                        {#if loading}
                          <div
                            class="mr-4 w-4 h-4 rounded-full animate-spin
                    border-2 border-solid border-white border-t-transparent shadow-md"
                          />
                        {/if}
                        LOGIN
                      </button>

                      <p class="pt-6 text-red-800 font-bold text-md">
                        {#if errors}
                          Invalid Login Credentials
                        {/if}
                      </p>
                    </div>
                  </form>
                  <!-- /Form -->
                </div>
              </div>
              <div
                class="lg:w-6/12 flex justify-center items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-blue-600"
              >
                <img
                  width="350"
                  src="https://elegantwebcreations.com/wp-content/uploads/2021/03/ewc-logo-white.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
{/if}
