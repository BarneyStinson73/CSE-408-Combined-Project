<script>
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		Label,
		Input,
		Checkbox,
		A
	} from 'flowbite-svelte';
	import {
		LockOpenSolid,
		GridSolid,
		MailBoxSolid,
		UserSolid,
		FireSolid
	} from 'flowbite-svelte-icons';
	import { Tooltip } from 'flowbite-svelte';
	import {
		Card,
		Dropdown,
		DropdownItem,
		Avatar,
		Button,
		Select,
		MultiSelect
	} from 'flowbite-svelte';

	import { Modal } from 'flowbite-svelte';
	import { Jumper } from 'svelte-loading-spinners';

	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { token } from '$lib/token.js';
	// import { get } from 'svelte/store';
	// import { goto } from '$app/navigation'`;

	let defModal = false;
	let fModal = false;
	let defaultModal = false;
	let projectModal = false;
	let formModal = false;
	let placement = 'right';
	let task_name = '',
		start_date = '',
		deadline = '';
	// let count=[1,2,3];
	let projectData = $page.data.project_data;
	let count = projectData.length;
	import { Progressbar } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// let name = "John Doe";
	let name = $page.data.user_data[0].userName;
	let user_email = $page.data.user_data[0].email;
	let contantNo = $page.data.user_data[0].contactNo;
	let Currently_available = $page.data.user_data[0].isAvailable;
	let type = $page.data.user_data[0].type;
	let tags = {};

	let autoClose = false;
	let isHovered = false;
	function handleHover() {
		isHovered = !isHovered;
	}

	let username = '';
	let email = '';
	let contact = '';
	let prev_password = '';
	let new_password = '';

	async function updatePassword() {
		const redirecturl = 'http://localhost:3000/manager/profile';
		const res = await fetch('http://localhost:3000/manager/update_password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({ prev_password, new_password })
		});

		if (res.ok) {
			const data = await res.json();
			// token.set(data.token);
			console.log('Update Password:', data);
			if (data.success) {
				alert('Password Updated Successfully');
				location.reload();
			}
		}
	}

	async function updateProfile() {
		//console.log("In update Profile");
		const redirecturl = '/profile';
		const res = await fetch('http://localhost:3000/manager/update_profile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// authorization: get(token)
				authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({ username, email, contact })
		});

		if (res.ok) {
			const data = await res.json();
			console.log('Update Profile:', data);
			if (data.success) {
				alert('Profile Updated Successfully');
				//goto(redirecturl);
				location.reload();
			}
		}
	}

	function calculateTagCounts(data) {
		const tags = {};
		data.forEach((project) => {
			const tagCounts = project.tagcounts;
			for (const tag in tagCounts) {
				if (tags[tag]) {
					tags[tag] += tagCounts[tag];
				} else {
					tags[tag] = tagCounts[tag];
				}
			}
		});
		return tags;
	}

	// Calculate tag counts
	const tagCounts = calculateTagCounts(projectData);
	tags = Object.entries(tagCounts).map(([tag, projects]) => ({ tag, projects }));

	console.log('Tags:', tags);
	let managers = [];
	let collaborators = [];
	let tasks = [];
	let tasks2 = [];
	let showing_tasks = tasks;
	let selected_manager = [];
	let selected_tag = [];
	let selected_collaborator = [];
	let selected_sp_collaborator = [];



	let sub_tasks = [];
	let task_creator = '';
	async function dependency_tasks_list(){
		const res = await fetch('http://localhost:3000/manager/task_details', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// authorization: get(token)
				authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({ task_creator })
		});

		if (res.ok) {
			const data = await res.json();
			// token.set(data.token);
			console.log('Dependency Tasks:', data);
			// console.log(data.success);
			if (data.success) {
				alert('Dependency tasks are retrieved');
			}
			return data.data;
		}
	
	}
	async function task_creation() {
		const res = await fetch('http://localhost:3000/manager/create_task', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// authorization: get(token)
				authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({
				task_name,
				selected_manager,
				selected_tag,
				selected_collaborator,
				start_date,
				deadline
			})
		});

		if (res.ok) {
			const data = await res.json();
			console.log('Task Creation:', data);
			if (data.success) {
				alert('Task Created Successfully');
				location.reload();
			}
		}
	}

	async function project_task_manager() {
		const res = await fetch('http://localhost:3000/manager/project_admins', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// authorization: get(token)
				authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({ managers })
		});

		if (res.ok) {
			const data = await res.json();
			token.set(data.token);
			console.log('Project Admins:', data);
			// console.log(data.success);
			if (data.success) {
				alert('Project admins are retrieved');
			}
		}
	}

	async function task_task_manager() {
		const res = await fetch('http://localhost:3000/manager/task_admins', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// authorization: get(token)
				authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({ managers })
		});

		if (res.ok) {
			const data = await res.json();
			token.set(data.token);
			console.log('Task Admins:', data);
			// console.log(data.success);
			if (data.success) {
				alert('Task admins are retrieved');
			}
		}
	}

	async function task_task_tags(){
		const res = await fetch('http://localhost:3000/manager/task_tags', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// authorization: get(token)
				authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({ tags })
		});

		if (res.ok) {
			const data = await res.json();
			token.set(data.token);
			console.log('Task Tags:', data);
			// console.log(data.success);
			if (data.success) {
				alert('Task tags are retrieved');
			}
		}

	}

	async function task_task_collaborators(){
		const res = await fetch('http://localhost:3000/manager/task_collaborators', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// authorization: get(token)
				authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({ collaborators })
		});

		if (res.ok) {
			const data = await res.json();
			token.set(data.token);
			console.log('Task Collaborators:', data);
			// console.log(data.success);
			if (data.success) {
				alert('Task collaborators are retrieved');
			}
		}
	}

	let selected_task_id = '';

	async function task_details() {
		const res = await fetch('http://localhost:3000/manager/task_details', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// authorization: get(token)
				authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({ task_id: selected_task_id })
		});

		if (res.ok) {
			const data = await res.json();
			// token.set(data.token);
			console.log('Task Details:', data);
			// console.log(data.success);
			if (data.success) {
				alert('Task details are retrieved');
			}
			return data.data;
		}
	}
	let project_id = 1;
	let token_now;

	onMount(() => {
		token_now = localStorage.getItem('token');
		console.log('Token On Mount:', token_now);
	});

	let project_details;

	async function project_task_details() {
		console.log('In project_task_details', project_id);
		console.log('Token Before:', token_now);
		console.log('Token Now:', localStorage.getItem('token'));
		const res = await fetch('http://localhost:3000/manager/project_task_details', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// authorization: get(token)
				authorization: localStorage.getItem('token')
			},
			body: JSON.stringify({ project_id })
		});

		console.log('Token After:', localStorage.getItem('token'));
		if (res.ok) {
			const data = await res.json();
			console.log(data);
			// token.set(data.token);
			// console.log(data.success);
			if (data.success) {
				alert('Project details are retrieved');
			}
			console.log('Retrieved results', data);
			console.log('Token After:', localStorage.getItem('token'));
			return data.data;
		}
	}
</script>

<div class="flex flex-row bg-gray-50">
	<div class="z-10 flex flex-row bg-yellow-50"></div>
	<div class="mt-10 basis-1/6 pl-10">
		<img
			src="http://thispix.com/wp-content/uploads/2015/06/passport-017.jpg"
			alt="Manager"
			class="imageSize"
		/>
	</div>
	<div class=" mt-8 pb-10">
		<p class="font-bold text-lg">Name:{name}</p>
		<p class="font-bold text-lg">Contact No:{contantNo}</p>
		<p class="font-bold text-lg">Status: {type.charAt(0).toUpperCase() + type.slice(1)}</p>
		<p class="font-bold text-lg">Email:{user_email}</p>
		<p class="font-bold text-lg">Currently Available:{Currently_available ? 'Yes' : 'No'}</p>
	</div>
</div>
<div class="flex flex-row">
	<div class=" sticky top-0 z-40 h-screen bg-slate-300 bg-white">
		<Sidebar>
			<SidebarWrapper>
				<SidebarGroup border>
					<button id="placement-4" on:mouseenter={() => (placement = 'right')}>
						<SidebarItem label="Expertise" class="mt-5 pb-5">
							<svelte:fragment slot="icon">
								<FireSolid
									class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</svelte:fragment>
						</SidebarItem></button
					>
					<Tooltip color="green" triggeredBy="[id^='placement-']" {placement}>
						{#each tags as tag}
							<div class="alignProper flex flex-col">
								<p>{tag.tag} &nbsp &nbsp {tag.projects}</p>
								<!-- <p>{tag.projects}</p> -->
							</div>
							<hr />
						{/each}
					</Tooltip>
					<SidebarGroup border></SidebarGroup>
					<button on:click={() => (defModal = true)}>
						<SidebarItem label="Update Profile" class="mt-5 pb-5">
							<svelte:fragment slot="icon">
								<UserSolid
									class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</svelte:fragment>
						</SidebarItem></button
					>
					<SidebarGroup border></SidebarGroup>
					<Modal
						bind:open={defModal}
						size="xs"
						autoclose={autoClose}
						outsideclose
						class="handleMargin w-full"
					>
						<form class="flex flex-col space-y-6" on:submit={updateProfile}>
							<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Profile</h3>
							<div class="mb-6 grid gap-6">
								<div>
									<Label for="last_name" class="mb-2">UserName</Label>
									<Input
										type="text"
										id="last_name"
										placeholder="Doe"
										required
										bind:value={username}
									/>
								</div>
							</div>
							<div>
								<Label for="contact" class="mb-2">contact number</Label>
								<!-- pattern={"[0-9]{3}-[0-9]{2}-[0-9]{3}"} -->
								<Input
									type="tel"
									id="contact"
									placeholder="123-45-678"
									required
									bind:value={contact}
								/>
							</div>
							<div class="mb-6">
								<Label for="email" class="mb-2">Email address</Label>
								<Input
									type="email"
									id="email"
									placeholder="john.doe@company.com"
									required
									bind:value={email}
								/>
							</div>
							<Checkbox class="mb-6 space-x-1 rtl:space-x-reverse" required>
								I agree with the terms and conditions.
							</Checkbox>
							<Button type="submit">Submit</Button>
						</form></Modal
					>

					<button on:click={() => (fModal = true)}>
						<SidebarItem label="Update Password" class="mt-5 pb-5">
							<svelte:fragment slot="icon">
								<LockOpenSolid
									class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</svelte:fragment>
						</SidebarItem></button
					>
					<Modal
						bind:open={fModal}
						size="xs"
						autoclose={false}
						outsideclose
						class="handleMargin w-full"
					>
						<form class="flex flex-col space-y-6" on:submit={updatePassword}>
							<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
								Update Password
							</h3>

							<div class="mb-6">
								<Label for="password" class="mb-2">Old Password</Label>
								<Input
									type="password"
									id="old_password"
									placeholder="•••••••••"
									required
									bind:value={prev_password}
								/>
							</div>
							<div class="mb-6">
								<Label for="new_password" class="mb-2">New password</Label>
								<Input
									type="password"
									id="new_password"
									placeholder="•••••••••"
									required
									bind:value={new_password}
								/>
							</div>

							<Checkbox class="mb-6 space-x-1 rtl:space-x-reverse" required>
								I agree with the <A
									href="/"
									class="text-primary-700 hover:underline dark:text-primary-600"
									>terms and conditions</A
								>.
							</Checkbox>
							<Button type="submit">Submit</Button>
						</form></Modal
					>

					<SidebarGroup border></SidebarGroup>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</div>
	<div class="mx-10 my-10 grid flex-grow auto-rows-min grid-cols-3 gap-2">
		{#each projectData as project, i}
			{#if i < count}
				<Card class="w-full max-w-full">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{project.projectName}
					</h5>
					<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
						Deadline:
						{new Date(project.deadline).toLocaleTimeString([], {
							hour: 'numeric',
							minute: 'numeric'
						}) +
							', ' +
							new Date(project.deadline).toLocaleDateString([], {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							})}
					</p>

					<Progressbar
						progress={project.progression}
						size="h-4"
						labelInside
						style="background-color: lime"
					/>
					<br />
					<div class="grid grid-cols-2 gap-4">
						<Button
							class="w-fit"
							style="background-color: green"
							on:click={() => {
								project_id = project.projectId;
								project_task_details().then((data) => {
									console.log('Project Details After Button Click:', data);
									project_details = data;
									projectModal = true;
								});
							}}
						>
							Details <ArrowRightOutline class="ms-2 h-3.5 w-3.5 text-white" />
						</Button>
						<Button on:click={() => (formModal = true)}>Create New Task</Button>
					</div>
					<Modal bind:open={formModal} size="md" autoclose={false} class="w-full">
						<form class="h-full rounded bg-blue-100 px-10" on:submit|preventDefault={task_creation}>
							<h1 class="text-center">New Task</h1>
							<hr />
							<div class="my-4">
								<Label for="email" class="mb-2">Task Name</Label>
								<Input
									type="text"
									id="name"
									placeholder="Sample Task"
									required
									bind:value={task_name}
								/>
							</div>
							<div class="my-6">
								<Label
									>Task Manager
									<Select class="mt-2" items={managers} bind:value={selected_manager} />
								</Label>
							</div>
							<div class="mb-6">
								<Label for="last_name" class="mb-2">Tags</Label>
								<MultiSelect items={tags} bind:value={selected_tag} />
							</div>
							<div class="mb-6">
								<Label for="last_name" class="mb-2">Collaborators</Label>
								<MultiSelect items={collaborators} bind:value={selected_collaborator} />
							</div>
							<div class="mb-4 grid gap-6 md:grid-cols-2">
								<div>
									<Label for="last_name" class="mb-2">Start Date</Label>
									<Input
										type="date"
										id="last_name"
										placeholder="Doe"
										required
										bind:value={start_date}
									/>
								</div>
								<div>
									<Label for="last_name" class="mb-2">Expiration Date</Label>
									<Input
										type="date"
										id="last_name"
										placeholder="Doe"
										required
										bind:value={deadline}
									/>
								</div>
							</div>
							<Button type="submit">Submit</Button>
						</form>
					</Modal>
				</Card>
			{/if}
		{/each}
	</div>
</div>

<Modal title="Tasks" bind:open={defaultModal} autoclose={false} outsideclose>
	<div class="grid grid-cols-2 gap-4">
		{#each showing_tasks as task}
			<Card class="m-auto w-full max-w-full">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{task.taskName}
				</h5>
				<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
					Deadline:
					{new Date(task.deadline).toLocaleTimeString([], {
						hour: 'numeric',
						minute: 'numeric'
					}) +
						', ' +
						new Date(task.deadline).toLocaleDateString([], {
							day: 'numeric',
							month: 'long',
							year: 'numeric'
						})}
				</p>

				<Progressbar
					progress={task.progress}
					size="h-4"
					labelInside
					style="background-color: lime"
				/>
				<br />
				<div class="grid grid-cols-2 gap-4">
					<Button
						class="w-fit"
						style="background-color: green"
						on:click={() => {
							// selected_task_id = task.taskId;
							// console.log('Selected task ID:', selected_task_id);
							// task_details().then((data)=>{
							// 	console.log('working on retrieving child tasks',data);
							// 	tasks = data;
							// 	defaultModal = true;
							// })
						}}>Details</Button
					>

					<Button class="w-fit" style="background-color: red" on:click={() => (formModal = true)}
						>Create New</Button
					>
				</div>
			</Card>
		{/each}
	</div></Modal
>

<Modal title="Tasks" bind:open={projectModal} autoclose={false} outsideclose>
	<div class="grid grid-cols-2 gap-4">
		{#if project_details}
			{#each project_details as proj}
				<Card class="m-auto w-full max-w-full">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{proj.taskName}
					</h5>
					<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
						Deadline:

						{new Date(proj.deadline).toLocaleTimeString([], {
							hour: 'numeric',
							minute: 'numeric'
						}) +
							', ' +
							new Date(proj.deadline).toLocaleDateString([], {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							})}
					</p>

					<Progressbar
						progress={proj.progression}
						size="h-4"
						labelInside
						style="background-color: lime"
					/>
					<br />
					<div class="grid grid-cols-2 gap-4">
						<Button
							class="w-fit"
							style="background-color: green"
							on:click={() => {
								// defaultModal = true; // Set to true without quotes
								selected_task_id = proj.taskId;
								console.log('Selected task ID:', selected_task_id);
								// showing_tasks = tasks2;
								console.log('Tasks:', tasks2);
								console.log('showing_tasks:', showing_tasks);
								console.log('Project:', proj);
								if (proj.isLeaf) {
									goto('/Kanban_Board/' + proj.parentId);
								} else {
									task_details().then((data) => {
										console.log('working on retrieving child tasks', data);
										showing_tasks = data;
										project_details = data;
										// projectModal = false;
										// defaultModal = true;
									});
								}
							}}>Details</Button
						>

						<Button class="w-fit" style="background-color: red" on:click={() => (formModal = true)}
							>Create New</Button
						>
					</div>
				</Card>
			{/each}
		{/if}
	</div></Modal
>

<!-- 
selected_task_id = task.taskId;
							// console.log('Selected task ID:', selected_task_id);
							

							task_details().then((data)=>{
								console.log('working on retrieving child tasks',data);
								tasks = data;
								defaultModal = true;
							}) -->

<style>
	.imageSize {
		width: 150px;
		height: 100 px;
		border-radius: 50%;
		padding-left: 10 px;
	}
</style>
