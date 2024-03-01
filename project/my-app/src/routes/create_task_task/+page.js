// import { get } from 'svelte/store';
// import { token } from '$lib/token.js';
// export const ssr = false;
// export async function load() {
// 	const res = await fetch('http://localhost:3000/manager/task_creation_form', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			authorization: get(token)
// 		}
// 	});
// 	if (res.status == 401) {
// 		return { status: 401 };
// 	}
// 	const data = await res.json();
// 	return data;
// }
import { get } from 'svelte/store';
import { token } from '$lib/token.js';
export const ssr = false;
let taskId = '';
export async function load() {
	const res = await fetch('http://localhost:3000/manager/task_creation_form_task', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// authorization: get(token)
			authorization: localStorage.getItem('token') || ''
		},
		body: JSON.stringify({ taskId })
	});
	if (res.status == 401) {
		return { status: 401 };
	}
	const data = await res.json();
	return data;
}
