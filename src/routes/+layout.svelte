<script>
	import Login from '../lib/Login.svelte';
</script>

<div class="wrapper">
	<div class="content">
		<slot />
	</div>

	<div class="navbar">
		<Login />
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		max-width: 100%;
		margin-inline: auto;
	}

	.content {
		max-width: 100%;
		width: 100vw;
		margin-bottom: 60px;
	}

	@media (min-width: 768px) {
		.wrapper {
			display: flex;
			justify-content: center;
			margin-inline: auto;
		}

		.content {
			max-width: 100%;
			width: 100vw;
			margin-bottom: 60px;
		}
	}
</style>
