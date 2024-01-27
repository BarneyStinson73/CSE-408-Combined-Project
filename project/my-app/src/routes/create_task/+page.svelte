<script>
  import { Input, Label, Helper, Button, Checkbox, A, Breadcrumb } from 'flowbite-svelte';
import { Select } from 'flowbite-svelte';
import { MultiSelect } from 'flowbite-svelte';
import { BreadcrumbItem} from 'flowbite-svelte';
  let selected_manager=[''],selected_collaborator=[''],selected_sp_collaborator=[''],selected_tag=[''];

  let managers = [
    { value: 'us', name: 'James Moreno' },
    { value: 'ca', name: 'Eric Baena' },
    { value: 'fr', name: 'Vicent DiAfrino' }
  ];
  let tags=[
    { value: 'us', name: 'Java' },
    { value: 'ca', name: 'Python' },
    { value: 'fr', name: 'CPP' }
  ];
  let collaborators=[
    { value: 'us', name: 'Alex Stanley' },
    { value: 'ca', name: 'Roger Burb' },
    { value: 'fr', name: 'Stuart Little' }
  ];
  let sp_collaborators=[
    { value: 'us', name: 'Franc Sinatra' },
    { value: 'ca', name: 'Hal Jordan' },
    { value: 'fr', name: 'Richard Grayson' }
  ];
</script>


<div class="w-1/2 m-auto h-screen grid grid-cols-1 items-center">
<form class="bg-blue-100 px-10 h-3/4 rounded">
  <h1 class="text-center">New Task</h1>
  <br>
  <Breadcrumb aria-label="Default breadcrumb example">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
  <BreadcrumbItem href="/">Projects</BreadcrumbItem>
  <BreadcrumbItem>Project 1</BreadcrumbItem>
</Breadcrumb>



  <div class="my-6">
    <Label for="email" class="mb-2">Task Name</Label>
    <Input type="text" id="name" placeholder="Sample Task" required />
  </div>
  <div class="my-6">
    <Label for="email" class="mb-2">Task Description</Label>
    <Input type="email" id="email" placeholder="To do something"  />
  </div>
  <div class="my-6">
    <Label>Task Manager
  <Select class="mt-2" items={managers} bind:value={selected_manager} />
</Label>
  </div>
  <div class="mb-6">
    <Label for="last_name" class="mb-2">Tags</Label>
    <MultiSelect items={tags} bind:value={selected_tag} />
    <!-- <Label for="confirm_password" class="mb-2">Confirm password</Label>
    <Input type="password" id="confirm_password" placeholder="•••••••••" required /> -->
  </div>
  <div class="mb-6">
    <Label for="last_name" class="mb-2">Collaborators</Label>
    <MultiSelect items={collaborators} bind:value={selected_collaborator} />
    <!-- <Label for="confirm_password" class="mb-2">Confirm password</Label>
    <Input type="password" id="confirm_password" placeholder="•••••••••" required /> -->
  </div>
  <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
      <Label for="last_name" class="mb-2">Start Date</Label>
      <Input type="date" id="last_name" placeholder="Doe" required />
      
    </div>
    <div>
      <Label for="last_name" class="mb-2">Expiration Date</Label>
      <Input type="date" id="last_name" placeholder="Doe" required />
    </div>

  </div>
  <Button type="submit">Submit</Button>
</form>
</div>


<svelte:head>
  <style>
    
    body {
      /* background: #7FC7D9; */
    }
  </style>
</svelte:head>






  <Breadcrumb aria-label="Default breadcrumb example">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
  <BreadcrumbItem href="/">Projects</BreadcrumbItem>
  <BreadcrumbItem>Flowbite Svelte</BreadcrumbItem>
</Breadcrumb>