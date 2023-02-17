<script>
  import { goto } from "@roxi/routify";
  import { pb } from "../../stores";

  const date = new Date();
  const currentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  let submittedTickets = pb.collection("new_tickets").getList(1, 10, {
    filter: `created > "${date.getFullYear()}-${currentMonth}-01 00:00:00"`,
    $autoCancel: false,
  });
</script>

<div class="flex items-center justify-between">
  <div>
    <h5 class="py-3 font-bold text-4xl text-gray-600">
      {pb.authStore.model.username}
    </h5>
    <h5 class="text-md text-gray-600">
      {#await submittedTickets}
        Loading...
      {:then { totalItems }}
        {totalItems} of {pb.authStore.model.tickets_per_month} tickets remaining
      {/await}
    </h5>
  </div>
  <button
    on:click={() => $goto("/dashboard/new-ticket")}
    class="bg-blue-500 inline-block px-6 flex items-center justify-center py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
    type="button"
    data-mdb-ripple="true"
    data-mdb-ripple-color="light">New Ticket</button
  >
</div>
