<script lang="ts">
	import { onMount } from 'svelte';
	import { currentUser, pb } from './pocketbase';

	interface User {
		username: string;
		password: string;
	}

	let user: User = {
		username: '',
		password: ''
	};

	let checkForUser: boolean;
	let isModalOpen = false;

	onMount(async () => {
		checkForUser = $currentUser == null ? true : false;
	});

	const signOut = () => {
		pb.authStore.clear();
		isModalOpen = !isModalOpen;
	};

	const login = async () => {
		try {
			const res = await pb.collection('users').authWithPassword(user.username, user.password);
			if ($currentUser == null) console.log('wrong password');
			isModalOpen = !isModalOpen;
		} catch (error) {
			console.log(error);
		}
	};

	const signUp = async () => {
		try {
			const data = {
				...user,
				passwordConfirm: user.password,
				name: 'howdy'
			};
			await pb.collection('users').create(data);
			await login();
		} catch (err) {
			console.error(err);
		}
	};

	function openModal() {
		isModalOpen = !isModalOpen;
	}
</script>

<section class="navbar">
	{#if checkForUser == null}
		<p>laddar..</p>
	{:else if $currentUser}
		<a href="/"><ion-icon name="home" /></a>
		<a href="/recipes"><ion-icon name="book" /></a>
		<button on:click={openModal}><ion-icon name="apps" /></button>
		<div class="modal" style:display={isModalOpen ? 'flex' : 'none'}>
			<div class="modal-content">
				<button on:click={openModal} style="position: absolute; top: 0; right: 0; font-size: 3rem;"
					><ion-icon name="close-outline" /></button
				>
				<form>
					<button style="background-color: var(--secondary); padding: 10px 20px;" on:click={signOut}
						>Logga ut</button
					>
				</form>
			</div>
		</div>
	{:else}
		<a href="/"><ion-icon name="home" /></a>
		<a href="/recipes"><ion-icon name="book" /></a>
		<button on:click={openModal}><ion-icon name="apps-outline" /></button>
		<div class="modal" style:display={isModalOpen ? 'flex' : 'none'}>
			<div class="modal-content">
				<button on:click={openModal} style="position: absolute; top: 0; right: 0; font-size: 2rem;"
					><ion-icon name="close-outline" /></button
				>
				<form>
					<input type="text" placeholder="Username" id="username" bind:value={user.username} />
					<input type="password" placeholder="Password" id="password" bind:value={user.password} />
					<button
						style="background-color: var(--secondary); padding: 10px 20px;"
						type="submit"
						on:click={login}>Logga in</button
					>
				</form>
			</div>
		</div>
	{/if}
</section>

<style>
	/* Modal */
	.modal {
		position: fixed;
		bottom: 60px; /* height of the navigation bar */
		left: 0;
		width: 100vw;
		height: 20vh;
		background-color: #fff;
		box-shadow: 0px -5px 10px #ccc; /* add a shadow effect */
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.modal-content form {
		display: flex;
		flex-direction: column;
	}

	form input {
		width: 80%;
	}

	button {
		padding: 0;
		margin: 0;
		background-color: var(--secondary);
		border: none;
		font-size: 30px;
		cursor: pointer;
		color: var(--dark);
	}

	.navbar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		max-width: 100vw;
		height: 60px;
		background-color: var(--secondary);
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		font-size: 30px;
		z-index: 99;
		overflow: hidden;
		box-shadow: 0 3px 10px rgba(36, 36, 36, 0.313);
	}

	.navbar a {
		color: var(--dark);
	}

	form {
		display: flex;
		align-items: center;
	}

	form input {
		border: 1px solid var(--secondary);
		padding: 10px;
		margin: 5px;
		border-radius: 5px;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	a:hover {
		color: var(--secondary);
	}

	@media (min-width: 768px) {
		.modal {
			width: 60vw;
			left: 20%;
		}

		.navbar {
			box-shadow: 0 4px 10px rgba(0, 0, 0, 0.663);
		}
	}
</style>
