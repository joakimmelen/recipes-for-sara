<script lang="ts">

  /** @type {import('./$types').PageData} */  export let data: any;
  
 
</script>

<div class="recipes">

   
   <div class="recipe">
    <div>

           <button on:click={() => console.log(data.recipe[0].title)}>ppp</button>
        
           
       
    </div>
   </div>
</div>

<style>
    .recipes {
        display: flex;
        gap: 10px;
    }
</style>