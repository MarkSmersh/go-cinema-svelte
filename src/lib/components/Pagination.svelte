<script lang="ts">
	interface Props {
		slug: number;
		steps: number;
		onStep: (s: number) => void;
	}

	const { slug, steps, onStep }: Props = $props();
</script>

<div class="container">
	<div class="pagination">
		{#if slug > 0}
			<button onclick={() => onStep(slug - 1)} class="step">-1</button>
		{/if}
		{#each [...Array(steps).keys()] as s}
			<button onclick={() => onStep(s)} class:current={slug === s} class="step">
				{s}
			</button>
		{/each}
		{#if slug <= steps - 2}
			<button onclick={() => onStep(slug + 1)} class="step">+1</button>
		{/if}
	</div>
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pagination {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 8px;
	}

	.step {
		height: 50px;
		aspect-ratio: 1 / 1;
		background-color: var(--primary);
		border-radius: var(--br);
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--primary-text);
		border: 2px solid var(--primary);
		cursor: pointer;
		font-size: 16px;
	}

	.step:hover {
		background-color: var(--secondary);
	}

	.current {
		background-color: var(--secondary);
	}
</style>
