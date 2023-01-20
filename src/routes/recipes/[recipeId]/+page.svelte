<script lang="ts">
import Social from "$lib/Social.svelte";
import { onMount } from "svelte";

  /** @type {import('./$types').PageData} */  export let data: any;
 
let recipe: any = {}
let ingredients: any = []
let ingredientGroups: any[] = []
let uniqueIngredientItem: any[] = []
let isLoading: boolean = true
let titleHead: string;

onMount(async () => {
    try {
      recipe = await JSON.parse(data.recipe);
      titleHead = await recipe.title
      ingredients = await JSON.parse(data.ingredients);
      ingredients.forEach((ing: any) => {
          ingredientGroups.push([ing.expand.ing_group.name, ing.expand.ingredient_id.name]);
      });
      uniqueIngredientItem = ingredientGroups.filter((i) => {
          return !uniqueIngredientItem.includes(i[0]);
      });
      isLoading = false;
    } catch(err) {
      console.log(err);
    }
  });
</script>

<svelte:head>
	<title>{titleHead}</title>
</svelte:head>

<div class="container">
  {#if isLoading}
    <div>Loading...</div>
  {:else}

  <div class="recipe">
    <div class="recipe-card">
      {#if recipe.rating}
      <div class="recipe-rating">
        <img src="../favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 1 ? (recipe.rating < 1.5 ? 0.5 : 1) : 0.1}`}/>
        <img src="../favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 2 ? (recipe.rating < 2.5 ? 0.5 : 1) : 0.1}`}/>
        <img src="../favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 3 ? (recipe.rating < 3.5 ? 0.5 : 1) : 0.1}`}/>
        <img src="../favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 4 ? (recipe.rating < 4.5 ? 0.5 : 1) : 0.1}`}/>
        <img src="../favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 5 ? 1 : 0.1}`}/>
      </div>
    {/if}   
      <img src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=500x500`} alt={recipe.name}>
      <div class="recipe-info">
        <h2>{recipe.title}</h2>
        <p>{recipe.description}</p>
      </div>
    </div>
    <section class="ingredients">
      <table>
        {#if recipe.expand}
          {#each recipe.expand.ing_group as group (group.id)}
            <thead>
              <tr>
                <th colspan="2">{group.name}</th>
              </tr>
            </thead>
            <tbody>
              {#each ingredients as ingredient (ingredient.id)}
                {#if ingredient.expand.ing_group.name === group.name}
                  <tr>
                    <td>{ingredient.expand.ingredient_id.name}</td>
                    {#if ingredient.expand.measurement_id}
                      <td>{ingredient.expand.measurement_qty.qty_amount} {ingredient.expand.measurement_id.measurement_description}</td>
                    {:else if ingredient.expand.measurement_qty}
                      <td>{ingredient.expand.measurement_qty.qty_amount}</td>
                    {/if}
                  </tr>
                {:else}
                  <td></td>
                {/if}
              {/each}
            </tbody>
          {/each}
        {/if}
      </table>
    </section>
    <section class="howto">
      <h3>{recipe.instructions1_title}</h3>
      <p>{recipe.instructions1_desc}</p>
      <p>{recipe.instructions1_desc1}</p>
      <p>{recipe.instructions1_desc2}</p>
      <p>{recipe.instructions1_desc3}</p>
      <p>{recipe.instructions1_desc4}</p>
      <p>{recipe.instructions1_desc5}</p>
      <h3>{recipe.instructions2_title}</h3>
      <p>{recipe.instructions2_desc}</p>
      <p>{recipe.instructions2_desc1}</p>
      <p>{recipe.instructions2_desc2}</p>
      <p>{recipe.instructions2_desc3}</p>
      <p>{recipe.instructions2_desc4}</p>
      <p>{recipe.instructions2_desc5}</p>
      <h3>{recipe.instructions3_title}</h3>
      <p>{recipe.instructions3_desc}</p>
      <p>{recipe.instructions3_desc1}</p>
      <p>{recipe.instructions3_desc2}</p>
      <p>{recipe.instructions3_desc3}</p>
      <p>{recipe.instructions3_desc4}</p>
      <p>{recipe.instructions3_desc5}</p>
      <h3>{recipe.instructions4_title}</h3>
      <p>{recipe.instructions4_desc}</p>
      <p>{recipe.instructions4_desc1}</p>
      <p>{recipe.instructions4_desc2}</p>
      <p>{recipe.instructions4_desc3}</p>
      <p>{recipe.instructions4_desc4}</p>
      <p>{recipe.instructions4_desc5}</p>
  </section>
  <a href="/recipes"><button>Tillbaka till recept</button></a>
  <section class="tags">
        {#if recipe.expand}
        {#each recipe.expand.cuisine as tags (tags.id)}
          <p>{tags.tag}</p>
        {/each}
        {/if}
      </section>
    </div>
  
    <div class="social">
      <Social />
    </div>
  
  {/if}
</div>

<style>

.social {
  margin: 0 2vw 2vh 2vw; 
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.recipe {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: #fff;
  margin: 20px 0;
}

.recipe h2 {
  flex: 1 1 100%;
  text-align: center;
  font-size: 2em;
  margin-bottom: 10px;
}

.recipe img {
  flex: 1 1 100%;
  max-width: 100%;
  margin-bottom: 10px;
}

.recipe p {
  flex: 1 1 100%;
  text-align: center;
  font-size: 1.2em;
}

/* Media queries for different screen sizes */
@media (min-width: 600px) {
  .social {
    width: 80vw;
  }
}

</style>