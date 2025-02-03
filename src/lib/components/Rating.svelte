<script lang="ts">
	import Icon from './Icon.svelte';

	interface Props {
		value: number;
		count: number;
		onClick: (r: number) => void;
	}

	let { value, count, onClick }: Props = $props();

	let hoverStar = $state(0);
</script>

<div class="rating">
	<p class="value">{value || 0}</p>
	{#each [1, 2, 3, 4, 5] as v}
		<div class="rate">
			<button
				onmouseenter={() => (hoverStar = v)}
				onmouseleave={() => (hoverStar = 0)}
				onclick={() => onClick(v)}
			>
				<Icon
					name="fa-star"
					size={18}
					color={hoverStar >= v ? '#FFBB00' : v <= value ? '#FFBB00' : 'grey'}
				/>
			</button>
		</div>
	{/each}
	<p class="count">({count})</p>
</div>

<style>
	.rating {
		display: flex;
		gap: 2px;
		align-items: center;

		.value {
			font-weight: 600;
			font-size: 18px;
			margin-right: 4px;
		}

		.count {
			margin-left: 4px;
		}
	}

	.rate {
		button {
			background: transparent;
			cursor: pointer;
		}

		button:hover {
			color: red !important;
		}
	}
</style>
