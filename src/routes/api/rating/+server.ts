import type { RequestHandler } from './$types';
import { em, Rating, Movie } from '$lib/server';

export const POST: RequestHandler = async ({ request }) => {
	const ratingData: RatingData = await request.json();

	if (ratingData.movie === undefined || ratingData.movie === null || !ratingData.value)
		return new Response('Miemożliwe wystawiać ocenę: ocena muszi być 1, 2, 3, 4 lub 5', {
			status: 400
		});
	console.log(ratingData.value);

	if (
		ratingData.value !== 1 &&
		ratingData.value !== 2 &&
		ratingData.value !== 3 &&
		ratingData.value !== 4 &&
		ratingData.value !== 5
	) {
		return new Response('Miemożliwe wystawiać ocenę: ocena muszi być 1, 2, 3, 4 lub 5', {
			status: 400
		});
	}

	const movie = await em.findOne(Movie, ratingData.movie);

	if (!movie) {
		return new Response('Miemożliwe wystawiać ocenę: za podanym ID nie ma filmu', { status: 400 });
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
