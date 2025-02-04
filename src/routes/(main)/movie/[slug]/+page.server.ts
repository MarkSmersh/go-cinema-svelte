import { em, Movie } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;

	const m = await em.findOne(Movie, parseInt(slug), { populate: ['ratings.value'] });

	if (!m) {
		error(404, 'Nie mamy takiego filmu :(');
	}

	let rating = 0;

	m.ratings.getItems().forEach((r) => (rating += r.value));

	console.log(m.ratings.length);

	const movie = {
		id: m.id,
		title: m.title,
		description: m.descripton,
		year: m.year,
		rating: Math.round((rating / m.ratings.length) * 10) / 10,
		rates: m.ratings.length
	};

	console.log(movie);

	return movie;
};
