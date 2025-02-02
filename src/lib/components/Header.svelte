<script lang="ts">
	import { goto } from '$app/navigation';
	import { isSearch } from '$lib/state';
	import Button from './Button.svelte';
	import Search from './Search.svelte';

	let isActive: boolean = $state(false);

	isSearch.subscribe((s) => (isActive = s));
</script>

<header>
	{#if !isActive}
		<Button isSquare type="secondary" icon="fa-home" onClick={() => goto('/')} />
	{/if}
	<Search />
	{#if !isActive}
		<Button
			isSquare
			type="secondary"
			icon="fa-circle-info"
			onClick={() => console.log('Opens info')}
		/>
		<Button
			isSquare
			type="secondary"
			icon="fa-film"
			onClick={() => console.log('Opens movie catalog')}
		/>
		<Button
			isSquare
			type="secondary"
			icon="fa-ticket"
			onClick={() => console.log('Should open some window')}
		/>
	{/if}
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
	}
</style>
