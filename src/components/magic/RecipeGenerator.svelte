<script lang="ts">
	let isLoading = false;
	let question: string;
	let responses: any;

	const talkWithAI = async () => {
		isLoading = true;
		const response = await fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer SECRET KEY`
			},
			body: JSON.stringify({
				model: 'text-davinci-003',
				prompt: `Du kommer att bli ombedd att ge ett veganskt recept från en eller flera ingredienser, eller hitta ett klassiskt recept från prompt-texten. Om det inte finns några seriösa recept med en eller alla ingredienser så kan du hitta på ett. Vanligtvis kommer det vara ingredienser och recept på svenska, och europeiska/svenska måttenheter, prioritera dl framför ml. Svara med HTML-kod och inline-styling. Du behöver inte ha med vegan i titeln för receptet. Följande är ingredienserna och/eller prompt-texten: ${question}`,
				temperature: 0.5,
				max_tokens: 2000
			})
		});
		const json = await response.json();
		responses = await json.choices[0].text;
		isLoading = false;
		question = '';
	};

	const handleClick = () => {
		talkWithAI();
	};
</script>

{#if isLoading}
	<div class="loading-overlay">Loading...</div>
{/if}

<div class="wrapper">
	{#if !responses}
		<input placeholder="ingefära, avocado, tofu" bind:value={question} type="text" />
		<button on:click={handleClick}>Skapa recept!</button>

		<p>Stoppa in ingredienser eller en förfrågan efter ett specifikt recept i maskinen ovanför</p>
	{:else}
		<div class="recipe">
			<div>{@html responses}</div>
		</div>
		<button on:click={() => (responses = '')}>Skapa ett nytt</button>
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		background-color: rgba(245, 245, 245, 0.881);
		justify-content: center;
		align-items: center;
	}

	.loading-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		z-index: 2;
	}

	input {
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

	button {
		border-radius: 5px;
	}

	.recipe div {
		font-size: 1.2rem;
		padding: 5rem;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	input {
		font-size: 1.5rem;
	}

	button {
		padding: 15px;
	}

	p {
		font-style: italic;
	}

	@media (min-width: 700px) {
		.wrapper {
			max-width: 700px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			max-width: 1200px;
			border: 1px solid var(--primary);
			padding: 50px;
		}

		button {
			width: 40vw;
			margin: 20px auto;
		}
	}
</style>
