<script>
  import { goto } from "@roxi/routify";
  import { deleteModal, pb, unCompletedTickets } from "../../stores";
  import DeleteModal from "./_deleteModal.svelte";
  unCompletedTickets.set(
    pb.collection("new_tickets").getList(1, 15, {
      filter: `ticket_completed = false`,
      expand: `new_ticket_items(ticket_id),new_ticket_comments(ticket)`,
      $autoCancel: false,
    })
  );
</script>

<DeleteModal />
<h3 class="text-gray-600 font-bold text-sm mb-3">Uncompleted Tickets</h3>
<div class="w-full grid grid-cols-3 gap-3">
  {#await $unCompletedTickets}
    Loading...
  {:then { items }}
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
            class="px-3 py-1 rounded-full bg-orange-500 text-sm text-orange-900"
          >
            {items.ticket_opened ? "Opened" : "Submitted"}
          </h3>
        </div>
        <hr class="mt-3 mb-6" />
        <h3 class="mb-1">
          {item.expand["new_ticket_items(ticket_id)"].length} item{item.expand[
            "new_ticket_items(ticket_id)"
          ].length == 1
            ? ""
            : "s"}
        </h3>
        <h3 class="">
          {item.expand["new_ticket_comments(ticket)"].length} comment{item
            .expand["new_ticket_comments(ticket)"].length == 1
            ? ""
            : "s"}
        </h3>
        <hr class="mt-6 mb-3" />
        <div class="flex items-center gap-2">
          <button
            on:click={() => $goto(`/dashboard/ticket-${item.id}`)}
            class="py-1 px-3 rounded-md text-sm font-bolder shadow bg-blue-500 text-white hover:bg-blue-600"
            >View Ticket</button
          >
          <button
            on:click={() => deleteModal.set(item.ticket_name)}
            class="py-1 px-3 rounded-md text-sm font-bolder shadow bg-red-600 text-white hover:bg-red-700"
            >Delete</button
          >
        </div>
      </div>
    {/each}
  {:catch}
    Error loading tickets
  {/await}
</div>
<h3 class="text-gray-600 font-bold text-sm  mt-10 mb-3">Completed Tickets</h3>
