import { em, Movie } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Cinema } from '$lib/server';

export const load: PageServerLoad = async ({ params }) => {
	const cinemasData = await em.findAll(Cinema, { populate: ['places.placeType'] });

	const cinemas = cinemasData.map((c) => {
		let places: { id: number; description: string; price: number }[][] = [];

		c.places
			.getItems()
			.sort((a, b) => a.col - b.col)
			.forEach((p) => {
				console.log(p);

				if (!places[p.row]) {
					places[p.row] = [];
				}

				places[p.row].push({
					id: p.id,
					description: p.placeType.description,
					price: p.placeType.price
				});
			});

		return {
			id: c.id,
			title: c.title,
			description: c.description,
			width: c.width,
			placesCount: c.places.getItems().length,
			// places: c.places.getItems().map((p) => {
			// 	return {
			// 		id: p.id,
			// 		description: p.placeType.description,
			// 		col: p.col,
			// 		row: p.row,
			// 		price: p.placeType.price
			// 	};
			// })
			places: places
		};
	});

	return {
		cinemas: cinemas
	};
};
