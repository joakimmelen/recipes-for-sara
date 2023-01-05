<script lang="ts">
	import { onMount } from "svelte";

  /** @type {import('./$types').PageData} */  export let data: any;
  let recipe: any = {}
  onMount(() => {
    recipe = JSON.parse(data.recipe)
  })
 
</script>

<div class="recipes">

   
   <div class="recipe">
    <div>
        <button on:click={() => console.log(recipe.title)}>hueuhe</button>
            <img src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=500x500`} alt={recipe.name}>
        <h2>{recipe.title}</h2>
        <p>{recipe.description}</p> 
    </div>
   </div>
</div>

<style>
    .recipes {
        display: flex;
        gap: 10px;
    }
</style>