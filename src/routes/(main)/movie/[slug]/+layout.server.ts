import { em, Movie, PlaceType } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const slug = params.slug;

	const m = await em.findOne(Movie, parseInt(slug), { populate: ['ratings.value'] });

	if (!m) {
		error(404, 'Nie mamy takiego filmu :(');
	}

	let rating = 0;

	m.ratings.getItems().forEach((r) => (rating += r.value));

	console.log(m.ratings.length);

	const placeTypes = (await em.findAll(PlaceType)).sort((a, b) => a.price - b.price);

	const movie = {
		id: m.id,
		title: m.title,
		description: m.descripton,
		year: m.year,
		rating: Math.round((rating / m.ratings.length) * 10) / 10,
		rates: m.ratings.length,
		from: placeTypes[0].price,
		to: placeTypes[placeTypes.length - 1].price
	};

	console.log(movie);

	return movie;
};
