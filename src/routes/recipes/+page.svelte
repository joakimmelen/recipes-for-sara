<script lang="ts">
    import {onMount} from "svelte"

  /** @type {import('./$types').PageData} */  export let data: any;
  
 
</script>

<div class="recipes">

    {#each data.lists.recipeList as recipe (recipe.id)}
    
        <div class="recipe">
         <div>
            
            <img src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=250x250`} alt={recipe.name}>
            
                <h1>{recipe.title} </h1>
                <button on:click={() => console.log()}>Tjena mors</button>
                
            {recipe.id}
         </div>
        </div>
    {/each}
</div>

<style>
    .recipes {
        display: flex;
        gap: 10px;
    }
</style>