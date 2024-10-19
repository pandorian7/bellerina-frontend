<script>
  //   export let title = "Title";
  //   export let amount = "RS 0";
  //   export let number = 0;
  export let dark = "gray";
  export let light = "#c1c1c2";
</script>

<div class="card" style:background-color={dark} style:border-color={light}>
  <div style="padding: 5px">
    <span class="title" style:color={light}>
      <slot name="title"></slot>
      <!-- <p>{title}</p> -->
    </span>
    <span class="amount">
      <slot name="amount"></slot>
    </span>
    <span class="number"><slot name="number"></slot></span>
  </div>
</div>

<style>
  .card {
    height: 130px;
    color: white;
    border-radius: 10px;
    margin-bottom: 10px;
    border: 4px solid;
  }
  .title :global(p) {
    position: absolute;
    top: 0;
    right: 5px;
  }
  .amount :global(p) {
    font-family: Impact;
    font-size: 40px;
    margin-top: 20px;
    margin-left: 10px;
    margin-bottom: 0;
  }
  .number :global(p) {
    color: rgb(221, 221, 221);
  }
</style>
