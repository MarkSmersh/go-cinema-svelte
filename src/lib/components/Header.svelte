<script lang="ts">
	import { goto } from '$app/navigation';
	import { isSearch } from '$lib/state';
	import Button from './Button.svelte';
	import Search from './Search.svelte';
	import SearchModal from './SearchModal.svelte';

	interface Movie {
		id: number;
		title: string;
		year: number;
		description: string;
		rating: string;
	}

	let isActive: boolean = $state(false);

	let movies: Movie[] | never[] = $state([]);

	let q: string = $state('');

	isSearch.subscribe((s) => (isActive = s));

	async function searchFilm(q: string) {
		const res: Movie[] = await (await fetch(`/api/search/${q}`)).json();

		console.log(res);

		if (res.length === 0 || q.length === 0) {
			movies = [];
		} else {
			movies = res;
		}
	}

	function goToMovie(m: Movie) {
		isSearch.update((s) => (s = false));
		goto(`/movie/${m.id}`);
	}

	$inspect(q);
</script>

<header>
	{#if !isActive}
		<Button isSquare type="secondary" icon="fa-home" onClick={() => goto('/')} />
	{/if}
	<Search onInput={(v) => searchFilm(v)} />
	{#if !isActive}
		<Button
			isSquare
			type="secondary"
			icon="fa-circle-info"
			onClick={() => console.log('Opens info')}
		/>
		<Button isSquare type="secondary" icon="fa-film" onClick={() => goto('/movies')} />
		<Button
			isSquare
			type="secondary"
			icon="fa-ticket"
			onClick={() => console.log('Should open some window')}
		/>
	{/if}
	<SearchModal {movies} onSelect={(m) => goToMovie(m)} />
</header>

<style>
	header {
		position: fixed;
		display: flex;
		background-color: var(--primary);
		border-radius: var(--br);
		padding: 8px;
		margin: 8px;
		gap: 8px;
		height: 60px;
		width: calc(100% - 32px);
		z-index: 69;
	}
</style>
