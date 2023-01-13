<script lang="ts">
	import { onMount } from "svelte";

  /** @type {import('./$types').PageData} */  export let data: any;
 
let recipe: any = {}
let ingredients: any = []
let ingredientGroups: any[] = []
let uniqueIngredientItem: any[] = []

onMount(async () => {
    recipe = await JSON.parse(data.recipe);
    ingredients = await JSON.parse(data.ingredients);
    ingredients.forEach((ing: any) => {
        ingredientGroups.push([ing.expand.ing_group.name, ing.expand.ingredient_id.name]);
    });
    uniqueIngredientItem = ingredientGroups.filter((i) => {
        return !uniqueIngredientItem.includes(i[0]);
    });
});
 
</script>

  <div class="recipe">
   <div>
    <section>
     <img src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=500x500`} alt={recipe.name}>
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
  </section>

  <section>
    <section>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
    </section>

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

/* Set the background color and font for the entire recipe */
.recipe {
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
  display: flex;
  flex-wrap: wrap;
}

/* Style the recipe image */
.recipe img {
  width: 100%; /* Make the image responsive */
  height: auto; /* Keep the aspect ratio of the image */
  border: 1px solid #ccc; /* Add a border to the image */
  object-fit: cover;
  max-width: 350px;
  margin-right: 15px;
}

/* Style the ingredients section */
.recipe .ingredients {
  margin-top: 20px; /* Add some margin to the top of the section */
  flex: 1;
}

/* Style the ingredients table */
.recipe .ingredients table {
  width: 100%; /* Make the table responsive */
  border-collapse: collapse; /* Remove the default spacing between table cells */
}

/* Style the table headings */
.recipe .ingredients th {
  background-color: #333; /* Set the background color of the headings */
  color: #fff; /* Set the text color of the headings */
  font-weight: bold; /* Make the headings bold */
  text-align: left; /* Align the text to the left */
  padding: 10px; /* Add some padding to the headings */
}

/* Style the table rows */
.recipe .ingredients tr {
  border-bottom: 1px solid #ccc; /* Add a bottom border to the rows */
}

/* Style the table cells */
.recipe .ingredients td {
  padding: 10px; /* Add some padding to the cells */
}

/* Style the recipe title */
.recipe h2 {
  color: #333; /* Set the text color */
  margin-top: 20px; /* Add some margin to the top of the title */
  font-size: 2.5em;
}

/* Style the recipe description */
.recipe p {
  color: #666; /* Set the text color */
  margin-top: 10px; /* Add some margin to the top of the description */
  font-size: 1.2em;
  line-height: 1.5;
}

/* Style the instructions section */
.recipe .howto {
  margin-top: 20px; /* Add some margin to the top of the section */
  flex: 1;
}

/* Style the instruction titles */
.recipe .howto h3 {
  color: #333; /* Set the text color */
  margin-top: 20px; /* Add some margin to the top of the title */
  font-size: 1.5em;
  text-decoration: underline;
}

/* Style the instruction descriptions */
.recipe .howto p {
  color: #666; /* Set the text color */
  margin-top: 10px; /* Add some margin to the top of the description */
  font-size: 1.2em;
  line-height: 1.5;
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

/* Style the tags section */
.tags {
  margin-top: 20px; /* Add some margin to the top of the section */
  display: flex;
  flex-wrap: wrap;
}

/* Style the tags */
.tags p {
  background-color: #f5f5f5; /* Set the background color of the tags */
  color: #333; /* Set the text color of the tags */
  padding: 10px; /* Add some padding to the tags */
  margin: 5px; /* Add some margin to the tags */
  font-size: 1.2em; /* Set the font size of the tags */
  border-radius: 5px; /* Make the tags rounded */
}

</style>