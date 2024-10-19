<script>
  import ApexCharts from "apexcharts";
  import Transactions from "./Transactions.svelte";
  import { onMount } from "svelte";
  import MonthSelector from "./monthSelector.svelte";

  import { transactions, activeMonth } from "../stores";

  let chart, chart2, chart3;

  $: ndays = new Date(
    Number($activeMonth[0]),
    Number($activeMonth[1]) + 1,
    0
  ).getDate();

  $: filtered = $transactions.filter(
    (t) =>
      t.dateInfo.month - 1 == $activeMonth[1] &&
      t.dateInfo.year == $activeMonth[0]
  );

  $: expenses = filtered.filter((t) => t.type == "expense");

  $: expensesGrouped = expenses.reduce((dict, t) => {
    if (!dict[t.category]) {
      dict[t.category] = 0;
    }
    dict[t.category] += t.amount;
    return dict;
  }, {});

  $: expensesValues = Object.entries(expensesGrouped).map((entry) => entry[1]);
  $: expensesLabels = Object.entries(expensesGrouped).map((entry) => entry[0]);

  $: chart?.updateOptions({
    xaxis: {
      categories: Array(ndays)
        .fill(0)
        .map((val, index) => index + 1),
    },
    series: [
      {
        // data: Array(ndays).fill(3),
        data: expenses.reduce((prv, t) => {
          prv[t.dateInfo.day - 1] += t.amount;
          return prv;
        }, Array(ndays).fill(0)),
      },
    ],
  });

  $: chart2?.updateOptions({
    series: expensesValues,
    labels: expensesLabels,
  });

  $: options = {
    chart: {
      height: 310,
      type: "bar",
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        data: Array(ndays).fill(3),
      },
    ],
    // fill: {
    //   type: "gradient",
    //   gradient: {
    //     shadeIntensity: 1,
    //     opacityFrom: 0.7,
    //     opacityTo: 0.9,
    //     stops: [0, 90, 100],
    //   },
    // },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    xaxis: {
      categories: Array(ndays)
        .fill(0)
        .map((val, index) => index + 1),
    },
    tooltip: {
      enabled: false,
    },
  };
  $: expensesPie = {
    chart: {
      height: 270,
      type: "pie",
    },
    // series: [44, 55, 13, 33],
    series: expensesValues,
    // labels: ["Apple", "Mango", "Orange", "Watermelon"],
    labels: expensesLabels,
  };
  var options3 = {
    chart: {
      height: 270,
      type: "pie",
    },
    series: [44, 55, 13, 33],
    labels: ["Apple", "Mango", "Orange", "Watermelon"],
  };
  onMount(() => {
    chart = new ApexCharts(document.querySelector("#chart"), options);
    chart2 = new ApexCharts(document.querySelector("#chart2"), expensesPie);
    // chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
    chart.render();
    chart2.render();
    // chart3.render();
  });
</script>

<div style="flex-grow: 1;">
  <div class="d-flex" id="dashboard">
    <div style:flex="5" class="pane1">
      <div class="pane-container">
        <MonthSelector />

        <div class="d-flex flex-column" style="height: 90vh;">
          <div id="chart" style="flex: 1;"></div>
          <div class="d-flex" style="flex:1">
            <div style="flex: 1;" class="pie-chart">
              <div class="chart-header">Expenses</div>

              {#if filtered.length == 0}
                <h1 class="text-center mt-5">No Data</h1>
              {/if}
              <div
                id="chart2"
                style="display: {filtered.length ? 'block' : 'none'};"
              ></div>
            </div>
            <!-- <div style="flex: 1;" class="pie-chart">
              <div class="chart-header">Incomes</div>
              <div id="chart3"></div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div style:flex="2" class="pane2"><Transactions /></div>
  </div>
</div>

<style>
  .chart-header {
    padding: 10px;
    background-color: rgb(210, 210, 210);
  }

  .pie-chart {
    background-color: rgb(234, 234, 234);
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
  }

  #dashboard > div {
    height: 100vh;
  }
  .pane-container {
    padding: 10px;
  }
  .pane2 {
    height: 100vh;
    overflow: scroll;
  }
</style>
