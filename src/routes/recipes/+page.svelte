<script lang="ts">
import { createSearchStore, searchHandler } from "$lib/stores/search";
import { onDestroy } from "svelte";


  /** @type {import('./$types').PageData} */  export let data: any;
  
  const searchRecipes = data.lists.recipeList.map((recipe: any) => (
    {
    ...recipe,
    searchTerms: `${recipe.title}, ${recipe.description}, ${recipe.instructions1_title}, ${recipe.instructions1_desc}, ${recipe.instructions2_title}, ${recipe.instructions2_desc}, ${recipe.instructions3_title}, ${recipe.instructions3_desc}, ${recipe.instructions4_title}, ${recipe.instructions4_desc}, ${recipe.instructions5_title}, ${recipe.instructions5_desc}, ${recipe.expand.cuisine}, ${recipe.expand.cuisine.map((cuz: any) => cuz.tag)}`
  }))
  const searchStore = createSearchStore(searchRecipes)
  const unsubscribe = searchStore.subscribe((model) => searchHandler(model))

  onDestroy(() => {
    unsubscribe();
  })

</script>

<form class="search-form" on:submit|preventDefault>
    <input type="search" placeholder="Search..." bind:value={$searchStore.search}> 
 </form>
<div class="recipes">
    {#if $searchStore.filtered == ""}

    {#each data.lists.recipeList as recipe (recipe.id)}
    <a href={`/recipes/${recipe.id}`}>
        <div class="recipe">
            <div>
                <img src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=250x250`} alt={recipe.name}>
                {#each recipe.expand.cuisine as tags (tags.id)}
                
                <h5>{tags.tag}</h5>
                {/each}
                <h1>{recipe.title} </h1>
            </div>
        </div>
    </a>
    {/each}
    {:else}
    <div class="search-grid">
        {#each $searchStore.filtered as recipe}
        <a href={`/recipes/${recipe.id}`}>
        <div class="recipe">
          <img src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=250x250`} alt={recipe.name}>
          <h1>{recipe.title} </h1>
        </div>
      </a>
        {/each}
      </div>

    {/if}
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