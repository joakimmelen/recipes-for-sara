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
    <input class="search-input" type="search" placeholder="Search..." bind:value={$searchStore.search}> 
 </form>
<div class="recipes">
    {#if $searchStore.filtered == undefined}

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
}

a:visited {
    color: inherit;
}
.recipes {
    display: grid;
    grid-auto-rows: minmax(250px, auto);
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
}

.recipe {
    border: 1px solid #f1f1f1;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    position: relative;
    z-index: 1;
}

.recipe:hover {
  transform: scale(1.05);
  z-index: 2;
}

.recipe img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
}

.recipe:hover img {
  transform: scale(1.2);
}

.recipe h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
  text-shadow: 0px 0px 10px rgba(0,0,0,0.75);
  z-index: 3;
  transition: all 0.3s ease-in-out;
}

.recipe:hover h1 {
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  transform: translate(-50%, -50%) scale(1.2);
}

.search-form {
  border: 2px solid #f1f1f1;
  margin: 10px;
  margin-left: 0;
  padding-left: 0;
}
.search-input:focus {
  border: 3px solid #f1f1f1;
}

.search-input {
  width: 100vw;
  position: fixed;
  left: 0;
  font-size: 1.5rem;
  z-index: 50;
  margin-left: 0;
  padding-left: 0;
}

@media only screen and (min-width: 768px) {
      .recipes {
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      }
    }

    @media only screen and (min-width: 1024px) {
      .recipes {
        grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
      }
    }

    @media only screen and (min-width: 1280px) {
      .recipes {
        grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
      }
    }

    @media only screen and (min-width: 1440px) {
      .recipes {
        grid-template-columns: repeat(auto-fill, minmax(650px, 1fr));
      }
    }

    @media only screen and (min-width: 1600px) {
      .recipes {
        grid-template-columns: repeat(auto-fill, minmax(750px, 1fr));
      }
    }

    @media only screen and (min-width: 1920px) {
      .recipes {
        grid-template-columns: repeat(auto-fill, minmax(850px, 1fr));
      }
    }

</style>