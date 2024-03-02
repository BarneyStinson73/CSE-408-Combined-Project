<!-- Inspiration https://s3-ap-southeast-2.amazonaws.com/focusbooster.cdn/Landing+pages/kanban-and-focusbooster/kanban-board-notion.png -->
<script>
	import { page } from '$app/stores';

	import {
		BottomNav,
		BottomNavItem,
		Tooltip,
		Skeleton,
		ImagePlaceholder,
		Button,
		Sidebar,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';
	import {
		HomeSolid,
		WalletSolid,
		AdjustmentsVerticalOutline,
		UserCircleSolid,
		PlusSolid
	} from 'flowbite-svelte-icons';
	import { ArrowRightFromBracketSolid } from 'svelte-awesome-icons';
	import NavbarModule from './NavbarModule.svelte';

	let data = $page.data.data;

	let todo = data.todo;
	console.log(todo);
	let complete = data.completed;
	console.log(complete);
	let inProgress = data.inprogress;
	console.log(inProgress);
	function handlePushtoProgress(t) {
		todo = todo.filter((obj) => obj.id !== t.id);
		let tempObj = { id: t.id, taskName: t.taskName, deadline: t.deadline };
		inProgress = [...inProgress, tempObj];
	}

	function handlePushtoComplete(t) {
		inProgress = inProgress.filter((obj) => obj.taskName !== t.taskName);
		let tempObj = { id: t.id, taskName: t.taskName, deadline: t.deadline };
		complete = [...complete, tempObj];
	}

	let tasks = [];
</script>

<NavbarModule />
<div class="w-screen text-5xl font-bold">Kanban Board</div>

<div class="h-screen p-2">
	<div class="grid grid-cols-3 gap-5">
		<!-- To-do -->
		<div class="rounded bg-white px-2 py-2">
			<!-- board category header -->
			<div class="mx-1 mb-2 flex flex-row items-center justify-between">
				<div class="flex items-center">
					<h2 class="mr-2 w-max rounded bg-red-100 px-1 text-lg font-bold text-gray-700">To-do</h2>
					<p class="text-sm text-gray-400">{todo.length}</p>
				</div>
			</div>
			<!-- board card -->

			<div class="grid grid-rows-2 gap-2">
				{#each todo as t}
					<div class="relative rounded border-2 border-gray-100 p-2 shadow-sm">
						<!-- <p class="bg-red-100 text-xs w-max p-1 rounded mr-2 text-gray-700">To-do</p> -->
						<div class="mt-2 flex flex-row items-center">
							<div class="mr-3 h-4 w-4 rounded-full bg-gray-300"></div>
							<div class="text-md text-xs font-semibold text-gray-500">
								Name of Task: {t.taskName}
							</div>
						</div>
						<p class="mt-2 text-xs text-gray-500">
							Deadline :
							{new Date(t.deadline).toLocaleTimeString([], {
								hour: 'numeric',
								minute: 'numeric'
							}) +
								', ' +
								new Date(t.deadline).toLocaleDateString([], {
									day: 'numeric',
									month: 'long',
									year: 'numeric'
								})}

							<!-- <button class="absolute bottom-0 right-0" on:click={()=>handlePushtoProgress(t)}>
                
                Push</button> -->
						</p>
						<ArrowRightFromBracketSolid
							class="absolute bottom-0 right-0 h-5 w-5"
							on:click={() => handlePushtoComplete(t)}
						/>
					</div>
				{/each}
			</div>

			<div class="mt-2 flex flex-row items-center px-1 text-gray-300">
				<Button>
					<PlusSolid class="me-2 h-3 w-3" />
					Add Task
				</Button>
			</div>
		</div>

		<!-- In Progress -->
		<div class="rounded bg-white px-2 py-2">
			<div class="mx-1 mb-2 flex flex-row items-center justify-between">
				<div class="flex items-center">
					<h2 class="mr-2 w-max rounded bg-yellow-100 px-1 text-lg font-bold text-gray-700">
						In Progress
					</h2>
					<p class="text-sm text-gray-400">{inProgress.length}</p>
				</div>
			</div>
			<div class="grid grid-rows-2 gap-2">
				{#each inProgress as p}
					<div class="relative rounded border-2 border-gray-100 p-2 shadow-sm">
						<div class="mt-2 flex flex-row items-center">
							<div class="mr-3 h-4 w-4 rounded-full bg-gray-300"></div>
							<div class="text-md font-semibold text-gray-500">Name of Task: {p.taskName}</div>
						</div>
						<p class="mt-2 text-xs text-gray-500">
							Deadline:
							{new Date(p.deadline).toLocaleTimeString([], {
								hour: 'numeric',
								minute: 'numeric'
							}) +
								', ' +
								new Date(p.deadline).toLocaleDateString([], {
									day: 'numeric',
									month: 'long',
									year: 'numeric'
								})}
						</p>
						<ArrowRightFromBracketSolid
							class="absolute bottom-0 right-0 h-5 w-5"
							on:click={() => handlePushtoComplete(p)}
						/>
					</div>
				{/each}
			</div>
		</div>

		<!-- Complete Kanban -->
		<div class="rounded bg-white px-2 py-2">
			<!-- board category header -->
			<div class="mx-1 mb-2 flex flex-row items-center justify-between">
				<div class="flex items-center">
					<h2 class="mr-2 w-max rounded bg-green-100 px-1 text-lg font-bold text-gray-700">
						Complete
					</h2>
					<p class="text-sm text-gray-400">{complete.length}</p>
				</div>
			</div>
			<!-- board card -->
			<div class="grid grid-rows-2 gap-2">
				{#each complete as c}
					<div class="rounded border-2 border-gray-100 p-2 shadow-sm">
						<!-- <p class="bg-green-100 text-xs w-max p-1 rounded mr-2 text-gray-700">Complete</p> -->
						<div class="mt-2 flex flex-row items-center">
							<div class="mr-3 h-4 w-4 rounded-full bg-gray-300"></div>
							<div class="text-md font-semibold text-gray-500">
								Name of Task:{c.taskName}
							</div>
						</div>
						<p class="mt-2 text-xs text-gray-500">
							Deadline :
							{new Date(c.deadline).toLocaleTimeString([], {
								hour: 'numeric',
								minute: 'numeric'
							}) +
								', ' +
								new Date(c.deadline).toLocaleDateString([], {
									day: 'numeric',
									month: 'long',
									year: 'numeric'
								})}
						</p>
						<!-- <p class="text-xs text-gray-500 mt-2">1</p> -->
					</div>
				{/each}
			</div>
		</div>

		<!-- <div class="bg-white rounded px-2 py-2"> -->
		<!-- board category header -->
		<!-- <div class="flex flex-row justify-between items-center mb-2 mx-1">
          <div class="flex items-center">
            <h2 class="bg-gray-200 w-4 px-1 rounded mr-2 text-sm text-center">.</h2>
            <p class="text-gray-400 text-sm">0</p>
          </div>
          <div class="flex items-center text-gray-300">
            <p class="mr-2 text-2xl">---</p>
            <p class="text-2xl">+</p>
          </div>
        </div>
        <div class="flex flex-row items-center text-gray-300 mt-2 px-1">
          <p class="rounded mr-2 text-2xl">+</p>
          <p class="pt-1 rounded text-sm">New</p>
        </div> -->
		<!-- </div> -->
	</div>
</div>
