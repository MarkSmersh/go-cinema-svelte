<script lang="ts">
	import type { PageProps } from './$types';
	import cinemaImg from '$lib/assets/cinema.jpg';
	import movieImg from '$lib/assets/dummy.jpg';
	import Pagination from '$lib/components/Pagination.svelte';
	import Rating from '$lib/components/Rating.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { data }: PageProps = $props();
	let cinemaId: number = $state(0);
	let placeId: number | null = $state(null);

	function setCinema(c: number) {
		cinemaId = c;
		placeId = null;
	}
</script>

<main>
	<div style:background={`url(${movieImg})`} class="movie">
		<div class="text">
			<h1>{data.title}</h1>
			<p>{data.description}</p>
			<p>Rok: {data.year}</p>
			<div class="rating">
				<Rating value={data.rating} count={data.rates} onClick={() => {}} />
			</div>
		</div>
	</div>
	<div style:background={`url(${cinemaImg})`} class="cinemas">
		<div class="text">
			<h1>{data.cinemas[cinemaId].title}</h1>
			<p>{data.cinemas[cinemaId].description}</p>
			<h3>Szerokość sali: {data.cinemas[cinemaId].width}</h3>
			<h3>Ogólna ilość miejśc: {data.cinemas[cinemaId].placesCount}</h3>
		</div>
		<div class="control">
			<Pagination slug={cinemaId} steps={data.cinemas.length} onStep={(s) => setCinema(s)} />
		</div>
	</div>
	<div class="place-selector">
		<div class="places">
			{#each data.cinemas[cinemaId].places as r}
				<div class="row">
					{#each r as c}
						<button onclick={() => console.log(c.id)} class="place">
							<Icon name="fa-chair" color="white" />
						</button>
					{/each}
				</div>
			{/each}
		</div>
		<div class="info">
			<h2>informacja o miejścu</h2>
			{#if placeId !== null}
				<p>{data.cinemas[cinemaId].places[placeId]}</p>
			{:else}
				<p>Aby zobaczyc informację o miejścu najpierw musi być wybrane</p>
			{/if}
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}

	.movie {
		height: calc(100vh - 100px);
		display: flex;
		padding: 50px;
		background-size: cover !important;
		background-position: center !important;
		justify-content: center;
		align-items: end;
	}

	.rating {
		display: flex;
		justify-content: center;
	}

	.cinemas {
		height: calc(100vh - 100px);
		display: flex;
		padding: 50px;
		background-size: cover !important;
		background-position: center !important;
		justify-content: end;
		align-items: center;
		flex-direction: column;
		gap: 50px;
	}

	.text {
		padding: 32px;
		color: var(--primary-text);
		backdrop-filter: blur(10px) brightness(40%);
		border-radius: var(--br);
		text-align: center;
		width: calc(100% - 64px);
		display: flex;
		flex-direction: column;
		gap: 8px;

		p {
			margin-bottom: 8px;
		}
	}

	.control {
		width: 100%;
	}

	.place-selector {
		height: calc(100vh - 64px);
		padding: 32px;
	}
</style>
