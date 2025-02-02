<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		name: string;
		size?: number;
		children?: Snippet;
	}

	const { name, size, children }: Props = $props();
</script>

<i style:font-size={`${size || 20}px`} class={`fas ${name}`}>
	{#if children}
		{@render children()}
	{/if}
</i>
