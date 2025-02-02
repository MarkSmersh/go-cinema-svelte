<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<Header />
{@render children()}
<Footer />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

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
