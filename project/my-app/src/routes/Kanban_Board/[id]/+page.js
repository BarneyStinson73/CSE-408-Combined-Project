import { get } from 'svelte/store';
import { token } from '$lib/token.js';
export const ssr = false;
export async function load({ params }) {
	let task_id = params.id;
	// const redirectUrl = '/profile';
	const res = await fetch('http://localhost:3000/manager/all_leaf_tasks', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// authorization: get(token)
			authorization: localStorage.getItem('token') || ''
		},
		body: JSON.stringify({ task_id: task_id })
	});

	if (res.ok) {
		const data = await res.json();
		console.log(data);
		
		if (data.success) {
			alert('All leaf fetched successfully');
			// notifications = data;
			// location.reload();
		}
		return data;
	}
}
