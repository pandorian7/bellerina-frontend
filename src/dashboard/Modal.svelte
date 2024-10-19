<script>
  import bootstrap from "bootstrap/dist/js/bootstrap";
  import { onMount } from "svelte";
  import { PostProcess, addExpense, update, updateExpense } from "../api";

  let modal;
  let edit = false;
  let updating = false;

  function defaultData() {
    return {
      amount: "",
      type: "expense",
      category: "",
      date: "",
      description: "",
    };
  }

  function handleSubmit() {
    updating = true;
    let action;
    if (!edit) {
      action = addExpense;
    } else {
      action = updateExpense;
    }
    return action(PostProcess(data))
      .then(() => update())
      .then(() => modal.hide());
  }

  let data = defaultData();

  onMount(() => {
    modal = new bootstrap.Modal(document.getElementById("transactionsModal"));
  });

  export function show(content) {
    updating = false;
    edit = content ? true : false;
    data = content ? content : defaultData();
    modal.show();
  }
</script>

<div class="modal fade" id="transactionsModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">{edit ? "Edit" : "Add"} Transaction</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          disabled={updating}
        ></button>
      </div>
      <div class="modal-body">
        <form on:submit|preventDefault>
          <div class="row mb-3">
            <!-- <div class="col-8"> -->
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Price"
                inputmode="numeric"
                name="amount"
                bind:value={data.amount}
                disabled={updating}
              />
            </div>
            <!-- <div class="col-4">
              <select
                class="form-select"
                name="type"
                bind:value={data.type}
                disabled={updating}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div> -->
          </div>
        </form>
        <form>
          <div class="row mb-3">
            <div class="col">
              <!-- <input
                type="text"
                class="form-control"
                placeholder="Category"
                name="category"
                bind:value={data.category}
                disabled={updating}
              /> -->
              <select
                class="form-select"
                name="type"
                bind:value={data.category}
                disabled={updating}
              >
                <option value="Food">Food</option>
                <option value="Entertainment">Entertainment </option>
                <option value="Education">Education</option>
                <option value="Medicine">Medicine</option>
                <option value="Travelling">Travelling</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="col">
              <input
                type="date"
                class="form-control"
                placeholder="Date"
                name="date"
                bind:value={data.date}
                disabled={updating}
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="description"
                name="description"
                bind:value={data.description}
                disabled={updating}
              />
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        {#if !updating}
          <button
            type="button"
            class="btn btn-primary"
            on:click={() => handleSubmit()}>Save changes</button
          >
        {:else}
          <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" aria-hidden="true"
            ></span>
            <span role="status">Loading...</span>
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>
