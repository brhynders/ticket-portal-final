<script>
  import { goto } from "@roxi/routify";
  import {
    completedTickets,
    deleteModal,
    pb,
    unCompletedTickets,
  } from "../../stores";
  import DeleteModal from "./_deleteModal.svelte";
  unCompletedTickets.set(
    pb.collection("new_tickets").getList(1, 20, {
      filter: `ticket_completed = false`,
      expand: `new_ticket_items(ticket_id),new_ticket_comments(ticket)`,
      $autoCancel: false,
    })
  );
  completedTickets.set(
    pb.collection("new_tickets").getList(1, 10, {
      filter: `ticket_completed = true`,
      expand: `new_ticket_items(ticket_id),new_ticket_comments(ticket)`,
      $autoCancel: false,
    })
  );
</script>

<DeleteModal />

<!-- Uncompleted Tickets -->
<h3 class="text-gray-600 font-bold text-sm mb-3">Uncompleted Tickets</h3>
<div class="w-full grid grid-cols-4 gap-3">
  {#await $unCompletedTickets}
    Loading...
  {:then { items }}
    {#if items.length === 0}
      No uncompleted tickets
    {:else}
      {#each items as item}
        <div class="bg-white border rounded shadow p-3 max-w-full">
          <div class="flex w-full items-center justify-between">
            <div>
              <h2 class="text-md font-bold text-gray-700 mb-1">
                {item.ticket_name}
              </h2>
              <h2 class="text-xs">
                Submitted on {new Date(item.created).toLocaleDateString()}
              </h2>
            </div>
            {#if item.ticket_opened}
              <h3
                class="px-3 py-1 rounded-full bg-yellow-300 text-sm text-yellow-600"
              >
                Opened
              </h3>
            {:else}
              <h3
                class="px-3 py-1 rounded-full bg-orange-300 text-sm text-orange-600"
              >
                Submitted
              </h3>{/if}
          </div>
          <hr class="mt-3 mb-6" />
          <div class="bg-slate-100 flex items-center justify-between py-2 px-3">
            <span class="text-xl text-gray-900 font-bold">Items</span>
            <div
              class="inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-slate-600 rounded-full"
            >
              {#if item.expand["new_ticket_items(ticket_id)"]}
                {item.expand["new_ticket_items(ticket_id)"].length}
              {:else}
                0
              {/if}
            </div>
          </div>
          <div
            class="bg-slate-100 flex items-center justify-between py-2 px-3 mt-4"
          >
            <span class="text-xl text-gray-900 font-bold">Comments</span>
            <div
              class="inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-slate-600 rounded-full"
            >
              {#if item.expand["new_ticket_comments(ticket)"]}
                {item.expand["new_ticket_comments(ticket)"].length}
              {:else}
                0
              {/if}
            </div>
          </div>
          <hr class="mt-6 mb-3" />
          <div class="flex items-center gap-2">
            <button
              on:click={() => $goto(`/dashboard/ticket-${item.id}`)}
              class="py-1 px-3 rounded-md text-sm font-bolder shadow bg-blue-500 text-white hover:bg-blue-600"
              >View Ticket</button
            >
            <button
              disabled={item.ticket_opened}
              on:click={() => deleteModal.set(item)}
              class="py-1 px-3 rounded-md text-sm font-bolder shadow bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 disabled:focus:outline-none"
              >Delete</button
            >
          </div>
        </div>
      {/each}
    {/if}
  {:catch}
    Error loading tickets
  {/await}
</div>
<!-- Completed Tickets -->
<h3 class="text-gray-600 font-bold text-sm  mt-10 mb-3">Completed Tickets</h3>
{#await $completedTickets}
  <div class="p-3">Loading...</div>
  Loading
{:then { items, totalPages }}
  {#if items.length === 0}
    <div class="p-3">No completed tickets</div>
  {:else}
    <div class="w-full grid grid-cols-4 gap-3">
      {#each items as item}
        <div class="bg-white border rounded shadow p-3 max-w-full">
          <div class="flex w-full items-center justify-between">
            <div>
              <h2 class="text-md font-bold text-gray-700 mb-1">
                {item.ticket_name}
              </h2>
              <h2 class="text-xs">
                Submitted on {new Date(item.created).toLocaleDateString()}
              </h2>
            </div>
            <h3
              class="px-3 py-1 rounded-full bg-green-300 text-sm text-green-600"
            >
              Completed
            </h3>
          </div>
          <hr class="mt-3 mb-6" />
          <div class="bg-slate-100 flex items-center justify-between py-2 px-3">
            <span class="text-xl text-gray-900 font-bold">Items</span>
            <div
              class="inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-slate-600 rounded-full"
            >
              {#if item.expand["new_ticket_items(ticket_id)"]}
                {item.expand["new_ticket_items(ticket_id)"].length}
              {:else}
                0
              {/if}
            </div>
          </div>
          <div
            class="bg-slate-100 flex items-center justify-between py-2 px-3 mt-4"
          >
            <span class="text-xl text-gray-900 font-bold">Comments</span>
            <div
              class="inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-slate-600 rounded-full"
            >
              {#if item.expand["new_ticket_comments(ticket)"]}
                {item.expand["new_ticket_comments(ticket)"].length}
              {:else}
                0
              {/if}
            </div>
          </div>
          <hr class="mt-6 mb-3" />
          <div class="flex items-center gap-2">
            <button
              on:click={() => $goto(`/dashboard/ticket-${item.id}`)}
              class="py-1 px-3 rounded-md text-sm font-bolder shadow bg-blue-500 text-white hover:bg-blue-600"
              >View Ticket</button
            >
            <button
              disabled={true}
              class="py-1 px-3 rounded-md text-sm font-bolder shadow bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 disabled:focus:outline-none"
              >Delete</button
            >
          </div>
        </div>
      {/each}
    </div>
    <!-- pagination -->
    Pages: {totalPages}
  {/if}
{:catch}
  Error loading tickets
{/await}
