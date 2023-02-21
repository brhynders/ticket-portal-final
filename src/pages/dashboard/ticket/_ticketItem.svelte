<script>
  export let item;
  let open = false;
</script>

<div
  on:click={() => (open = !open)}
  class="{open
    ? 'rounded-t-md'
    : 'rounded-md'} cursor-pointer flex items-center shadow border w-full py-2 px-4 justify-between"
>
  <div class="flex items-center gap-6">
    <h3>{item.item_description.slice(0, 30)}</h3>
    {#if item.item_completed}
      <span class="px-3 py-1 rounded-full bg-green-300 text-sm text-green-600"
        >Completed</span
      >
    {:else}
      <span class="px-3 py-1 rounded-full bg-red-300 text-sm text-red-600"
        >Uncompleted</span
      >
    {/if}
  </div>
  {#if !open}
    <svg
      class="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      ><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
        d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
      /></svg
    >
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-4 h-4"
      viewBox="0 0 448 512"
      ><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
        d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
      /></svg
    >
  {/if}
</div>

{#if open}
  <div class="shadow border border-t-0 rounded-b-md w-full py-2 px-4">
    {item.item_description}
  </div>
{/if}
