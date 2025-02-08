<script lang="ts">
	import dummy from '$lib/assets/dummy.jpg';
	import Icon from './Icon.svelte';

	interface Props {
		movies: Movie[] | never[];
		onSelect: (m: Movie) => void;
	}

	interface Movie {
		id: number;
		title: string;
		year: number;
		description: string;
		rating: string;
	}

	let { movies, onSelect }: Props = $props();
</script>

<div class="movies">
	<h1>13</h1>
	{#each movies as m}
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
		<div class="movie" onclick={() => onSelect(m)}>
			<div class="image">
				<img src={dummy} alt="dummy.jpg" />
				<div class="info">
					<h2>{m.title} ({m.year})</h2>
					<p>{m.description}</p>
				</div>
				<div class="rating">
					{m.rating}
					<Icon name="fa-star" />
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.movies {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		border-radius: var(--br);
		background: var(--primary);
		top: 100px;
		position: fixed;
		z-index: 68;
	}

	.movie {
		display: flex;

		.image {
			aspect-ratio: 2 / 1;
		}

		.info {
			display: flex;
			flex-direction: column;
			gap: 4px;
			flex: 1;
		}

		.rating {
			aspect-ratio: 2 / 1;
			display: flex;
			flex-direction: column;
			gap: 4px;
		}
	}
</style>
