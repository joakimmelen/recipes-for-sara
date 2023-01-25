<script lang="ts">
	import { onDestroy } from 'svelte';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import type { Recipe } from '../interfaces';

	/** @type {import('./$types').PageData} */ export let data: any;

	const searchRecipes = data.lists.recipeList.map((recipe: Recipe) => ({
		...recipe,
		searchTerms: `${recipe.title}, ${recipe.description}, ${recipe.instructions1_title}, ${
			recipe.instructions1_desc
		}, ${recipe.instructions2_title}, ${recipe.instructions2_desc}, ${
			recipe.instructions3_title
		}, ${recipe.instructions3_desc}, ${recipe.instructions4_title}, ${recipe.instructions4_desc}, ${
			recipe.instructions5_title
		}, ${recipe.instructions5_desc}, ${recipe.expand.cuisine}, ${recipe.expand.cuisine.map(
			(cuz: any) => cuz.tag
		)}`
	}));
	const searchStore = createSearchStore(searchRecipes);
	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<svelte:head>
	<title>Recept för Sara - En passionerad samling av recept</title>
</svelte:head>

<div class="wrapper">
	<form class="search-form" on:submit|preventDefault>
		<input
			class="search-input"
			type="search"
			placeholder="Search..."
			bind:value={$searchStore.search}
		/>
	</form>
	<div class="recipes">
		{#if $searchStore.filtered == undefined}
			{#each data.lists.recipeList as recipe (recipe.id)}
				<a href={`/recipes/${recipe.id}`}>
					<div class="recipe">
						<img
							width="50"
							src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}`}
							alt={recipe.name}
						/>
						<h1>{recipe.title}</h1>
					</div>
				</a>
			{/each}
		{:else}
			<div class="search-grid">
				{#each $searchStore.filtered as recipe}
					<a href={`/recipes/${recipe.id}`}>
						<div class="recipe">
							<img
								width="50"
								src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}`}
								alt={recipe.title}
							/>
							<h1>{recipe.title}</h1>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	a {
		text-decoration: none;
	}

	a:visited {
		color: inherit;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 40px;
	}

	.recipe {
		border-radius: 1rem;
		overflow: hidden;
		transition: all 0.3s ease-in-out;
		cursor: pointer;
		position: relative;
		z-index: 1;
		margin-bottom: 10px;
		width: 95vw;
		max-width: 500px;
		height: 20vh;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.recipe img {
		width: 100%;
		transition: all 0.3s ease-in-out;
	}

	.recipe:hover img {
		transform: scale(1.2);
	}

	.recipe h1 {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-size: 2rem;
		z-index: 3;
		transition: all 0.3s ease-in-out;
	}

	.recipe:hover h1 {
		transform: translate(-50%, -50%) scale(1.2);
	}

	.search-input {
		position: fixed;
		left: 0;
		font-size: 1.5rem;
		width: 100vw;
		z-index: 50;
	}

	@media (min-width: 768px) {
		/* .wrapper {
			border: 5px solid orange;
		}
		.recipes {
			border: 5px solid red;
		} */

		.recipe {
			height: 30vh;
		}
	}
</style>
