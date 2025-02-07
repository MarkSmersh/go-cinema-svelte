import type { RequestHandler } from './$types';
import { Contact, em, Ticket, Place } from '$lib/server';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const ticketData: TicketData = await request.json();

	if (
		ticketData.place === undefined ||
		ticketData.place === null ||
		!ticketData.surname ||
		!ticketData.firstname ||
		!ticketData.phoneNumber
	) {
		return new Response(
			'Żądanie nie zawiera jednego lub wielu atrubytów: place, firstname, surname, phoneNumber',
			{ status: 400 }
		);
	}

	const place = await em.findOne(Place, ticketData.place);

	if (!place) {
		return new Response('Niemożliwe stworzyć bilet: brak miejśca z podanym ID', { status: 400 });
	}

	if (place.ticket) {
		return new Response('Niemożliwe stworzyć bilet: miejsce jest już zajęte', { status: 400 });
	}

	const contact = em.create(Contact, {
		firstName: ticketData.firstname,
		surname: ticketData.surname,
		phoneNumber: ticketData.phoneNumber
	});

	em.persist(contact);

	const ticket = em.create(Ticket, {
		id: crypto.randomUUID(),
		place: em.getReference(Place, place.id),
		contact: contact,
		createdAt: new Date()
	});

	place.ticket = ticket;

	em.persistAndFlush(ticket);

	redirect(301, `/ticket/${ticket.id}`);
};

interface TicketData {
	place: number | null;
	firstname: string | null;
	surname: string | null;
	phoneNumber: string | null;
}
