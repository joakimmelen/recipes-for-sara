<script lang="ts">
	import { onMount } from "svelte";

  /** @type {import('./$types').PageData} */  export let data: any;
  let recipe: any = {}
  let ingredients: any = []

  onMount(() => {
    recipe = JSON.parse(data.recipe)
    ingredients = JSON.parse(data.ingredients)
  
  })
 
</script>


  <div class="recipe">
   <div>
    <section>
     <img src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=500x500`} alt={recipe.name}>
     <section class="ingredients">
      <table>
        <thead>
          <tr>
            <th colspan="2">Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {#each ingredients as ingredient (ingredient.id)}
          <tr>
                <td>{ingredient.expand.ingredient_id.name}</td>
                {#if ingredient.expand.measurement_id}
                <td>{ingredient.expand.measurement_qty.qty_amount} {ingredient.expand.measurement_id.measurement_description}</td>
                {:else}  <td>{ingredient.expand.measurement_qty.qty_amount}</td>
                {/if}
            </tr>
           {/each}
        </tbody>
    </table>
    </section>
  </section>
     <h1>{recipe.title}</h1>
     <p>{recipe.description}</p> 
    



     <section class="howto">
      <h3>{recipe.instructions1_title}</h3>
      <p>{recipe.instructions1_desc}</p>
      <h3>{recipe.instructions2_title}</h3>
      <p>{recipe.instructions2_desc}</p>
      <h3>{recipe.instructions3_title}</h3>
      <p>{recipe.instructions3_desc}</p>
     </section>

     <a href="/recipes"><button>back</button></a>
   </div>
  </div>



<style>
    .recipe {
        display: flex;
        gap: 10px;
    }
</style>