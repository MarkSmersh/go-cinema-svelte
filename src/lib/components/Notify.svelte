<script lang="ts">
	import type { INotify } from '$lib/notify.ts';
	import { notify } from '$lib/notify';

	import Icon from './Icon.svelte';

	let notifications = $state<INotify[]>([]);

	notify.subscribe((n) => (notifications = n));
</script>

<div class="notify">
	{#each notifications as n}
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
		<div
			onclick={() => notify.update((notify) => notify.filter((v) => v.id !== n.id))}
			class="notification"
		>
			<div class="icon">
				{#if n.status && n.status > 399}
					<Icon name="fa-skull" />
				{:else}
					<Icon name="fa-check" />
				{/if}
			</div>
			<div class="text">
				<p>{n.message}</p>
			</div>
		</div>
	{/each}
</div>

<style>
	.notify {
		display: flex;
		flex-direction: column;
		gap: 16px;
		position: fixed;
		right: 16px;
		bottom: 16px;
		z-index: 1488;
	}

	.notification {
		display: flex;
		gap: 8px;
		background-color: var(--primary);
		width: 400px;
		border-radius: var(--br);
		color: var(--primary-text);
		align-items: center;
		height: 70px;
		border: 2px solid var(--primary);
		cursor: pointer;

		.icon {
			display: flex;
			justify-content: center;
			align-items: center;
			aspect-ratio: 1 / 1;
			height: 100%;
			background: var(--secondary);
			border-radius: var(--br);
		}

		.text {
			padding: 8px;
		}
	}

	.notification:hover {
		background: var(--secondary);
	}
</style>
