import { createNotify } from './notify';
import { invalidateAll } from '$app/navigation';

export interface LocalTicket {
	id: string;
	date: string;
}

export async function request(
	url: string,
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
	body: string | null = null
) {
	const res = await fetch(url, {
		method: method,
		headers: body
			? {
					'Content-Type': 'application/json'
				}
			: {},
		body: body
	});

	const text = await res.text();

	createNotify({
		message: text,
		status: res.status
	});

	return res;
}

export async function sendRating(m: number, r: number) {
	await request(
		'/api/rating',
		'POST',
		JSON.stringify({
			movie: m,
			value: r
		})
	);

	await invalidateAll();
}
