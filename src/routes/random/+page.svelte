<script lang="ts">
	import RecipeGenerator from '../../components/magic/RecipeGenerator.svelte';
</script>

<svelte:head>
	<title>Magiska avdelningen</title>
</svelte:head>

<div class="wrapper">
	<div class="hero">
		<h1>Välkommen till min magiska receptgenerator</h1>
		<p>
			Här kan du hitta ett specifikt recept du söker, eller skapa/hitta ett nytt med några
			ingredienser du valt.
		</p>
	</div>
	<div class="magic">
		<RecipeGenerator />
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.363), rgba(0, 0, 0, 0)),
			url('/images/ratul-ghosh-NPrWYa69Mz0-unsplash.jpg') no-repeat center 30% / cover;
	}

	.hero {
		text-align: center;
		font-size: 1.2;
		margin: 2rem auto;
		background-color: rgba(245, 245, 245, 0.881);
		padding: 50px;
		border-radius: 5px;
	}

	.magic {
		min-height: 100vh;
	}
</style>
