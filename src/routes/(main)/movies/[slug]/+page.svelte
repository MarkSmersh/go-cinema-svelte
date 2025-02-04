<script lang="ts">
	import type { PageProps } from './$types';
	import dummy from '$lib/assets/dummy.jpg';
	import Rating from '$lib/components/Rating.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { sendRating } from '$lib/index';

	function pagination(step: number) {
		goto(`/movies/${step}`);
	}

	let { data }: PageProps = $props();

	let movieHover = $state(0);
</script>

<main>
	<div class="movies">
		{#each data.movies as m}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
			<div
				onmouseenter={() => (movieHover = m.id)}
				onmouseleave={() => (movieHover = 0)}
				style:background={`url(${dummy})`}
				class="movie"
				onclick={() => goto(`/movie/${m.id}`)}
			>
				<div class:open={movieHover === m.id} class="info">
					<div class="text">
						<h3>{m.title}</h3>
						{#if movieHover === m.id}
							<p transition:slide={{ axis: 'y', duration: 200 }}>{m.description}</p>
						{/if}
						<p>Rok: {m.year}</p>
					</div>
					<Rating onClick={(r) => sendRating(m.id, r)} count={m.rates} value={m.rating} />
				</div>
			</div>
		{/each}
	</div>
	<Pagination
		slug={data.slug}
		steps={Math.ceil(data.count / data.step)}
		onStep={(s) => pagination(s)}
	/>
</main>

<style>
	main {
		padding: 100px;
		display: flex;
		flex-direction: column;
		gap: 50px;
	}

	.movies {
		display: grid;
		grid: auto / repeat(4, 1fr);
		gap: 16px;
	}

	.movie {
		background-position: center !important;
		background-size: cover !important;
		aspect-ratio: 5 / 7;
		border-radius: var(--br);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		color: var(--primary-text);
		overflow: hidden;
		cursor: pointer;
	}

	.info {
		display: flex;
		height: 30%;
		backdrop-filter: blur(10px) brightness(40%);
		padding: 16px;
		flex-direction: column;
		justify-content: space-between;

		.text {
			h3 {
				font-size: 20px;
				font-weight: 700;
			}

			p {
				margin-top: 8px;
			}
		}
	}

	.open {
		height: 100%;
	}
</style>
