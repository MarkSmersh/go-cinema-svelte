<script lang="ts">
	import { isInfo } from '$lib/state';
	import Modal from './Modal.svelte';
	import logo from '$lib/assets/logo.svg';
	import damn from '$lib/assets/damn.png';
	import eng from '$lib/assets/eng.png';

	let isActive = $state(false);

	const year = new Date().getFullYear();

	isInfo.subscribe((i) => (isActive = i));
</script>

<Modal onClose={() => isInfo.set(false)} {isActive}>
	<div class="content">
		<h3>{year}. GO Cinema. Wszystkie prawa są zastreżone</h3>
		<img src={logo} alt="logo.svg" />
		<h2>Autorzy</h2>
		<div class="creators">
			<div class="creator">
				<img src={damn} alt={'damn.png'} />
				<h2>Zakhar Orlovskyi</h2>
			</div>
			<div class="creator">
				<img src={eng} alt={'eng.png'} />
				<h2>Mark Smotkin</h2>
			</div>
		</div>
	</div>
</Modal>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;

		img {
			height: 100px;
		}

		.creators {
			display: grid;
			grid: auto / repeat(2, 1fr);
			gap: 16px;
			align-items: center;

			.creator {
				display: flex;
				flex-direction: column;
				gap: 8px;
				align-items: center;

				img {
					height: 50px;
					border-radius: var(--br);
					border: 2px solid var(--primary);
				}
			}
		}
	}
</style>
