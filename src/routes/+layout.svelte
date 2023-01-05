<script>
  import Login from "../lib/Login.svelte"
</script>

<Login />

<div class="content">
<slot></slot>
</div>

<style>
  .content {
    padding-top: 5vh;
  }
</style>