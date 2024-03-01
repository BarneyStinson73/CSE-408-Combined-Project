<script>
	import { onMount } from 'svelte';
	// onMount(() => {
	//     console.log('The component has mounted');
	//     const request  = new Request('http://localhost:3000/manager/profile', {
	//         method: 'POST',
	//         headers: {
	//             'Content-Type': 'application/json',
	//             'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzA3NDk5MTk0LCJleHAiOjE3MDc1ODU1OTR9.IFuH0YJ9CJWaHrZCYlIH-dvAdwYylBCQ06ftCCBxzgc'
	//         },
	//         body: JSON.stringify({
	//             "id": 2,
	//         })
	//     });
	//     fetch(request)
	//         .then(response => response.json())
	//         .then(data => console.log(data))
	//         .catch(error => console.log(error));
	// });

	onMount(() => {
		// console.log('The component has mounted');
		// const request  = new Request('http://localhost:3000/login', {
		//     method: 'POST',
		//     headers: {
		//         'Content-Type': 'application/json',
		//     },
		//     body: JSON.stringify({
		//         "username": "User1",
		//         "password": "12345"
		//     })
		// });
		// fetch(request)
		//     .then(response => response.json())
		//     .then(data => {console.log(data); localStorage.setItem('token', data.token);})
		//     .catch(error => console.log(error));
		// console.log('token', localStorage.getItem('token'));
	});
</script>
