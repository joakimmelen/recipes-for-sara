<script lang="ts">
    import {onMount} from "svelte"

  /** @type {import('./$types').PageData} */  export let data: any;


    let recipes: any = []
    let ingredients: any = []
    let measurements_unit: any = []
    let measurements_qty: any = []
    let recipe_ingredients: any = []

    onMount(async () => {
        console.log(data)
        // ingredients = data.ingList.items
        // recipes = data.resultList.items
        // measurements_unit = data.unitList.items
        // measurements_qty = data.qtyList.items
        // recipe_ingredients = data.rcpIngList.items

    })
</script>

<div class="recipes">
    {#each recipes as recipe (recipe.id)}
    
        <div class="recipe">
         <div>
            
            <img src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=250x250`} alt="">
            <p class="recipe-name">
                {recipe.title} 
                {#each ingredients as ingredient (ingredient.id)}
                    <p>
                        {ingredient.name}
                    </p>
                {/each}
            </p>
         </div>
        </div>
    {/each}
</div>

<style>
    .recipes {
        display: flex;
        gap: 10px;
    }
</style>