import { createNotify } from './notify';

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
