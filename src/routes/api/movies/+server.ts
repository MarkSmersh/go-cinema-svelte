import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { em, Movie } from '$lib/server';

export const POST: RequestHandler = async ({ request }) => {
	const movies: MovieData[] = await request.json();

	let counter = 0;

	if (movies.length === 0) {
		error(400, 'Żadanie jest nieprawidlowe.');
	}

	movies.forEach((m) => {
		counter++;

		if (!m.title || !m.description || !m.year)
			error(
				400,
				`W wierszu #${counter} brakuje jednego lub wiele atrybutów. W wierszu muszą być następne atrybuty: title, description, year`
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
