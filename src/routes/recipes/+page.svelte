<script lang="ts">
    import {onMount} from "svelte"

  /** @type {import('./$types').PageData} */  export let data: any;
  
 
</script>
<a href="/recipes/add"><button>Add new recipe</button></a>
<div class="recipes">

    {#each data.lists.recipeList as recipe (recipe.id)}
    <a href={`/recipes/${recipe.id}`}>
        
            <div class="recipe">
             <div>
        
                <img src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=250x250`} alt={recipe.name}>
        
                    <h1>{recipe.title} </h1>
            
        
             
             </div>
            </div>
    </a>
    {/each}
</div>

<style>

    a {
        text-decoration: none;
        color: inherit;
    }

    a:visited {
        color: inherit;
    }
    .recipes {
        display: flex;
        gap: 10px;
    }

    .recipe {
        border: 1px solid gold;
    }
</style>