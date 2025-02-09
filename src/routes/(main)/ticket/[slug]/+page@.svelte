<script lang="ts">
	import type { PageProps } from './$types';
	import logo from '$lib/assets/logo.svg';
	import { onMount } from 'svelte';
	import type { LocalTicket } from '$lib';

	let { data }: PageProps = $props();
	let ticket: HTMLDivElement | null = $state(null);

	onMount(() => {
		let tickets: LocalTicket[] | null = JSON.parse(localStorage.getItem('tickets') as string);

		if (!tickets) {
			tickets = [];
		}

		if (!tickets.find((t) => t.id === data.id)) {
			tickets.push({
				id: data.id,
				date: data.createdAt.toString()
			});
		}

		localStorage.setItem('tickets', JSON.stringify(tickets));
	});
</script>

<main>
	<div bind:this={ticket} class="ticket">
		<p class="id">{data.id}</p>
		<div class="logo">
			<img src={logo} alt="logo.svg" />
		</div>
		<div class="content">
			<div class="text">
				<h1>Kinoteatr</h1>
				<h2>{data.cinema}</h2>
			</div>
			<div class="text">
				<h1>Miejsce</h1>
				<h2>Wiersz: {data.row}</h2>
				<h2>Kolumna: {data.col}</h2>
			</div>
			<div class="text">
				<h1>Dane kontakowe</h1>
				<h2>Imię: {data.firstname}</h2>
				<h2>Nazwisko: {data.surname}</h2>
				<h2>Numer telefonu: {data.phoneNumber}</h2>
			</div>
			<div class="text">
				<h1>Data</h1>
				<h2>Dzień: {data.createdAt.toLocaleDateString('pl-PL', { dateStyle: 'full' })}</h2>
				<h2>Czas: {data.createdAt.toLocaleTimeString('pl-PL', { timeStyle: 'long' })}</h2>
			</div>
		</div>
		<div class="logo">
			<img src={logo} alt="logo.svg" />
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.ticket {
		aspect-ratio: 3 / 4;
		height: calc(100% - 64px - 4px);
		border: 2px solid var(--primary-);
		background: #ffffff;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 32px 0px;
		gap: 16px;
		border: 2px dashed var(--secondary);

		p {
			font-family: 'Courier New', Courier, monospace;
		}

		.logo {
			background-color: var(--primary);
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 8px 0px;

			img {
				height: 25px;
			}
		}
	}

	.content {
		width: calc(100% - 64px);
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 32px;

		.text {
			display: flex;
			flex-direction: column;
			gap: 8px;

			h1 {
				font-weight: 600;
				font-size: 24px;
				font-family: 'Courier New', Courier, monospace;
			}

			h2 {
				font-weight: 500;
				font-size: 20px;
				font-family: 'Courier New', Courier, monospace;
			}
		}
	}
</style>
