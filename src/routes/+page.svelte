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



<div class="hero">
    <div class="hero-image">
      <form class="search-form" on:submit|preventDefault>
        <input type="search" placeholder="Search..." bind:value={$searchStore.search}> 
     </form>
    </div>
</div>

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



 <a href="/recipes"><button>recipes</button></a>
    

<style>

a {
  color: inherit;
  text-decoration: none;
}

input {
  padding: 10px;
  font-size: 17px;
  border: 1px solid #d88d0a;
  float: left;
  width: 50%;
  border-radius: 10px;
}

input:focus {
  outline: none;
  border: 1px solid #d88d0a;
  box-shadow: 0 0 5px #d88d0a;
}

button {
  border-radius: 0 10px 10px 0;
  float: left;
  width: 20%;
  padding: 10px;
  background: #d88d0a;
  color: white;
  font-size: 17px;
  border: 1px solid #d88d0a;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
}


.search-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  border-radius: 50px;
}


.hero-image {
  background-image: url("/images/recipes-for-sara-bigpic.jpg"); /* The image used */
  background-color: #cccccc; /* Used if the image is unavailable */
  height: 500px; /* You must set a specified height */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}

</style>