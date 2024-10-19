<script>
  import Modal from "./Modal.svelte";
  import { activeMonth, transactions } from "../stores";
  import { deleteExpense, update } from "../api";
  let modal;

  $: filtered = $transactions.filter(
    (t) =>
      t.dateInfo.month - 1 == $activeMonth[1] &&
      t.dateInfo.year == $activeMonth[0]
  );

  let grouped = [];
  let daysWithTransactoins = [];

  $: {
    grouped = [];
    let temp_transactions = [];
    filtered.forEach((t) => {
      if (!grouped[t.dateInfo.day]) {
        grouped[t.dateInfo.day] = [];
        temp_transactions.push(t.dateInfo.day);
      }
      grouped[t.dateInfo.day].push(t);
    });
    daysWithTransactoins = temp_transactions.sort((a, b) => b - a);
  }

  // $: console.log(filtered, daysWithTransactoins);
</script>

<div class="pane">
  <Modal bind:this={modal} />
  <h1 class="heading">Transactions</h1>
  <button
    class="btn btn-primary"
    id="add-transactions"
    on:click={() => modal.show()}>Add Transaction</button
  >
  <div class="transactions">
    {#each daysWithTransactoins as day}
      <div class="date">
        <h5>{grouped[day][0].dateInfo.string}</h5>
      </div>
      {#each grouped[day] as ts}
        <div
          class="transaction d-flex justify-content-between overflow-hidden position-relative {ts.type}"
        >
          <div>{ts.category} - {ts.description}</div>
          <div style="height: inherit; overflow: hidden;">
            <div class="price">Rs.{ts.amount}.00</div>
            <div class="action">
              <button on:click={() => modal.show(ts)}>Edit</button>
              <button on:click={() => deleteExpense(ts.id).then(update)}
                >Delete</button
              >
            </div>
          </div>
        </div>
      {/each}
    {/each}
  </div>
</div>

<style>
  .pane {
    /* background-color: lightcoral; */
    padding: 10px;
    background-color: rgb(236, 252, 255);
    height: 100vh;
  }
  .heading {
    text-align: center;
    background-color: rgb(200, 248, 255);
    font-family: "Agdasima";
    /* padding-left: 10px; */
  }
  .date {
    background-color: rgb(237, 237, 237);
    padding: 8px;
  }
  .date > h5 {
    margin-bottom: 0;
  }
  .transactions {
    margin-top: 10px;
    /* overflow: scroll; */
  }
  .date,
  .transaction {
    margin-bottom: 5px;
  }
  .transaction {
    height: 40px;
    margin-left: 30px;
    padding: 8px;
    background-color: rgb(210, 210, 210);
  }
  .action > button {
    border: none;
  }

  .action {
    display: none;
  }

  .transaction:hover .action {
    display: block;
  }
  .transaction:hover .price {
    display: none;
  }
  #add-transactions {
    display: block;
    width: 100%;
    border-radius: 0;
    background-color: rgb(176, 244, 255);
    border: none;
    color: black;
    font-family: "Courier New", Courier, monospace;
    font-size: large;
  }
  .transactions :global(.expense) {
    background-color: rgb(255, 188, 188);
  }
  .transactions :global(.income) {
    background-color: rgb(134, 208, 134);
  }
</style>
