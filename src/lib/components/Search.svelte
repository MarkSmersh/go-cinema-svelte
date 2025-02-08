<script lang="ts">
	import { isSearch } from '$lib/state';
	import Icon from './Icon.svelte';

	interface Props {
		onInput: (v: string) => void;
	}

	let { onInput }: Props = $props();

	let input: HTMLInputElement | undefined = $state();
	let isActive: boolean = $state(false);

	isSearch.subscribe((s) => (isActive = s));

	$effect(() => {
		if (isActive) {
			input?.focus();
		}
	});

	$inspect(isActive);
</script>

<div class="search">
	<button onclick={() => isSearch.update((s) => (s = true))}>
		<Icon name="fa-search" />
	</button>
	<input
		onfocusout={() => isSearch.update((s) => (s = false))}
		onfocusin={() => isSearch.update((s) => (s = true))}
		bind:this={input}
		placeholder="Wyszukiwanie..."
		oninput={(e) => onInput(e.currentTarget.value)}
	/>
</div>

<style>
	.search {
		display: flex;
		background: var(--secondary);
		border-radius: var(--br);
		color: var(--primary-text);
		flex: 1;
	}

	button {
		height: 100%;
		aspect-ratio: 1 / 1;
		background: transparent;
		color: var(--primary-text);
		cursor: pointer;
		border: 2px solid var(--secondary);
		border-radius: var(--br);
	}

	button:hover {
		background-color: var(--primary);
	}

	input {
		flex: 1;
		font-size: 16px;
		background: transparent;
		color: var(--primary-text);
		border-radius: var(--br);
		padding: 0px 8px;
		width: 100%;
	}

	input:focus {
		outline: none;
	}
</style>
