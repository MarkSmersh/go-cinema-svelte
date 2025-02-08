<script lang="ts">
	import type { LocalTicket } from '$lib';
	import { isTickets } from '$lib/state';
	import { onMount } from 'svelte';
	import Modal from './Modal.svelte';

	let isActive = $state(false);

	let tickets: LocalTicket[] = $state([]);

	onMount(() => {
		tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
	});

	isTickets.subscribe((t) => (isActive = t));
</script>

<Modal {isActive} onClose={() => isTickets.set(false)}>
	<div class="content">
		<h2>Bilety</h2>
		<div class="tickets">
			{#each tickets as t}
				<div class="ticket">
					<p>{t.id}</p>
					<h4>{t.date.toLocaleDateString()} {t.date.toLocaleTimeString()}</h4>
				</div>
			{/each}
		</div>
	</div>
</Modal>

<style>
</style>
