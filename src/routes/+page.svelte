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
  background-color: #4caf4f4e;
}

.header {
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  background-image: url("/images/ella-olsson-7EhPbdAQG-s-unsplash.jpg");
  background-color: #4CAF50;
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

.main {
  grid-area: main;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.main .recipe {
  border: 1px solid gold;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  width: 20vw;
  text-align: center;
}

.main a {
  color: inherit;
  text-decoration: none;
}

.footer {
  grid-area: footer;
  text-align: center;
}

/* Style the back button */
a button {
  background-color: #4CAF50; /* Set the background color of the button */
  color: white; /* Set the text color of the button */
  padding: 14px 20px; /* Add some padding to the button */
  margin: 8px 0; /* Add some margin to the button */
  border: none; /* Remove the default border of the button */
  cursor: pointer; /* Change the cursor to a pointer when hovering over the button */
  width: 100%; /* Make the button responsive */
  font-size:1.5em;
}

a button:hover {
    background-color: #3e8e41;
}

a button:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}

a .recipe:hover {
  background-color: rgba(255, 255, 255, 0.398);
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