<!-- <script>
	import {
		Card,
		Button,
		Modal,
		Label,
		Input,
		Select,
		MultiSelect,
		Progressbar
	} from 'flowbite-svelte';
	export let project;
	let projectModal = false;
	let formModal = false;
	let project_id;
	let project_details = [];
	let task_name = '';
	let selected_manager = '';
</script>

<div class="grid md:grid-cols-2">
	<div class="mr-20">
		<Card class="m-auto w-full">
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
						projectModal = true;
						project_id = project.projectId;
						project_details = project_task_details();
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
							<Input type="date" id="last_name" placeholder="Doe" required bind:value={deadline} />
						</div>
					</div>
					<Button type="submit">Submit</Button>
				</form>
			</Modal>
		</Card>
	</div>
	<Modal title="Tasks" bind:open={projectModal} autoclose={false} outsideclose>
		<div class="grid grid-cols-2 gap-4">
			{#each project_details as proj}
				<Card class="m-auto w-full">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{proj.taskName}
					</h5>
					<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
						Deadline: {proj.deadline}
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
								defaultModal = true; // Set to true without quotes
								selected_task_id = proj.taskId;
								console.log('Selected task ID:', selected_task_id);
								showing_tasks = tasks2;
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
</div> -->
