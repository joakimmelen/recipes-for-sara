<script lang="ts">
	import Social from '$lib/Social.svelte';
	import type { Recipe } from 'src/routes/interfaces';
	import { onMount } from 'svelte';
	/** @type {import('./$types').PageData} */ export let data: any;

	let recipe: any = {};
	let ingredients: any = [];
	let ingredientGroups: any[] = [];
	let uniqueIngredientItem: any[] = [];
	let isLoading: boolean = true;
	let titleHead: string;
	let activeTab = 'ingredients';

	onMount(async () => {
		try {
			recipe = await JSON.parse(data.recipe);
			titleHead = await recipe.title;
			ingredients = await JSON.parse(data.ingredients);
			ingredients.forEach((ing: any) => {
				ingredientGroups.push([ing.expand.ing_group.name, ing.expand.ingredient_id.name]);
			});
			uniqueIngredientItem = ingredientGroups.filter((i) => {
				return !uniqueIngredientItem.includes(i[0]);
			});
			isLoading = false;
		} catch (err) {
			console.log(err);
		}
	});
</script>

<svelte:head>
	<title>{titleHead}</title>
</svelte:head>

<div class="container">
	{#if isLoading}
		<div class="loading">Loading...</div>
	{:else}
		<header>
			<nav>
				<a class="nav" href="/recipes"><button>Tillbaka till recept</button></a>
			</nav>
		</header>

		<div class="recipe">
			<div class="recipe-card">
				<h2>{recipe.title}</h2>
				{#if recipe.rating}
					<div class="recipe-rating">
						<img
							src="../favicon.ico"
							alt="Avocado icon"
							width="20px"
							height="20px"
							style={`opacity: ${recipe.rating >= 1 ? (recipe.rating < 1.5 ? 0.5 : 1) : 0.1}`}
						/>
						<img
							src="../favicon.ico"
							alt="Avocado icon"
							width="20px"
							height="20px"
							style={`opacity: ${recipe.rating >= 2 ? (recipe.rating < 2.5 ? 0.5 : 1) : 0.1}`}
						/>
						<img
							src="../favicon.ico"
							alt="Avocado icon"
							width="20px"
							height="20px"
							style={`opacity: ${recipe.rating >= 3 ? (recipe.rating < 3.5 ? 0.5 : 1) : 0.1}`}
						/>
						<img
							src="../favicon.ico"
							alt="Avocado icon"
							width="20px"
							height="20px"
							style={`opacity: ${recipe.rating >= 4 ? (recipe.rating < 4.5 ? 0.5 : 1) : 0.1}`}
						/>
						<img
							src="../favicon.ico"
							alt="Avocado icon"
							width="20px"
							height="20px"
							style={`opacity: ${recipe.rating >= 5 ? 1 : 0.1}`}
						/>
					</div>
				{/if}
				<section class="tags">
					{#if recipe.expand}
						{#each recipe.expand.cuisine as tags (tags.id)}
							<button style="font-size: 10px;" disabled>{tags.tag}</button>
						{/each}
					{/if}
				</section>
				<img
					class="recipe-image"
					src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=500x500`}
					alt={recipe.name}
				/>
				<div class="recipe-info">
					<p>{recipe.description}</p>
				</div>
			</div>

			<div class="tabs">
				<button
					class="tab {activeTab === 'ingredients' ? 'active' : ''}"
					on:click={() => (activeTab = 'ingredients')}>Ingredienser</button
				>
				<button
					class="tab {activeTab === 'howto' ? 'active' : ''}"
					on:click={() => (activeTab = 'howto')}>Gör så här</button
				>
			</div>
			<section class="ingredients" style:display={activeTab === 'ingredients' ? 'block' : 'none'}>
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
												<td
													>{ingredient.expand.measurement_qty.qty_amount}
													{ingredient.expand.measurement_id.measurement_description}</td
												>
											{:else if ingredient.expand.measurement_qty}
												<td>{ingredient.expand.measurement_qty.qty_amount}</td>
											{/if}
										</tr>
									{:else}
										<td />
									{/if}
								{/each}
							</tbody>
						{/each}
					{/if}
				</table>
			</section>

			<section class="howto" style:display={activeTab === 'howto' ? 'block' : 'none'}>
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
		</div>

		<div class="social">
			<Social />
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 16px;
	}

	.loading {
		text-align: center;
		font-size: 2rem;
		padding: 2rem 0;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 0;
	}

	nav {
		display: flex;
	}

	nav button {
		background-color: #333;
		color: #fff;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		border: none;
		cursor: pointer;
	}

	.recipe-card h2 {
		margin-bottom: 1rem;
	}

	.recipe-rating {
		display: flex;
	}

	.recipe-rating img {
		width: 20px;
		height: 20px;
	}

	.tags {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
	}

	.tags button {
		background-color: #eee;
		color: #333;
		padding: 0.5rem 1rem;
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
		border-radius: 4px;
		border: none;
	}

	.recipe-image {
		max-width: 100%;
		margin-top: 1rem;
	}

	.recipe-info {
		display: flex;
		align-items: center;
	}

	.recipe-info p {
		margin-right: 1rem;
	}

	.recipe-info {
		margin: 2rem 0;
	}

	.recipe-info p {
		margin-bottom: 1rem;
	}

	.tabs {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
		position: relative; /* add a position property */
	}

	.tab {
		background-color: var(--primary);
		color: var(--dark);
		padding: 0.5rem 1rem;
		margin-right: 0.5rem;
		border-radius: 4px;
		border: none;
		cursor: pointer;
		border-bottom: 2px solid transparent; /* add a bottom border for the active tab */
	}

	.tabs::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		border-bottom: 1px solid var(--tertiary);
	}

	.tab.active {
		background-color: var(--secondary);
		color: var(--primary);
		border-bottom: 2px solid var(--tertiary); /* change the bottom border color for the active tab */
	}

	.ingredients,
	.howto {
		display: none;
	}

	table {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	thead {
		background-color: var(--primary);
	}

	th,
	td {
		padding: 0.5rem;
	}

	tr {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 70vw;
	}

	h3 {
		margin-top: 2rem;
	}

	p {
		margin-bottom: 1rem;
	}

	[style*='block'] {
		display: block;
	}
</style>
