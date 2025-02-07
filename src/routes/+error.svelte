<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.svg';
</script>

<main>
	<div class="text">
		<h1>{page.status}</h1>
		<h3>{page.error?.message}</h3>
	</div>
	<img src={logo} alt="logo.svg" />
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		gap: 32px;
		color: var(--secondary-text);

		h1 {
			font-size: 64px;
		}

		.text {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		img {
			height: 120px;
			border: 2px solid var(--primary);
			padding: 8px;
			border-radius: var(--br);
		}
	}
</style>
