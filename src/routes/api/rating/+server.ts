import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { em, Rating, Movie } from '$lib/server';

export const POST: RequestHandler = async ({ request }) => {
	const ratingData: RatingData = await request.json();

	if (ratingData.movie === undefined || ratingData.movie === null || !ratingData.value)
		error(400, 'Żądanie nie zawiera jednego lub wielu atrybutów: movie, value');

	console.log(ratingData.value);

	if (
		ratingData.value !== 1 &&
		ratingData.value !== 2 &&
		ratingData.value !== 3 &&
		ratingData.value !== 4 &&
		ratingData.value !== 5
	) {
		error(400, 'Miemożliwe wystawiać ocenę: ocena muszi być 1, 2, 3, 4 lub 5');
	}

	const movie = await em.findOne(Movie, ratingData.movie);

	if (!movie) {
		error(400, 'Miemożliwe wystawiać ocenę: za podanym ID nie ma filmu');
	}

	const newRating = em.create(Rating, {
		movie: em.getReference(Movie, ratingData.movie),
		value: ratingData.value,
		createdAt: new Date()
	});

	em.persistAndFlush(newRating);

	return new Response('Ocena jest wystawiona', { status: 201 });
};

interface RatingData {
	movie: number | null;
	value: number | null;
}
