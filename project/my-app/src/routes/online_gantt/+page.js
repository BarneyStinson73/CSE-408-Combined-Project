import { get } from 'svelte/store';
import { token } from '$lib/token.js';
export const ssr = false;
let task_id = 1;
export async function load() {
	// const redirectUrl = '/profile';
	const res = await fetch('http://localhost:3000/manager/project/Gantt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: get(token)
		},
        body: JSON.stringify({task_id})
	});

	if (res.ok) {
		const data = await res.json();
		console.log(data);
		if (data.success) {
			alert('Gantt data fetched successfully');
			// notifications = data;
			// location.reload();
		}
		return data;
	}
}
