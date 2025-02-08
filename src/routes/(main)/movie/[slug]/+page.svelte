<script lang="ts">
	import type { PageProps } from './$types';
	import dummy from '$lib/assets/dummy.jpg';
	import Rating from '$lib/components/Rating.svelte';
	import { sendRating } from '$lib';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();
</script>

<main>
	<img src={dummy} alt="dummy.jpg" />
	<div class="content">
		<div class="text">
			<h1>{data.title}</h1>
			<div class="info">
				<h3>Rok: {data.year}</h3>
				<Rating value={data.rating} count={data.rates} onClick={(v) => sendRating(data.id, v)} />
			</div>
			<p>{data.description}</p>
		</div>
		<Button icon="fa-ticket" onClick={() => goto(`/movie/${data.id}/reservation`)}
			>Kup bilet od {data.from} zł do {data.to} zł</Button
		>
	</div>
</main>

<style>
	main {
		padding: 100px;
		padding-top: 150px;
		height: calc(100vh - 250px);
		display: flex;
		align-items: center;
		gap: 32px;
	}

	img {
		height: 100%;
		border-radius: var(--br);
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: calc(100% - 60px);
	}

	.text {
		color: var(--secondary-text);
		display: flex;
		flex-direction: column;
		gap: 16px;

		.info {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
	}
</style>
