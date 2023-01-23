<script>
  import Login from "../lib/Login.svelte"
</script>

<div class="wrapper">

<div class="header">
  <Login />
</div>
  
<div class="content">
  <slot></slot>
</div>
  
</div>

<style>

  .wrapper {
    display: flex;
    justify-content: center;
    max-width: 100%;
    padding-top: 50px;
    margin-inline: auto;
  }

  .content {
    max-width: 100%;
    width: 100vw;
  }

</style>