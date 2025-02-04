import type { RequestHandler } from './$types';
import { em, Movie } from '$lib/server';

export const POST: RequestHandler = async ({ request }) => {
	const movies: MovieData[] = await request.json();

	let counter = 0;

	if (movies.length === 0) {
		return new Response('Żądanie jest nieprawidlowe', { status: 400 });
	}

	movies.forEach((m) => {
		counter++;

		if (!m.title || !m.description || !m.year)
			return new Response(
				`W wierszu #${counter} brakuje jednego lub wiele atrybutów. W wierszu muszą być następne atrybuty: title, description, year`,
				{ status: 400 }
			);

		const movie = em.create(Movie, {
			title: m.title,
			descripton: m.description,
			year: m.year
		});

		em.persist(movie);
	});

	await em.flush();

	return new Response(`Do bazy danych jest dodano ${counter} filmów`, { status: 201 });
};

interface MovieData {
	title: string | null;
	description: string | null;
	year: number | null;
}
