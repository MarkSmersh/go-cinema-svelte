import { em, Ticket } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;

	const ticketData = await em.findOne(Ticket, slug, { populate: ['contact', 'place.cinema'] });

	if (!ticketData) {
		error(404, 'Nie ma takiego biletu.');
	}

	return {
		id: ticketData.id,
		firstname: ticketData.contact.firstName,
		surname: ticketData.contact.surname,
		phoneNumber: ticketData.contact.phoneNumber,
		col: ticketData.place.col,
		row: ticketData.place.row,
		cinema: ticketData.place.cinema.title,
		createdAt: ticketData.createdAt
	};
};
