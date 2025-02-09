<script lang="ts">
	import { goto } from '$app/navigation';
	import rdk from '$lib/assets/rickdaltmanpoint.png';
	import logo from '$lib/assets/logo.svg';
	import Button from '$lib/components/Button.svelte';
</script>

<main style:background={`url("${rdk}")`}>
	<div class="content">
		<img src={logo} alt="logo.svg" />
		<div class="text">
			<h1>Witamy w GO Cinema!</h1>
			<h3>
				Jesteśmy tymi, kto zrobi wyszukiwania kina przyjemniejszym od samego ich przeglądania!
			</h3>
			<Button icon="fa-film" onClick={() => goto('/movies')}>Katalog</Button>
		</div>
	</div>
</main>

<style>
	main {
		height: 100vh;
		background-size: cover !important;
		background-position: center !important;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 32px;
		padding: 50px;
		backdrop-filter: blur(10px) brightness(40%);
		color: var(--primary-text);
		border-radius: var(--br);
		width: 70%;

		img {
			height: 250px;
		}

		.text {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
	}

	@media screen and (max-width: 800px) {
		.content {
			padding: 20px;
			margin: 10px;
			width: calc(100% - 60px);
			flex-direction: column;

			img {
				width: 100%;
			}
		}
	}
</style>
