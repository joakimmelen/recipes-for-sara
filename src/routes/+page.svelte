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
      <img src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=250x250`} alt={recipe.name}>
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
  background-color: rgb(212, 212, 212);
}

.header {
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  border-radius: 50px;
  background-image: url("/images/tom-hermans-nM6qrtnVKn8-unsplash.jpg");
  background-color: rgba(209, 8, 8, 0.808);
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
  border: 1px solid greenyellow;
  border-radius: 10px;
  width: 50vw;
}

.header input:focus {
  outline: none;
  border: 1px solid gold;
  box-shadow: 0 0 10px gold;
}

.footer button {
  border-radius: 0 10px 10px 0;
  padding: 10px;
  background: #d88d0a;
  color: white;
  font-size: 17px;
  border: 1px solid #d88d0a;
  border-left: none;
  cursor: pointer;
}

.main {
  grid-area: main;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.main .recipe {
  border: 1px solid gold;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  min-height: 40vh;
}

.main a {
  color: inherit;
  text-decoration: none;
}

.footer {
  grid-area: footer;
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .grid-container {
    grid-template-areas: 
    "header"
    "main"
    "footer"
    ;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }

  .main {
    grid-template-columns: 1fr;
  }

  .recipe {
    min-height: auto;
  }

  .search-form {
    height: auto;
  }

  header {
    height: 200px;
  }
}


</style>