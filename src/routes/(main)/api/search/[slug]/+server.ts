import { em, Movie } from '$lib/server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const slug = params.slug;

	const moviesDb = await em.findAll(Movie, {
		where: {
			title: {
				$ilike: `%${slug}%`
			}
		},
		populate: ['ratings'],
		limit: 10
	});

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

	return new Response(JSON.stringify(movies));
};
