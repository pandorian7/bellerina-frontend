<script>
  import Card from "./Card.svelte";

  import { transactions, activeMonth } from "../stores";

  $: filtered = $transactions.filter(
    (t) =>
      t.dateInfo.month - 1 == $activeMonth[1] &&
      t.dateInfo.year == $activeMonth[0]
  );

  let budget = null;
  $: budgetFilled = Math.round((totalExpenses / budget) * 100);
  $: budgetVarient = (() => {
    if (budgetFilled < 75) {
      return "bg-primary";
    } else if (budgetFilled < 95) {
      return "bg-warning";
    } else {
      return "bg-danger";
    }
  })();

  function getBudget() {
    let val = localStorage.getItem("budget");
    if (val) {
      budget = Number(val);
    } else {
      budget = null;
    }
    return budget;
  }

  function setBudget(val) {
    localStorage.setItem("budget", val);
    getBudget();
  }

  function handleAddBudget() {
    let budget = prompt("set Budget");
    setBudget(budget);
  }

  getBudget();

  $: expenses = filtered.filter((t) => t.type == "expense");
  $: incomes = filtered.filter((t) => t.type == "income");
  // $: console.log(expenses, incomes);
  $: totalExpenses = expenses.map((e) => e.amount).reduce((a, b) => a + b, 0);
  $: totalIncomes = incomes.map((e) => e.amount).reduce((a, b) => a + b, 0);
</script>

<div id="sidebar">
  <div style="padding: 10px;">
    <span id="brand" class="h1">Expenso</span>
    <div style="margin-top: 40px;">
      <!-- <Card dark="#006600" light="#00c500">
        <p slot="title" style:color="#00f400">Incomes</p>
        <p slot="amount">Rs. {totalIncomes}</p>
        <p slot="number">{incomes.length} transactions</p>
      </Card> -->

      <Card dark="#9b0000" light="rgb(221, 0, 0)">
        <p slot="title" style:color="rgb(255, 58, 58)">Expenses</p>
        <p slot="amount">Rs. {totalExpenses}</p>
        <p slot="number">{expenses.length} transactions</p>
      </Card>
      {#if budget}
        <Card dark="rgb(0, 57, 154)" light="rgb(0, 162, 255)  ">
          <p slot="title" style:color="rgb(0, 217, 255)">Budget</p>
          <p slot="amount">Rs. {budget - totalExpenses}</p>
          <div
            class="progress"
            slot="number"
            style:width="95%"
            style:margin="auto"
            style:height="15px"
          >
            <div
              class="progress-bar {budgetVarient}"
              role="progressbar"
              style:width={`${budgetFilled}%`}
            >
              {`${budgetFilled}%`}
            </div>
          </div>
          <!-- <p slot="number">6 transactions</p> -->
        </Card>
      {/if}
    </div>
    <div class="d-grid">
      {#if budget}
        <div class="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            class="btn btn-warning"
            on:click={handleAddBudget}>Edit Budget</button
          >
          <button
            type="button"
            class="btn btn-danger"
            on:click={() => setBudget(null)}>Remove Budget</button
          >
        </div>
      {:else}
        <button type="button" class="btn btn-primary" on:click={handleAddBudget}
          >Add Budget</button
        >
      {/if}
    </div>
    {#if budget}
      <div class="alert alert-primary mt-3" role="alert">
        Your Budget: RS. {budget}
      </div>

      {#if budgetVarient == "bg-danger"}
        <div class="alert alert-danger mt-3" role="alert">
          Your Budget is Exceeded
        </div>
      {/if}
      {#if budgetVarient == "bg-warning"}
        <div class="alert alert-warning mt-3" role="alert">
          Your Budget is About to Exceed
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  #brand {
    font-family: "Sofia";
    color: white;
  }
  #sidebar {
    height: 100vh;
    width: 20%;
    margin: none;
    background-color: #292b2e;
  }
</style>
