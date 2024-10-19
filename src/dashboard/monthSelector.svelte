<script>
  import { activeMonth } from "../stores";

  let date = new Date();

  function next() {
    date.setMonth(date.getMonth() + 1);
    date = date;
  }

  function prv() {
    date.setMonth(date.getMonth() - 1);
    date = date;
  }

  $: month = date.toLocaleString("default", { month: "long" });
  $: year = date.getFullYear();
  $: activeMonth.set([year, date.getMonth(), month]);
</script>

<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary" on:click={prv}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="currentColor"
      class="bi bi-chevron-left"
      viewBox="0 0 18 18"
    >
      <path
        fill-rule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
      />
    </svg></button
  >
  <button type="button" class="btn btn-primary" on:click={next}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="currentColor"
      class="bi bi-chevron-right"
      viewBox="0 0 18 18"
    >
      <path
        fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
      />
    </svg></button
  >
</div>

<nav
  aria-label="breadcrumb"
  style="display: inline-flex; font-size: 1.2em; border-left: 5px; padding: 5px;"
>
  <ol class="breadcrumb">
    <li class="breadcrumb-item">{year}</li>
    <li class="breadcrumb-item active" aria-current="page">{month}</li>
  </ol>
</nav>
