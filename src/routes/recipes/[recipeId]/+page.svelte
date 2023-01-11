<script lang="ts">
	import { onMount } from "svelte";

  /** @type {import('./$types').PageData} */  export let data: any;
  let recipe: any = {}
  let ingredients: any = []
  let ing_groups: any = [{item: "", ingredients: []}]

  onMount(async () => {
    recipe = await JSON.parse(data.recipe)
    ingredients = await JSON.parse(data.ingredients)
    // ing_groups = await [...new Set(ingredients.expand.ing_groups)]
  
  })

  function tjingaling() {

    
  }

  function plingpling() {
    
  }

 
</script>


  <div class="recipe">
   <div>
    <section>
     <img src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=500x500`} alt={recipe.name}>
     <section class="ingredients">

      <button on:click={tjingaling}>x</button>
      <button on:click={plingpling}>ea</button>
      <table>
        <thead>
          {#if recipe.expand}
            
          {#each recipe.expand.ing_group as group (group.id)}
          
          <tr>
            <th colspan="2">{group.name}</th>
          </tr>
          {/each}
          {/if}
          
        </thead>
        {#each ingredients as ingredient (ingredient.id)}
        <tbody>
          
          <tr>
                <!-- <td>{ingredient.expand.ingredient_id.name}</td>
                {#if ingredient.expand.measurement_id}
                <td>{ingredient.expand.measurement_qty.qty_amount} {ingredient.expand.measurement_id.measurement_description}</td>
                {:else}  <td>{ingredient.expand.measurement_qty.qty_amount}</td>
                {/if} -->
            </tr>
          </tbody>
          {/each}
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
     <section class="tags">
      {#if recipe.expand}
      
      {#each recipe.expand.cuisine as tags (tags.id)}
        <p>{tags.tag}</p>
      {/each}
        
      {/if}
      
    </section>
     
   </div>
  </div>



<style>
    .recipe {
        display: flex;
        gap: 10px;
    }
</style>