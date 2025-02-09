<script lang="ts">
	import type { PageProps } from './$types';
	import cinemaImg from '$lib/assets/cinema.jpg';
	import Pagination from '$lib/components/Pagination.svelte';
	import Rating from '$lib/components/Rating.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { request } from '$lib';
	import { goto } from '$app/navigation';
	import placeholder from '$lib/assets/placeholder.png';

	let { data }: PageProps = $props();
	let cinemaId: number = $state(0);
	let placeId: number | null = $state(null);
	let place = $derived.by(() => {
		if (placeId !== null) {
			for (let i = 0; i < data.cinemas[cinemaId].places.length; i++) {
				const p = data.cinemas[cinemaId].places[i].find((p) => p.id === placeId);
				if (p !== undefined) {
					return p;
				}
			}
		} else {
			return undefined;
		}
	});
	let firstname = $state('');
	let surname = $state('');
	let phoneNumber = $state('');

	function setCinema(c: number) {
		cinemaId = c;
		placeId = null;
	}

	async function createTicket(
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) {
		e.preventDefault();

		const res = await request(
			'/api/ticket',
			'POST',
			JSON.stringify({
				place: placeId,
				firstname: firstname,
				surname: surname,
				phoneNumber: phoneNumber
			})
		);

		goto(res.url);
	}
</script>

<main>
	<div>
		<div style:background={`url(${placeholder})`} class="movie">
			<div class="text">
				<h1>{data.title}</h1>
				<p>{data.description}</p>
				<p>Rok: {data.year}</p>
				<div class="rating">
					<Rating value={data.rating} count={data.rates} onClick={() => {}} />
				</div>
			</div>
		</div>
		<div style:background={`url(${cinemaImg})`} class="cinemas">
			<div class="text">
				<h1>{data.cinemas[cinemaId].title}</h1>
				<p>{data.cinemas[cinemaId].description}</p>
				<h3>Szerokość sali: {data.cinemas[cinemaId].width}</h3>
				<h3>Ogólna ilość miejśc: {data.cinemas[cinemaId].placesCount}</h3>
			</div>
			<div class="control">
				<Pagination slug={cinemaId} steps={data.cinemas.length} onStep={(s) => setCinema(s)} />
			</div>
		</div>
		<div class="place-selector">
			<div class="cinema">
				<div class="places">
					{#each data.cinemas[cinemaId].places as r}
						<div class="row">
							{#each r as c}
								<button
									class:active={c.id === placeId}
									class:busy={c.isBusy}
									disabled={c.isBusy}
									onclick={() => (placeId = c.id)}
									class="place"
								>
									<Icon name="fa-chair" color="white" />
								</button>
							{/each}
						</div>
					{/each}
				</div>
				<div class="screen">
					<div class="display">Ekran</div>
				</div>
			</div>
			<div class="info">
				<h2>Informacja o miejścu</h2>
				{#if place !== undefined}
					{#if place.isBusy}
						<h2>Jest zajęte</h2>
					{/if}
					<h3>Identyfikator miejśca: {place.id}</h3>
					<h3>Wiersz: {place.row}</h3>
					<h3>Kolumna: {place.col}</h3>
					<p>{place.description}</p>
					<h2>Cena: {place.price} zł</h2>
				{:else}
					<p>Aby zobaczyc informację o miejścu najpierw musi być wybrane</p>
				{/if}
			</div>
		</div>
		<div class="contact">
			<form onsubmit={(e) => createTicket(e)}>
				<div class="inputs">
					<label>
						Imię
						<input
							bind:value={firstname}
							type="text"
							autocomplete="given-name"
							name="firstname"
							required
						/>
					</label>
					<label>
						Nazwisko
						<input
							bind:value={surname}
							type="text"
							autocomplete="family-name"
							name="surname"
							required
						/>
					</label>
					<label>
						Numer telefonu (przykład: 123456789)
						<input
							bind:value={phoneNumber}
							type="tel"
							pattern="(\+?[0-9]+\ ?)?([0-9]{9})"
							autocomplete="tel"
							required
						/>
					</label>
				</div>
				<div class="summary">
					<div class="info">
						<h1>Podsumowanie</h1>
						<h3>Film: {data.title} (rok: {data.year})</h3>
						<h3>Kinoteatr: {data.cinemas[cinemaId].title}</h3>
						{#if place}
							<h2>Miesjce:</h2>
							<h3>Kolumna: {place.col}</h3>
							<h3>Wiersz: {place.row}</h3>
							<h3>Identyfikator: {place.id}</h3>
						{/if}
						{#if firstname && surname && phoneNumber}
							<h2>Dane kontaktowe:</h2>
							<h3>Imię: {firstname}</h3>
							<h3>Nazwisko: {surname}</h3>
							<h3>Numer telefonu: {phoneNumber}</h3>
						{/if}
					</div>
					{#if place && firstname && surname && phoneNumber}
						<button type="submit">
							<Icon name={'fa-ticket'} size={20} />
							Zarezerwować ({place.price} zł)
						</button>
					{/if}
				</div>
			</form>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}

	.movie {
		height: calc(100vh - 100px);
		display: flex;
		padding: 50px;
		background-size: cover !important;
		background-position: center !important;
		justify-content: center;
		align-items: end;
	}

	.rating {
		display: flex;
		justify-content: center;
	}

	.cinemas {
		height: calc(100vh - 100px);
		display: flex;
		padding: 50px;
		background-size: cover !important;
		background-position: center !important;
		justify-content: end;
		align-items: center;
		flex-direction: column;
		gap: 50px;
	}

	.text {
		padding: 32px;
		color: var(--primary-text);
		backdrop-filter: blur(10px) brightness(40%);
		border-radius: var(--br);
		text-align: center;
		width: calc(100% - 64px);
		display: flex;
		flex-direction: column;
		gap: 8px;

		p {
			margin-bottom: 8px;
		}
	}

	.control {
		width: 100%;
	}

	.place-selector {
		height: calc(100vh - 200px);
		padding: 100px;
		display: grid;
		grid: auto / 1fr 1fr;
		gap: 32px;
	}

	.cinema {
		border: 2px solid var(--primary);
		border-radius: var(--br);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.screen {
		height: 80px;
		background: var(--primary);
		display: flex;
		justify-content: center;
		align-items: center;

		.display {
			height: 20px;
			width: calc(100% - 40px);
			background-color: #ffffff;
			text-align: center;
			border-radius: var(--br);
		}
	}

	.places {
		flex-wrap: nowrap;
		display: flex;
		flex-direction: column-reverse;
		gap: 8px;
		align-items: center;

		.row {
			display: flex;
			gap: 4px;

			button {
				padding: 4px;
				border-radius: var(--br);
				background-color: var(--primary);
				cursor: pointer;
				border: 2px solid var(--primary);
			}
		}
	}

	.info {
		color: var(--secondary-text);
		display: flex;
		flex-direction: column;
		gap: 8px;

		h2 {
			margin-top: 10px;
		}
	}

	.active {
		background-color: var(--secondary) !important;
	}

	.busy {
		cursor: not-allowed !important;
		border: 2px solid red !important;
	}

	.contact {
		height: calc(100vh - 250px);
		padding: 125px 100px;

		form {
			display: grid;
			grid: auto / 1fr 1fr;
			height: 100%;
			gap: 32px;

			.inputs {
				display: flex;
				flex-direction: column;
				gap: 32px;
				justify-content: center;
				height: 100%;
				background-color: var(--primary);
				border-radius: var(--br);
				padding: 16px;

				label {
					display: flex;
					flex-direction: column;
					gap: 16px;
					color: var(--secondary-text);
					font-weight: 600;
					font-size: 18px;

					input {
						padding: 8px;
						border-radius: var(--br);
					}
				}
			}

			.summary {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 100%;
				flex: 1;

				button {
					border-radius: var(--br);
					padding: 16px 0px;
					border: 2px solid var(--primary);
					background: var(--primary);
					color: var(--primary-text);
					text-align: center;
					display: flex;
					justify-content: center;
					gap: 8px;
					align-items: center;
					font-weight: 600;
					font-size: 16px;
					cursor: pointer;
				}

				button:hover {
					background: var(--secondary);
				}
			}
		}
	}

	@media screen and (max-width: 800px) {
		.place-selector {
			height: fit-content;
			display: flex;
			flex-direction: column;
			padding: 50px 10px;

			.cinema {
				height: fit-content;
				/*TODO: Solve it in more appropriate way*/
				scale: 80%;
			}
		}

		.contact {
			padding: 50px 10px;

			form {
				width: 100%;
				display: flex;
				flex-direction: column;

				.summary {
					gap: 32px;
				}
			}
		}
	}
</style>
