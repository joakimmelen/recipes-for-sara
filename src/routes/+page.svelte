<script lang="ts">
import { createSearchStore, searchHandler } from "$lib/stores/search";
import { onDestroy } from "svelte";

import type { PageData } from "./$types"
export let data: PageData;

// map recipeList to searchRecipes and add searchTerms property
const searchRecipes = data.lists.recipeList.map((recipe: any) => (
    {
    ...recipe,
    searchTerms: `${recipe.title}, ${recipe.description}, ${recipe.instructions1_title}, ${recipe.instructions1_desc}, ${recipe.instructions2_title}, ${recipe.instructions2_desc}, ${recipe.instructions3_title}, ${recipe.instructions3_desc}, ${recipe.instructions4_title}, ${recipe.instructions4_desc}, ${recipe.instructions5_title}, ${recipe.instructions5_desc}, ${recipe.expand.cuisine}, ${recipe.expand.cuisine.map((cuz: any) => cuz.tag)}`
}))

// create search store and subscribe to it
const searchStore = createSearchStore(searchRecipes)
const unsubscribe = searchStore.subscribe((model) => searchHandler(model))

// unsubscribe on component destruction
onDestroy(() => {
  unsubscribe();
})

</script>

<div class="grid-container">
  
  <header class="header">
    <form class="search-form" on:submit|preventDefault>
      <h2>Find your recipe</h2>
      <input type="search" placeholder="Search..." bind:value={$searchStore.search}>
    </form>
  </header>
  
  <main class="main">
    {#each $searchStore.filtered as recipe}
    <a href={`/recipes/${recipe.id}`}>
    <div class="recipe">
      <img class="recipe-img" src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=500x500`} alt={recipe.title}>
      <h1>{recipe.title} </h1>
      {#if recipe.rating}
      <div class="recipe-rating">
        <img src="favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 1 ? 1 : 0.2}`}/>
        <img src="favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 2 ? 1 : 0.2}`}/>
        <img src="favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 3 ? 1 : 0.2}`}/>
        <img src="favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 4 ? 1 : 0.2}`}/>
        <img src="favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 5 ? 1 : 0.2}`}/>
      </div>
      {/if}
    </div>
    </a>
    {/each}
  </main>
  
  <footer class="footer">
   <a href="/recipes"><button>recipes</button></a>
  </footer>
  
</div>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Grid container for the layout of the page */
.grid-container {
  display: grid;
  gap: 10px;
  background-color: #f5f5f5;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas: 
    "header"
    "main"
    "footer";
  min-height: 100vh;
  position: relative;
}

/* Header styles */
header {
  color: var(--secondary-text-color);
  font-size: calc(2rem + (1.1vw - 6px));
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  border: 2px solid var(--secondary-color);
  padding: 20px;
  text-align: center;
  justify-content: center;
  margin-top: 30px;
}

header .search-form {
  width: 100%;
}

header .search-form input[type="search"] {
  width: 80%;
  max-width: 900px;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid var(--primary-color);
  border-radius: 30px;
  font-size: 16px;
}

header .search-form input[type="search"]:hover {
  box-shadow: 0 0 8px 0 var(--primary-color);
}
header .search-form input[type="search"]:focus {
  border: 2px solid var(--secondary-color);
}

/* Main content styles */
main {
  grid-area: main;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

/* Recipe styles */
.recipe {
  flex: 1 0 300px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  margin: 20px;
  max-width: 400px;
}

.recipe:hover {
  transform: translate(0, -20px);
  box-shadow: 0 10px 24px 0px rgba(0,0,0,0.02), 0 8px 20px -2px rgba(0,0,0,0.06), 0 6px 10px -6px rgba(0,0,0,0.10);
}

/* Recipe image styles */
.recipe img {
  width: 100%;
  height: auto;
  margin-right: 20px;
}

/* Recipe rating styles */
.recipe-rating {
  display: flex;
  align-items: center;
}

.recipe-rating img {
  width: 20px;
  height: 20px;
}

/* Footer styles */
footer {
  grid-area: footer;
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
}

/* Media queries for different screen sizes */
@media (min-width: 600px) {
  /* 4 columns on big screens */
  .grid-container {
    grid-template-rows: auto;
  }

  /* Recipe image styles */
  .recipe-img {
    width: 150px;
    height: 150px;
  }
  header {
    background-image: url('/images/ella-olsson-7EhPbdAQG-s-unsplash.jpg');
    background-size: cover;
    background-position: center;
    height: 30vh;
}
  header input {
    background: linear-gradient(to right, #ffffff, rgb(255, 255, 255), #fff4e8, var(--secondary-color));
  }
}
</style>