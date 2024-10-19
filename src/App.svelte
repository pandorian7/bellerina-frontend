<script>
  import SideBar from "./side-bar/SideBar.svelte";
  import Dashboard from "./dashboard/Dashboard.svelte";
  import { update } from "./api";
  import Loading from "./Loading.svelte";
</script>

{#await update()}
  <Loading />
{:then data}
  <div class="d-flex">
    <SideBar />
    <Dashboard />
  </div>
{/await}
