<script>
	// import { token } from './../../lib/token.js';
	import { Card, Button, Label, Input, Checkbox, TextPlaceholder, Textarea } from 'flowbite-svelte';
	import { ButtonGroup, InputAddon, ToolbarButton } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import { token } from '$lib/token.js';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	let show = false;
	let show1 = false;
	let username = '';
	let password = '';

	async function login() {
		const redirecturl = '/homepage';
		const res = await fetch('http://localhost:3000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		if (res.ok) {
			const data = await res.json();
			console.log('After sign in', data);
			token.set(data.token);
			console.log('Set token', data.token);
			console.log(data);
			if (data.success) {
				goto(redirecturl);
			}
		}
	}
</script>

<div class="flex min-h-screen w-screen flex-row">
	<!-- <img src="/img/beams.jpg" alt="" class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" /> -->
	<!-- <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5  sm:max-w-lg sm:rounded-lg sm:px-10"> -->
	<Card class="flex h-screen  w-full ">
		<form class="m-auto flex w-full flex-col space-y-6 pt-10" on:submit|preventDefault={login}>
			<h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
			<Label class="space-y-2">
				<span>USERNAME</span>
				<Input type="text" name="userName" required bind:value={username} />
			</Label>
			<Label for="show-password" class="mb-2">Your password</Label>
			<Input
				id="show-password"
				type={show ? 'text' : 'password'}
				placeholder="Your password here"
				size="lg"
				bind:value={password}
			/>
			<div class="flex items-start">
				<a href="/" class="text-primary-700 dark:text-primary-500 ms-auto text-sm hover:underline">
					Forgot password?
				</a>
			</div>
			<Button type="submit" class="w-full">Login to your account</Button>
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Not registered? <a
					href="/register"
					class="text-primary-700 dark:text-primary-500 hover:underline"
				>
					Create account
				</a>
			</div>
		</form>
	</Card>
	<!-- </div> -->
	<div class="flex w-full flex-row">
		<img src="./static/login.jpg" alt="pp" />
	</div>
</div>

<div></div>
