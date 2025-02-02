<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';
	import { slide } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';

	interface Props {
		onClick: () => void;
		type?: 'primary' | 'secondary';
		children?: Snippet;
		icon?: string;
		isSquare?: boolean;
	}

	const { children, type = 'primary', onClick, icon, isSquare }: Props = $props();
</script>

<button
	transition:slide={{ axis: 'x', easing: cubicIn }}
	style:aspect-ratio={isSquare ? '1 / 1' : ''}
	class={type}
	onclick={() => onClick()}
>
	{#if icon}
		<Icon size={20} name={icon} />
	{/if}
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	button {
		padding: 16px;
		border-radius: var(--br);
		cursor: pointer;
		font-size: 16px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		font-weight: 600;
	}

	.primary {
		background: var(--primary);
		color: var(--primary-text);
		border: 2px solid var(--primary);
	}

	.primary:hover {
		background: var(--secondary);
	}

	.secondary {
		background: var(--secondary);
		color: var(--secondary-text);
		border: 1px solid var(--secondary);
	}

	.secondary:hover {
		background: var(--primary);
	}
</style>
