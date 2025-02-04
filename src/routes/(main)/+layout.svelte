<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Notify from '$lib/components/Notify.svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<Header />
<Notify />
{@render children()}
<Footer />

<style>
	:global(*) {
		font-family: 'Lato', serif;
		--primary: #252525;
		--secondary: #313131;

		--primary-text: #ffffff;
		--secondary-text: #ffffff;

		--br: 8px;

		margin: 0;
		padding: 0;
		border: 0;

		transition: 0.2s;
	}

	:global(body) {
		background: var(--secondary);
	}
</style>
