<script>
  import Login from "../lib/Login.svelte"
</script>

<div class="container">

<div class="header">
  <Login />
</div>
  
<div class="content">
  <slot></slot>
</div>
  
</div>

<style>
  
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    display: flex;
    justify-content: center;
  }

  .content {
    margin-top: 50px;
  }

</style>