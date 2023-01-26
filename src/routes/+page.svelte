<script lang="ts">
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let placeholder: string;
	let isLoading = true;

	let placeholders = [
		'Krämig spenat..',
		'Korv med..',
		'Smashburgare..',
		'Indisk..',
		'Majonnäs..',
		'Mynta- och koriander..',
		'Pasta..',
		'Festlig..'
	];

	// On component mount, set a random placeholder text
	onMount(() => {
		placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];
		isLoading = false;
	});

	// Map recipeList to searchRecipes and add searchTerms property
	const searchRecipes = data.lists.recipeList.map((recipe: any) => {
		// Create an array of search terms
		const searchTerms = [
			recipe.title,
			recipe.description,
			recipe.instructions1_title,
			recipe.instructions1_desc,
			recipe.instructions2_title,
			recipe.instructions2_desc,
			recipe.instructions3_title,
			recipe.instructions3_desc,
			recipe.instructions4_title,
			recipe.instructions4_desc,
			recipe.instructions5_title,
			recipe.instructions5_desc,
			...recipe.expand.cuisine.map((cuz: any) => cuz.tag)
		].join(', ');
		return { ...recipe, searchTerms };
	});

	// Create search store and subscribe to it
	const searchStore = createSearchStore(searchRecipes);
	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	// Unsubscribe on component destruction
	onDestroy(() => {
		unsubscribe();
	});
</script>

<svelte:head>
	<title>Recept för Sara - En passionerad samling av recept</title>
</svelte:head>

<div class="grid-container">
	{#if isLoading}
		<div class="loading">Loading...</div>
	{:else}
		<header class="header" class:shrink={$searchStore.search}>
			<form class="header__search-form" on:submit|preventDefault>
				<h2 class="search-form__h2">Hitta ditt drömrecept här...</h2>
				<input
					class="header__search-form__input"
					type="search"
					{placeholder}
					bind:value={$searchStore.search}
				/>
			</form>
		</header>
		<div class="recipe-generator">
			<h3 class="generator" class:shrink={$searchStore.search}>...eller skapa ett nytt</h3>
			<a href="/random"><button>Receptgeneratorn</button></a>
		</div>

		<div class="main__container">
			<main class="main">
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
			</main>
		</div>
	{/if}
</div>

<style>
	.loading {
		text-align: center;
		font-size: 2rem;
		padding: 2rem 0;
	}
	/* Header styles */
	.header {
		color: var(--primary);
		font-size: calc(2rem + (1.1vw - 6px));
		grid-area: header;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.363), rgba(0, 0, 0, 0)),
			url('/images/roam-in-color-pRKDJZWNUvY-unsplash.webp') no-repeat center 0% / cover;
		height: 50vh;
		padding: 20px;
		text-align: center;
		justify-content: center;
		transition: height 1s;
	}

	.header.shrink {
		height: 10vh;
		border: none;
	}

	.header.shrink .header__search-form__input {
		transform: scaleX(1);
		margin: 10px;
		width: 80vw;
		transition: transform 2s;
	}

	.header.shrink h2,
	.generator.shrink {
		display: none;
	}

	.search-form__h2 {
		color: var(--primary);
	}

	.header__search-form input[type='search'] {
		width: 80%;
		padding: 12px 20px;
		margin: 20px auto;
		border: 2px solid var(--secondary);
		border-radius: 5px;
		font-size: 13px;
		outline: none;
		transition: all 0.2s;
	}

	.header__search-form input[type='search']:hover {
		box-shadow: 0 0 8px var(--secondary);
	}

	.header__search-form input[type='search']:focus {
		border: 2px solid var(--secondary);
		box-shadow: 0 3px 8px var(--secondary);
		width: 90%;
		outline: none;
	}

	.recipe-generator {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 20px 50px;
		font-size: 1.1rem;
	}

	.recipe-generator button {
		border-radius: 5px;
		font-size: 1.1rem;
	}

	.main {
		margin: 1rem;
		display: flex;
		flex-direction: column-reverse;
		gap: 1rem;
	}

	.recipe {
		border: 1px solid var(--dark);
		padding: 5px;
		box-shadow: 0 3px 5px var(--dark);
		display: flex;
		flex-direction: column;
		border-radius: 5px;
	}

	.recipe h1 {
		height: 6.6rem;
		border-top: 1px solid var(--light);
		margin: 5px 0;
		font-size: 1.7rem;
	}

	/* Recipe image styles */
	.recipe__img {
		width: 100%;
		height: 20vh;
		object-fit: cover;
	}

	/* Recipe rating styles */
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

	/* Media query styles */

	@media screen and (min-width: 500px) {
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

	@media screen and (min-width: 900px) {
		.header {
			background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.363), rgba(0, 0, 0, 0)),
				url('/images/roam-in-color-pRKDJZWNUvY-unsplash.webp') no-repeat center 30% / cover;
			box-shadow: 0 3px 20px black;
		}

		.main {
			grid-template-columns: repeat(3, 1fr);
		}

		.recipe {
			max-width: 30vw;
		}

		.recipe-generator {
			margin: 20px;
		}
	}

	@media screen and (min-width: 1200px) {
		.header {
			background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.363), rgba(0, 0, 0, 0)),
				url('/images/dirk-ribbler-xEFoRSMT-x4-unsplash.jpg') no-repeat center 70% / cover;
		}

		.header.shrink .header__search-form__input {
			transform: scaleX(1);
			margin: 10px;
			width: 30vw;
			transition: transform 2s;
		}

		.header.shrink h2,
		.generator.shrink {
			display: none;
		}

		.recipe-generator {
			margin: 40px;
		}

		.main {
			grid-template-columns: repeat(4, 1fr);
			max-width: 1200px;
		}

		.recipe {
			width: 100%;
		}

		.recipe:hover {
			transform: translateY(-5px);
			transition: transform 0.2s;
		}
	}
</style>
