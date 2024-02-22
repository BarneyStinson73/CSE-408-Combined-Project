import { get } from 'svelte/store';
import { token } from '$lib/token.js';
export const ssr = false;
export async function load() {
	// const redirectUrl = '/profile';
	const res = await fetch('http://localhost:3000/manager/notifications', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: get(token)
		}
	});

	if (res.ok) {
		const data = await res.json();
		console.log(data);
		if (data.success) {
			alert('Notifications fetched successfully');
			// notifications = data;
			// location.reload();
		} 
        return data;
	}
}
