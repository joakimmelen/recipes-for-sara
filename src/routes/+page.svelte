<script lang="ts">
import { createSearchStore, searchHandler } from "$lib/stores/search";
import { onDestroy } from "svelte";

import type { PageData } from "./$types"
export let data: PageData;

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

<div class="grid-container">
  
  <header class="header">
    <form class="search-form" on:submit|preventDefault>
      <input type="search" placeholder="Search..." bind:value={$searchStore.search}>
    </form>
  </header>
  
  <main class="main">
    {#each $searchStore.filtered as recipe}
    <a href={`/recipes/${recipe.id}`}>
    <div class="recipe">
      <img src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=500x500`} alt={recipe.title}>
      <h1>{recipe.title} </h1>
    </div>
    </a>
    {/each}
  </main>
  
  <footer class="footer">
   <a href="/recipes"><button>recipes</button></a>
  </footer>
  
</div>

<style>

.grid-container {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "footer";
  gap: 10px;
  background-color: var(--background-color);
}

.header {
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  background-image: url("/images/ella-olsson-7EhPbdAQG-s-unsplash.jpg");
  background-color: var(--primary-color);
  background-repeat: no-repeat;
  background-size: cover;
}

.header form {
  display: flex;
  justify-content: center;
  align-items: center;
 
}

.header input {
  padding: 10px;
  font-size: 17px;
  border: 1px solid var(--secondary-color);
  border-radius: 10px;
  width: 50vw;
}

.header input:focus {
  outline: none;
  border: 1px solid var(--secondary-color);
  box-shadow: 0 0 10px var(--secondary-color);
}

.main {
  grid-area: main;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  color: var(--text-color);
  background-color: var(--background-color);
}

.main .recipe {
  border: 1px solid var(--secondary-color);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  width: 20vw;
  text-align: center;
}

.recipe:hover {
  transform: scale(1.05);
  z-index: 2;
}

.recipe img {
  width: 100%;
  height: 15vh;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
}

.main a {
  color: inherit;
  text-decoration: none;
}

.footer {
  grid-area: footer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
}

.footer button {
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Add hover effect */
.footer button:hover {
  background-color: var(--secondary-color-hover);
}

/* Make the images responsive */
img {
  max-width: 100%;
  height: auto;
}

/* Make the grid responsive */
@media (max-width: 600px) {
  .grid-container {
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  /* Reduce the font size of the search input */
  .header input {
    font-size: 14px;
    width: 80%;
  }

  /* Reduce the size of the recipe cards */
  .main .recipe {
    width: 90%;
  }

  /* Stack the recipe cards vertically */
  .main {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
  }
}


</style>