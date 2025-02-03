import { em, Movie } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = parseInt(params.slug);
	const offset = 12 * slug;

	const moviesDb = await em.find(
		Movie,
		{},
		{
			limit: 12,
			offset: offset,
			populate: ['ratings.value']
		}
	);

	console.log(moviesDb);

	const count = em.count(Movie);

	if (moviesDb.length === 0) {
		error(400, 'Za dużo poszedł');
	}

	const movies = moviesDb.map((m) => {
		let rating = 0;

		m.ratings.getItems().forEach((r) => (rating += r.value));

		return {
			id: m.id,
			title: m.title,
			description: m.descripton,
			year: m.year,
			rating: Math.round((rating / m.ratings.length) * 10) / 10,
			rates: m.ratings.length
		};
	});

	console.log(movies);

	return {
		movies: movies,
		count: count
	};
};
