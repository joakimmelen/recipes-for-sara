<script lang="ts">
    import {onMount, onDestroy} from "svelte"
    import {currentUser, pb} from "./pocketbase"

    let recipes: any = []

    onMount(async () => {
        const resultList = await pb.collection("recipes").getList(1, 50, {
            sort: "created",
            expand: "user"
        })
        recipes = resultList.items
        console.log(resultList.items)
    })
</script>

<div class="recipes">
    {#each recipes as recipe (recipe.id)}
    
        <div class="recipe">
         <div>
            <p class="recipe-name">
                {recipe.title} by {recipe.user.name}
            </p>
         </div>
        </div>
    {/each}
</div>