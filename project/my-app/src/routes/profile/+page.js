import { get } from 'svelte/store';
import { token } from '$lib/token.js';
export const ssr = false;
export async function load() {
	const res = await fetch('http://localhost:3000/manager/profile', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: get(token)
		}
	});
	if (res.status == 401) {
		return { status: 401 };
	}
	const data = await res.json();
	console.log(data);
	return data;
}
