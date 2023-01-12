<script lang="ts">
import { createSearchStore, searchHandler } from '$lib/stores/search';
import PocketBase from 'pocketbase';
import { onDestroy, onMount } from 'svelte';

const pb = new PocketBase('http://127.0.0.1:8090');

import type { PageData } from "./$types"
export let data: PageData;

let recipes: Array<any> = []
let ingredients: Array<any> = []
let mQty: Array<any> = []
let mUnit: Array<any> = []
let ingGroup: Array<any> = []

    
    onMount(async () => {
        recipes = await data.lists.recipes
        recipes.sort((a, b) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            if (titleA < titleB) {
                return -1
            }
            if (titleA > titleB) {
                return 1
            }
            return 0
        })
        ingredients = await data.lists.ingList
        ingredients.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }

        return 0
    })
        mQty = await data.lists.mQty
        mQty.sort((a, b) => (a.qty_amount - b.qty_amount))
        mUnit = await data.lists.mUnit
        mUnit.sort((a, b) => {
        const nameA = a.measurement_description.toUpperCase();
        const nameB = b.measurement_description.toUpperCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }

        return 0
    })
        ingGroup = await data.lists.ingGroup
        ingGroup.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }

        return 0
    })
    })
    
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


async function addToRecipe() {
    
    (formData.ing_group || formData.ingredient_id || formData.measurement_id || formData.measurement_qty || formData.recipe_id !== "" 
    ? await pb.collection('recipe_ingredients').create(formData)
    : console.log("empty fields") 
    )

    formData.ingredient_id = ""
    $searchStore.search = ""
}

async function createIng() {
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
            {#each recipes as recipe (recipe.id)}
            <option value={recipe.id}>{recipe.title}</option>
            {/each}
        </select>
    </div>
    
    <div>
        <input type="search" placeholder="Ingredient..." bind:value={$searchStore.search}> 
        <select bind:value={formData.ingredient_id} name="" id="">
            {#if $searchStore.search.length < 2}
            {#each ingredients as ingredient (ingredient.id)}
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
            {#each mQty as qty (qty.id)}
                <option value={qty.id}>{qty.qty_amount}</option>
            {/each}
        </select>
    </div>

    <div>
        <input bind:value={formData.measurement_id} type="text" name="" id="">
        <select bind:value={formData.measurement_id} name="" id="">
            {#each mUnit as unit (unit.id)}
                <option value={unit.id}>{unit.measurement_description}</option>
            {/each}
        </select>
    </div>

        <div>
            <input bind:value={formData.ing_group} type="text" name="" id="">
                <select bind:value={formData.ing_group} name="" id="">
            {#each ingGroup as group (group.id) }
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