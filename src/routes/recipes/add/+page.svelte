<script lang="ts">
import { createSearchStore, searchHandler } from '$lib/stores/search';
import PocketBase from 'pocketbase';
import { onDestroy, onMount } from 'svelte';

const RECIPE_DB_URL = 'http://127.0.0.1:8090';
const pb = new PocketBase(RECIPE_DB_URL);

import type { PageData } from "./$types"
export let data: PageData;

let recipeList: Array<any> = []
let ingredientList: Array<any> = []
let measurementQty: Array<any> = []
let measurementUnit: Array<any> = []
let ingredientGroup: Array<any> = []

onMount(async () => {
    sortByProperty(recipeList, 'title')
    ingredientList = await data.lists.ingList
    sortByProperty(ingredientList, 'name')
    measurementQty = await data.lists.mQty
    sortMeasurementQty(measurementQty)
    measurementUnit = await data.lists.mUnit
    sortByProperty(measurementUnit, 'measurement_description')
    ingredientGroup = await data.lists.ingGroup
    sortByProperty(ingredientGroup, 'name')
    recipeList = await data.lists.recipes
})
    
// function to sort an array of objects by a specific property
function sortByProperty(array: any, property: any) {
    array.sort((a: any, b: any) => {
        const valueA = a[property].toUpperCase();
        const valueB = b[property].toUpperCase();
        if (valueA < valueB) {
            return -1
        }
        if (valueA > valueB) {
            return 1
        }
        return 0
    })
}

// function to sort an array of measurement quantities by their amount
function sortMeasurementQty(measurementQty: any) {
    measurementQty.sort((a: any, b: any) => (a.qty_amount - b.qty_amount))
}

const searchIngredients = data.lists.ingList.map((ing: any) => (
    {
    ...ing,
    searchTerms: `${ing.name}`
    }))

const searchStore = createSearchStore(searchIngredients)
const unsubscribe = searchStore.subscribe((model) => searchHandler(model))
    
onDestroy(() => {
    unsubscribe();
    })

const formData = {
    "recipe_id": "",
    "ingredient_id": "",
    "measurement_qty": "",
    "measurement_id": "",
    "ing_group": ""
};

const isFormDataValid = () => {
  return formData.ing_group || formData.ingredient_id || formData.measurement_id || formData.measurement_qty || formData.recipe_id !== ""
}

const addToRecipe = async () => {
  if (isFormDataValid()) {
    await pb.collection('recipe_ingredients').create(formData);
  } else {
    console.log("invalid form data");
  }
  formData.ingredient_id = "";
  $searchStore.search = "";
}

const createIng = async () => {
  const data = {
    "name": $searchStore.search
  }
  await pb.collection('ingredients').create(data);
}

</script>

<form on:submit|preventDefault>
</form>
<div class="inputs">
   
    
    <div>
        <input bind:value={formData.recipe_id} type="text" name="" id="">
        <select bind:value={formData.recipe_id} name="recipe" id="recipe">
            {#each recipeList as recipe (recipe.id)}
            <option value={recipe.id}>{recipe.title}</option>
            {/each}
        </select>
    </div>
    
    <div>
        <input type="search" placeholder="Ingredient..." bind:value={$searchStore.search}> 
        <select bind:value={formData.ingredient_id} name="" id="">
            {#if $searchStore.search.length < 2}
            {#each ingredientList as ingredient (ingredient.id)}
            <option on:click={() => formData.ingredient_id = ingredient.id} value={ingredient.id}>{ingredient.name}</option>    
            {/each}
            {:else}
            {#each $searchStore.filtered as ingredient (ingredient.id)}
            <option on:click={() => formData.ingredient_id = ingredient.id} value={ingredient.id}>{ingredient.name}</option>
            {/each}
            
            
            {/if}
        </select>
       <button on:click={createIng}>Add new</button>
    </div>
    
    
    <div>
        <input bind:value={formData.measurement_qty} type="text" name="" id="">
        <select bind:value={formData.measurement_qty} name="" id="">
            {#each measurementQty as qty (qty.id)}
                <option value={qty.id}>{qty.qty_amount}</option>
            {/each}
        </select>
    </div>

    <div>
        <input bind:value={formData.measurement_id} type="text" name="" id="">
        <select bind:value={formData.measurement_id} name="" id="">
            {#each measurementUnit as unit (unit.id)}
                <option value={unit.id}>{unit.measurement_description}</option>
            {/each}
        </select>
    </div>

        <div>
            <input bind:value={formData.ing_group} type="text" name="" id="">
                <select bind:value={formData.ing_group} name="" id="">
            {#each ingredientGroup as group (group.id) }
                <option value={group.id}>{group.name}</option>
            {/each}
                </select>
        </div>

        <button on:click={addToRecipe} >add</button>
</div>


<style>

.inputs {
    display: flex;
    flex-direction: column;
    width: 30vw;
    gap: 30px;
}

div {
    display: flex;
}

form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-width: 50vw;
    padding-bottom: 30px;
}
button {
    color: whitesmoke;
    background-color: brown;
}

</style>