<script>
  import DeleteModal from "../_deleteModal.svelte";
  import { deleteModal } from "../../../stores";

  export let ticket;
</script>

<div class="flex items-center justify-between">
  <div class="flex items-center gap-2">
    <a href="/dashboard" class="underline">All tickets</a>
    <span class="font-light">/</span>
    <h3 class="font-bold text-md">{ticket.ticket_name}</h3>
    <div class="ml-3 text-xs font-normal flex items-center gap-3">
      <span>
        Submitted On {new Date(ticket.created).toLocaleDateString()}
      </span>
      <span>
        Ticket Status: {ticket.ticket_completed
          ? "Completed"
          : ticket.ticket_opened
          ? "Opened"
          : "Submitted"}
      </span>
    </div>
  </div>
  <div class="flex items-center gap-6">
    {#if !ticket.ticket_completed && !ticket.ticket_opened}
      <DeleteModal />
      <button
        on:click={() => deleteModal.set(ticket)}
        class="py-1 px-3 rounded-md text-sm font-bolder shadow bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 disabled:focus:outline-none"
        >Delete Ticket</button
      >
    {/if}
  </div>
</div>
