<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';
	import { blur } from 'svelte/transition';

	interface Props {
		isActive: boolean;
		onClose: () => void;
		children: Snippet;
	}

	let { onClose, isActive, children }: Props = $props();
</script>

{#if isActive}
	<div transition:blur class="modal">
		<div class="controls">
			<Button isSquare icon={'fa-xmark'} onClick={() => onClose()} />
		</div>
		<div class="children">
			{@render children()}
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: var(--secondary);
		border-radius: var(--br);
		border: 2px solid var(--primary);
		width: 60%;
		aspect-ratio: 2 / 1;
		max-height: fit-content;
		padding: 16px;
		color: var(--secondary-text);
		overflow-y: scroll;
		overflow-x: hidden;
	}

	.controls {
		position: fixed;
		top: 10px;
		right: 10px;
		aspect-ratio: 1 / 1;
		display: flex;
	}

	/* width */
	::-webkit-scrollbar {
		width: 10px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: var(--secondary);
		border-radius: var(--br);
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: var(--primary);
		border-radius: var(--br);
	}
</style>
