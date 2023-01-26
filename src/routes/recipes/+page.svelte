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
			placeholder="Sök på recept.."
			bind:value={$searchStore.search}
		/>
	</form>
	<div class="main">
		{#each $searchStore.filtered as recipe}
			<a href={`/recipes/${recipe.id}`}>
				<div class="recipe">
					<img
						class="recipe__img"
						width="50"
						src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}`}
						alt={recipe.title}
					/>
					<h1 class="recipe__title">{recipe.title}</h1>
					{#if recipe.rating}
						<div class="recipe__rating">
							<img
								class="recipe__rating__img"
								src="favicon.ico"
								alt="Avocado icon"
								width="20px"
								height="20px"
								style={`opacity: ${recipe.rating >= 1 ? (recipe.rating < 1.5 ? 0.5 : 1) : 0.1}`}
							/>
							<img
								class="recipe__rating__img"
								src="favicon.ico"
								alt="Avocado icon"
								width="20px"
								height="20px"
								style={`opacity: ${recipe.rating >= 2 ? (recipe.rating < 2.5 ? 0.5 : 1) : 0.1}`}
							/>
							<img
								class="recipe__rating__img"
								src="favicon.ico"
								alt="Avocado icon"
								width="20px"
								height="20px"
								style={`opacity: ${recipe.rating >= 3 ? (recipe.rating < 3.5 ? 0.5 : 1) : 0.1}`}
							/>
							<img
								class="recipe__rating__img"
								src="favicon.ico"
								alt="Avocado icon"
								width="20px"
								height="20px"
								style={`opacity: ${recipe.rating >= 4 ? (recipe.rating < 4.5 ? 0.5 : 1) : 0.1}`}
							/>
							<img
								class="recipe__rating__img"
								src="favicon.ico"
								alt="Avocado icon"
								width="20px"
								height="20px"
								style={`opacity: ${recipe.rating >= 5 ? 1 : 0.1}`}
							/>
						</div>
					{/if}
				</div>
			</a>
		{/each}
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

	.main {
		margin: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 1200px;
	}

	.recipe {
		border: 1px solid var(--dark);
		padding: 5px;
		box-shadow: 0 3px 5px var(--dark);
		display: flex;
		flex-direction: column;
		border-radius: 5px;
		height: 35vh;
		justify-content: flex-start;
	}

	.recipe__img {
		width: 100%;
		height: 20vh;
		object-fit: cover;
	}

	.recipe__rating {
		display: flex;
		align-items: center;
		gap: 3px;
		margin: 0 0 10px 0px;
	}

	.recipe__rating img {
		width: 20px;
		height: 20px;
	}

	.recipe h1 {
		border-top: 1px solid var(--light);
		margin: 5px 0;
		font-size: 1.7rem;
	}

	.search-input {
		padding: 10px;
		font-size: 1.2rem;
		border-radius: 5px;
		border: none;
		width: 70vw;
		max-width: 600px;
		margin: 30px auto 0 auto;
		border: 1px solid var(--dark);
		transition: all 0.2s;
	}

	.search-input:focus {
		width: 75vw;
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
		outline: none;
	}

	/* Media query styles */

	@media screen and (min-width: 500px) and (max-width: 900px) {
		.main {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			width: 80%;
			grid-gap: 1rem;
			margin: 0 auto;
			justify-content: center;
			align-items: center;
		}

		.recipe {
			width: 40vw;
		}

		.recipe:hover {
			transform: scale(1.05);
			transition: transform 0.2s;
		}
	}

	@media screen and (min-width: 900px) and (max-width: 1200px) {
		.main {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			width: 90%;
			grid-gap: 1rem;
			margin: 0 auto;
		}
	}

	@media screen and (min-width: 1200px) {
		.main {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			width: 90%;
			grid-gap: 1rem;
			margin: 0 auto;
		}

		.recipe:hover {
			transform: translateY(-5px);
			transition: transform 0.2s;
		}
	}
</style>
