<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		name: string;
		size?: number;
		color?: string;
		children?: Snippet;
	}

	const { name, color, size, children }: Props = $props();
</script>

<i style:color style:font-size={`${size || 20}px`} class={`fas ${name}`}>
	{#if children}
		{@render children()}
	{/if}
</i>
