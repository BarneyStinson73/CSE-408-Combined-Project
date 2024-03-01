import { get } from 'svelte/store';
import { token } from '$lib/token.js';
export const ssr = false;
export async function load() {
	console.log('before', localStorage.getItem('token'));
	const res = await fetch('http://localhost:3000/manager/profile', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// authorization: get(token)
			authorization: localStorage.getItem('token') || ''
		}
	});
	if (res.status == 401) {
		return { status: 401 };
	}
	const data = await res.json();
	console.log(data);
	console.log('after', localStorage.getItem('token'));
	return data;
}
