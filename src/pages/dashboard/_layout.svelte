<script>
  import { goto } from "@roxi/routify";
  import { pb } from "../../stores";
  import { BaseTransition } from "@roxi/routify/decorators";
  import Userbox from "./_userbox.svelte";
  const logout = () => {
    pb.authStore.clear();
    $goto("/");
  };
</script>

{#if !pb.authStore.isValid}
  {$goto("/")}
{:else}
  <div
    class="bg-gray-100 font-sans leading-normal tracking-normal min-h-screen flex flex-col"
  >
    <header class="bg-white w-full shadow py-3">
      <div
        class="w-full container mx-auto flex flex-wrap items-center justify-between"
      >
        <span class="text-slate-900 text-base font-bold">
          <img
            wdith="75"
            src="https://elegantwebcreations.com/wp-content/uploads/2021/03/logo-1.png"
            class="inline w-32 h-auto mr-4"
          />Ticket Portal
        </span>
        <button
          on:click={logout}
          class="bg-blue-600 inline-block px-6 flex items-center justify-center py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light">Logout</button
        >
      </div>
    </header>

    <main
      class="container w-full mx-auto py-12 flex-grow px-4 text-gray-800 leading-normal"
    >
      <Userbox />
      <div class="mt-12"><slot /></div>
    </main>

    <footer class="bg-white shadow">
      <div class="container max-w-md mx-auto flex py-3 px-4">
        Copyright 2023, Elegant Web Creations
      </div>
    </footer>
  </div>
{/if}
