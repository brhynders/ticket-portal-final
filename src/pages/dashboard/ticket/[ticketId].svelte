<script>
  import { pb } from "../../../stores";
  import Metabar from "./_metabar.svelte";
  import TicketComment from "./_ticketComment.svelte";
  import TicketItem from "./_ticketItem.svelte";

  export let ticketId;

  const ticketData = pb.collection("new_tickets").getOne(ticketId, {
    expand: `new_ticket_items(ticket_id),new_ticket_comments(ticket)`,
  });
</script>

{#await ticketData}
  Loading...
{:then ticket}
  <Metabar {ticket} />
  <section class="mt-6 w-full grid grid-cols-2 gap-2">
    <div class="bg-white shadow border rounded-md min-h-[500px] p-6">
      <h3 class="font-bold text-sm text-gray-500 mb-10">Ticket Items</h3>
      {#each ticket.expand["new_ticket_items(ticket_id)"] as item}
        <TicketItem {item} />
      {/each}
    </div>
    <div class="bg-white shadow border rounded-md min-h-[500px] p-6">
      <h3 class="font-bold text-sm text-gray-500 mb-10">Ticket Comments</h3>
      {#if ticket.expand["new_ticket_comments(ticket)"]}
        {#each ticket.expand["new_ticket_comments(ticket)"] as comment}
          <TicketComment {comment} />
        {/each}
      {:else}
        No comments currently{/if}
    </div>
  </section>
{/await}
