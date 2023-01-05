<script lang="ts">
    import {onMount} from "svelte"

  /** @type {import('./$types').PageData} */  export let data: any;
  
 
</script>

<div class="recipes">

   <button on:click={() => console.log(data)}></button>
</div>

<style>
    .recipes {
        display: flex;
        gap: 10px;
    }
</style>