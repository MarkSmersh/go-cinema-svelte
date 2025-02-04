import type { RequestHandler } from './$types';
import { em, Cinema, Place, PlaceType } from '$lib/server';

export const POST: RequestHandler = async ({ request }) => {
	const cinemasData: CinemaData[] = await request.json();

	if (cinemasData.length === 0) {
		return new Response('Żądanie jest nieprawidlowe', { status: 400 });
	}

	let counter = 0;

	for (let ci = 0; ci < cinemasData.length; ci++) {
		const c = cinemasData[ci];

		if (!c.title || !c.description || !c.width || c.places.length === 0) {
			return new Response(
				`Wiersz #${ci} cinema nie zawiera jednego lub wielu atrubutów: title, description, width, places`,
				{ status: 400 }
			);
		}

		const cinema = em.create(Cinema, {
			title: c.title,
			description: c.description,
			width: c.width
		});

		em.persist(cinema);

		for (let ri = 0; ri < c.places.length; ri++) {
			const r = c.places[ri];

			if (r.length !== c.width) {
				return new Response(
					`W cinema #${ci}, w wierszu #${ri} ilość mieśc nie jest równa szerokośći cinema (${c.width})`,
					{ status: 400 }
				);
			}

			for (let cli = 0; cli < r.length; cli++) {
				const cl = r[cli];

				const placeType = await em.findOne(PlaceType, cl);

				if (!placeType) {
					return new Response(
						`W kolumnie #${cli}, wiersz #${ri} place nie istieje placeType z id #${cli}`,
						{
							status: 400
						}
					);
				}

				const place = em.create(Place, {
					placeType: em.getReference(PlaceType, cl),
					row: ri,
					col: cli,
					cinema: cinema
				});

				em.persist(place);
			}
		}

		counter++;
	}

	await em.flush();

	return new Response(`Było dodano o ${counter} cinema do bazy danych`, { status: 201 });
};

interface CinemaData {
	title: string | null;
	description: string | null;
	width: number | null;
	places: number[][];
}
