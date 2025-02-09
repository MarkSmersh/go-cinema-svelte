<script lang="ts">
	import type { LocalTicket } from '$lib';
	import { isTickets } from '$lib/state';
	import { onMount } from 'svelte';
	import Modal from './Modal.svelte';
	import Icon from './Icon.svelte';
	import { goto } from '$app/navigation';

	let isActive = $state(false);

	let tickets: LocalTicket[] = $state([]);

	function goToTicket(t: LocalTicket) {
		goto(`/ticket/${t.id}`);
	}

	onMount(() => {
		tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
		// tickets = tickets.sort(
		// 	(a, b) => new Date(a.date).getMilliseconds() - new Date(b.date).getMilliseconds()
		// );
		tickets = tickets.reverse();
	});

	isTickets.subscribe((t) => (isActive = t));

	$inspect(tickets);
</script>

<Modal {isActive} onClose={() => isTickets.set(false)}>
	<div class="content">
		<h2>Bilety</h2>
		<div class="tickets">
			{#each tickets as t}
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->

				<div onclick={() => goToTicket(t)} class="ticket">
					<div class="icon">
						<Icon name="fa-ticket" />
					</div>
					<div class="info">
						<p>{t.id}</p>
						<h4>
							{new Date(t.date).toLocaleDateString('pl-PL')}
							{new Date(t.date).toLocaleTimeString('pl-PL')}
						</h4>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Modal>

<style>
	.content {
		display: flex;
		flex-direction: column;
		gap: 32px;

		.tickets {
			display: flex;
			flex-direction: column;
			gap: 16px;

			.ticket {
				padding: 8px;
				background: var(--primary);
				border: 2px solid var(--primary);
				border-radius: var(--br);
				display: flex;
				gap: 8px;
				align-items: center;
				cursor: pointer;

				.icon {
					aspect-ratio: 1 / 1;
					border-radius: var(--br);
					border: 2px solid var(--secondary);
					display: flex;
					background: var(--secondary);
					height: 50px;
					justify-content: center;
					align-items: center;
				}

				.info {
					display: flex;
					flex-direction: column;
					gap: 4px;
				}
			}

			.ticket:hover {
				background: var(--secondary);

				.icon {
					background: var(--primary);
				}
			}
		}
	}
</style>
