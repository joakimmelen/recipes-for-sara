<script lang="ts">
import { page } from "$app/stores";
	import type { ListResult } from "pocketbase";
import type { Comments, Recipe } from "src/routes/interfaces";
import { onMount } from "svelte";
import { currentUser, pb } from "./pocketbase";

let commentsList: Array<any> = []
let currentRecipe: Recipe

onMount(async () => {
    currentRecipe = JSON.parse($page.data.recipe)
    let loadList = await pb.collection("social")
    .getList(1, 50, {
        filter: `recipe = "${currentRecipe}"`,
        expand: 'comment'
    }, );
    commentsList = loadList
});

    </script>
    {#if commentsList}
    {#each commentsList as comment}
    {#if comment.expand}
        <p>{comment.expand.comment.message}</p>
    {/if}
    {/each}
    {/if}
   <button on:click={() => console.log(currentRecipe.id)}>LOG IT</button>
   