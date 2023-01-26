<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { currentUser, pb } from './pocketbase';

	const MIN_CHARS = 3;

	let comments: Array<any> = [];
	let newestComments: Array<any> = [];
	let restOfComments: Array<any> = [];
	let answers: Array<any> = [];
	let text = '';
	let rating = 5;
	let btnDisabled = true;
	let message = '';
	let selected = 5;
	let placeholder: string;
	let header: string;
	let showMore = false;

	let placeholders = [
		'Vad tyckte du?',
		'Lämna dina åsikt',
		'Vad var din favoritdel?',
		'Gjorde du några förändringar?',
		'Dela dina tankar'
	];

	let headers = [
		'Dela dina tankar och betygsätt detta recept',
		'Lämna din åsikt och betygsätt detta recept',
		'Betygsätt detta recept och berätta vad du tycker',
		'Vad tyckte du om detta recept? Lämna en kommentar',
		'Lämna din recension och hjälp andra användare'
	];

	onMount(async () => {
		let parsed = await JSON.parse($page.data.social);
		comments = await parsed.comments.items;
		comments.reverse();
		newestComments = comments.slice(0, 3);
		restOfComments = comments.slice(3);
		answers = await parsed.answers.items;
		placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];
		header = headers[Math.floor(Math.random() * headers.length)];
	});

	const handleInput = (e: any) => {
		if (e.target.value.trim().length < MIN_CHARS) {
			message = `Text must be at least ${MIN_CHARS} characters`;
			btnDisabled = true;
		} else {
			message = '';
			btnDisabled = false;
		}
	};

	const updateRating = async () => {
		let getRecipe = JSON.parse($page.data.recipe);
		let currentRating = getRecipe.rating;
		let currentRaters = getRecipe.raters;
		let newRating = rating; // the new rating being added
		let newAverage =
			Math.round(((currentRating * currentRaters + newRating) / (currentRaters + 1)) * 100) / 100;
		let data = {
			rating: newAverage,
			raters: currentRaters + 1
		};
		const record = await pb.collection('recipes').update(getRecipe.id, data);
		return;
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		let getRecipe = await JSON.parse($page.data.recipe);
		let getUserId = $currentUser?.id;
		if (text.trim().length > MIN_CHARS) {
			const newComment = {
				message: text.trim(),
				user: getUserId,
				recipe: getRecipe.id,
				rating: rating
			};
			// update rating
			updateRating();
			// send newComment to server
			const record = await pb.collection('comments').create(newComment);
			newestComments = [
				{
					message: text.trim(),
					expand: { user: $currentUser },
					rating: rating,
					created: new Date()
				},
				...newestComments
			];
			text = '';
		}
	};

	const onChange = (e: any) => {
		selected = +e.currentTarget.value;
		rating = +e.currentTarget.value;
	};
</script>

<div class="comments-container">
	{#if $currentUser}
		<div class="comment">
			<header><h2>{header}</h2></header>
			<form on:submit|preventDefault={handleSubmit}>
				<div class="rating-select">
					<ul class="rating">
						{#each [1, 2, 3, 4, 5] as num}
							<li>
								<input
									type="radio"
									name="rating"
									id={`num${num}`}
									value={num}
									on:change={onChange}
									checked={selected === num ? true : false}
								/>
								<label for={`num${num}`}>{num}</label>
							</li>
						{/each}
					</ul>
				</div>
				<div class="add-comment">
					<div class="input-group">
						<textarea on:input={handleInput} bind:value={text} {placeholder} cols="70" rows="5" />
					</div>
					<button disabled={btnDisabled} type="submit" on:submit={handleSubmit}>Kommentera</button>
				</div>
				{#if message}
					<div class="message">
						{message}
					</div>
				{/if}
			</form>
		</div>
	{:else}
		<header>Du måste vara inloggad för att kommentera</header>
		<div class="input-group" />
	{/if}
	<div class="comments-list">
		{#if comments.length}
			{#each newestComments as comment (comment.id)}
				{#if comment.message}
					<div class="comment">
						<div class="num-display">{comment.rating}</div>
						<p>
							{comment.message} <br />
							<span class="date">{new Date(comment.created).toLocaleString()}</span>
							{#if comment.expand.user}
								{comment.expand.user.name}
							{:else}
								{$currentUser?.name}
							{/if}
						</p>
						{#each answers as answer (answer.id)}
							{#if answer.comment.includes(comment.id)}
								<p class="answer">
									{answer.message} <br />
									<span class="date">{new Date(answer.created).toLocaleString()} </span>
									{#if answer.expand.user}
										{answer.expand.user.name}
									{:else}
										{$currentUser?.name}
									{/if}
								</p>
							{/if}
						{/each}
					</div>
				{/if}
			{/each}
			{#if comments.length > 3}
				{#if !showMore}
					<button class="show-more" on:click={() => (showMore = !showMore)}>
						{showMore ? 'Göm' : 'Visa alla'} kommentarer
					</button>
					<div class="accordion" style:display={showMore ? 'block' : 'none'}>
						{#each restOfComments as comment (comment.id)}
							{#if comment.message}
								<div class="comment">
									<div class="num-display">{comment.rating}</div>
									<p>
										{comment.message} <br />
										<span class="date">{new Date(comment.created).toLocaleString()}</span>
										{#if comment.expand.user}
											{comment.expand.user.name}
										{:else}
											{$currentUser?.name}
										{/if}
									</p>
									{#each answers as answer (answer.id)}
										{#if answer.comment.includes(comment.id)}
											<p class="answer">
												{answer.message} <br />
												<span class="date">{new Date(answer.created).toLocaleString()} </span>
												{#if answer.expand.user}
													{answer.expand.user.name}
												{:else}
													{$currentUser?.name}
												{/if}
											</p>
										{/if}
									{/each}
								</div>
							{/if}
						{/each}
					</div>
				{:else}
					{#each restOfComments as comment (comment.id)}
						{#if comment.message}
							<div class="comment">
								<div class="num-display">{comment.rating}</div>
								<p>
									{comment.message} <br />
									<span class="date">{new Date(comment.created).toLocaleString()}</span>
									{#if comment.expand.user}
										{comment.expand.user.name}
									{:else}
										{$currentUser?.name}
									{/if}
								</p>
								{#each answers as answer (answer.id)}
									{#if answer.comment.includes(comment.id)}
										<p class="answer">
											{answer.message} <br />
											<span class="date">{new Date(answer.created).toLocaleString()} </span>
											{#if answer.expand.user}
												{answer.expand.user.name}
											{:else}
												{$currentUser?.name}
											{/if}
										</p>
									{/if}
								{/each}
							</div>
						{/if}
					{/each}
					<button class="show-less" on:click={() => (showMore = !showMore)}>
						{showMore ? 'Göm' : 'Visa alla'} kommentarer
					</button>
				{/if}
			{/if}
		{/if}
	</div>
</div>

<style>
	.add-comment {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/* styling of ratings */
	.num-display {
		position: absolute;
		top: 0;
		left: 0;
		width: 40px;
		height: 40px;
		background: var(--secondary);
		color: var(--primary);
		border-radius: 50%;
		padding: 10px;
		text-align: center;
		font-size: 19px;
		overflow: hidden;
	}

	.rating-select {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
	}

	.rating {
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		max-width: 400px;
	}

	.rating li {
		position: relative;
		background-color: var(--secondary);
		width: 30px;
		height: 30px;
		text-align: center;
		border-radius: 50%;
		font-size: 19px;
		transition: 0.2s;
		box-shadow: 0px 0px 10px #ccc;
	}

	.rating li label {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		cursor: pointer;
	}

	.rating-select li:hover {
		background-color: var(--primary);
		box-shadow: 0px 0px 10px var(--primary); /* add a shadow effect */
		border: 1px solid var(--dark);
	}

	/* Make actual radio select invisible */
	[type='radio'] {
		opacity: 0;
	}

	/* Use the sibling select */
	[type='radio']:checked ~ label {
		box-shadow: 0 0 5px var(--dark);
		background-color: var(--light);
	}

	.show-more {
		width: 100%;
	}
	.show-less {
		width: 100%;
		background-color: var(--primary);
		border: var(--dark);
		color: var(--dark);
	}

	.show-less:hover {
		border: 1px solid var(--dark);
	}

	/* styling for inputs */
	header {
		max-width: 400px;
		margin: auto;
	}

	header h2 {
		font-size: 22px;
		font-weight: 600;
		text-align: center;
	}

	.input-group {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px 7px;
		border-radius: 8px;
		margin-top: 15px;
	}

	textarea {
		width: 60vw;
		max-width: 600px;
		font-size: calc(1.7rem + (0.8vw - 18px));
	}

	input:focus {
		outline: none;
	}

	.message {
		padding-top: 10px;
		text-align: center;
		color: var(--danger);
	}

	/* container for the comments section */
	.comments-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 900px;
		margin-top: 20px;
		padding: 20px;
		background-color: #f9f9f9;
		border: 1px solid whitesmoke;
		border-radius: 1rem;
	}

	/* style for the comments */
	.comment {
		background-color: var(--background-color);
		color: var(--text-color);
		border-radius: 15px;
		padding: 10px 50px;
		margin: 20px 0;
		position: relative;
	}

	/* style for the answers */
	.comments-container p.answer {
		margin-left: 20px;
		font-size: 14px;
		color: #999;
	}

	/* style for the date created */
	.comments-container .date {
		font-size: 12px;
		color: #999;
		text-align: right;
		margin-top: 5px;
	}

	button {
		padding: 5px 10px;
		border-radius: 5px;
	}
</style>
