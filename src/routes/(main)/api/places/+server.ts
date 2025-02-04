import type { RequestHandler } from './$types';
import { em, PlaceType } from '$lib/server';

export const POST: RequestHandler = async ({ request }) => {
	const placesData: PlaceData[] = await request.json();

	if (placesData.length === 0) {
		return new Response('Żądanie jest nieprawidlowe', { status: 400 });
	}

	let counter = 0;

	placesData.forEach((p, i) => {
		if (!p.description || !p.price) {
			return new Response(
				`W wierszu #${i + 1} nie ma jednego lub wielu atrybutów: price, description`,
				{ status: 400 }
			);
		}

		const place = em.create(PlaceType, {
			price: p.price,
			description: p.description
		});

		em.persist(place);
		counter++;
	});

	await em.flush();

	return new Response(`Było dodano o ${counter} miejść do bazy danych`, { status: 201 });
};

interface PlaceData {
	price: number | null;
	description: string | null;
}
