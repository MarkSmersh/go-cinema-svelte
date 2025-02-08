<script lang="ts">
	import dummy from '$lib/assets/dummy.jpg';
	import { isSearch } from '$lib/state';
	import Icon from './Icon.svelte';
	import { blur, slide } from 'svelte/transition';

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

	let isActive = $state(false);

	isSearch.subscribe((s) => (isActive = s));

	$inspect(movies);
</script>

{#if movies.length > 0 && isActive}
	<div transition:blur class="movies">
		{#each movies as m}
			<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
			<div
				transition:slide={{ axis: 'y', duration: 100 }}
				class="movie"
				onclick={() => onSelect(m)}
			>
				<img src={dummy} alt="dummy.jpg" />
				<div class="info">
					<h2>{m.title} ({m.year})</h2>
					<p>{m.description}</p>
				</div>
				<div class="rating">
					<h4>{m.rating || 0}</h4>
					<Icon name="fa-star" size={40} color={'rgb(255, 187, 0)'} />
				</div>
			</div>
		{/each}
	</div>
{/if}

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
		z-index: 70;
		width: calc(100% - 64px);
		max-height: 500px;
		overflow-y: scroll;
		overflow-x: hidden;
	}

	/* width */
	::-webkit-scrollbar {
		width: 10px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: var(--primary);
		border-radius: var(--br);
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: var(--secondary);
		border-radius: var(--br);
	}

	.movie {
		display: flex;
		border-radius: var(--br);
		background: var(--secondary);
		width: calc(100% - 16px);
		padding: 8px;
		gap: 16px;
		justify-content: space-between;
		color: var(--secondary-text);
		border: 2px solid var(--secondary);
		cursor: pointer;
		align-items: center;

		img {
			height: 200px;
			border-radius: var(--br);
			aspect-ratio: 3 / 4;
			object-fit: cover;
		}

		.info {
			display: flex;
			flex-direction: column;
			gap: 4px;
			flex: 1;
			height: 100%;
		}

		.rating {
			aspect-ratio: 1 / 2;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 4px;
			height: 100%;
			position: relative;

			h4 {
				position: absolute;
			}
		}
	}

	.movie:hover {
		background: var(--primary);
	}
</style>
