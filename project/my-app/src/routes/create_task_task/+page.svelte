<script>

  import {page} from '$app/stores';
  import { Input, Label, Helper, Button, Checkbox, A, Breadcrumb } from 'flowbite-svelte';
import { Select } from 'flowbite-svelte';
import { MultiSelect } from 'flowbite-svelte';
import { BreadcrumbItem} from 'flowbite-svelte';
 import { Modal} from 'flowbite-svelte';
  let formModal = false;
import { get } from 'svelte/store';
import { token } from '$lib/token.js';
  
  let data= $page.data;
  console.log(data);

  let project_manager=[],project_users=[],project_special_users=[],project_tags=[];

  // let managers = [
  //   { value: 'us', name: 'James Moreno' },
  //   { value: 'ca', name: 'Eric Baena' },
  //   { value: 'fr', name: 'Vicent DiAfrino' }
  // ];

  // manager variable will hold all the users' names from the data
  let task_name='',start_date='',deadline='';
  let managers = $page.data.managers.map((manager)=>{
    return {value:manager.userId, name:manager.userName}
  });

  // let managers = $page.data.managers.userName;
  
  // tags variable will hold all the tags from the data
  let tags= $page.data.tags.map((tag)=>{
    return {value:tag.tagId, name:tag.tagName}
  });
  let collaborators= $page.data.users.map((collaborator)=>{
    return {value:collaborator.userId, name:collaborator.userName}
  });
  // let sp_collaborators= $page.data.managers.map((sp_collaborator)=>{
  //   return {value:sp_collaborator.userId, name:sp_collaborator.userName}
  // });



  let selected_manager=[],selected_collaborator=[],selected_sp_collaborator=[],selected_tag=[];

  // let managers = [
  //   { value: 'us', name: 'James Moreno' },
  //   { value: 'ca', name: 'Eric Baena' },
  //   { value: 'fr', name: 'Vicent DiAfrino' }
  // ];
  // let tags=[
  //   { value: 'us', name: 'Java' },
  //   { value: 'ca', name: 'Python' },
  //   { value: 'fr', name: 'CPP' }
  // ];
  // let collaborators=[
  //   { value: 'us', name: 'Alex Stanley' },
  //   { value: 'ca', name: 'Roger Burb' },
  //   { value: 'fr', name: 'Stuart Little' }
  // ];
  // let sp_collaborators=[
  //   { value: 'us', name: 'Franc Sinatra' },
  //   { value: 'ca', name: 'Hal Jordan' },
  //   { value: 'fr', name: 'Richard Grayson' }
  // ];


  async function task_creation() {
    console.log(task_name, selected_manager, selected_collaborator,selected_tag,start_date,deadline); 
    const res = await fetch('http://localhost:3000/manager/create_task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: get(token)

      },
      body: JSON.stringify({task_name, selected_manager, selected_collaborator,selected_tag,start_date,deadline })
    });

    if (res.ok) {
      const data = await res.json();
      token.set(data.token);
      console.log(data);
      // console.log(data.success);
      if(data.success){
        alert('Task Created Successfully');
      }
    }
  }
</script>


<div class="w-1/2 m-auto h-screen grid grid-cols-1 items-center">
<form class="bg-blue-100 px-10 h-3/4 rounded" on:submit|preventDefault={task_creation}>
  <h1 class="text-center">New Task</h1>
  <br>
  <!-- <Breadcrumb aria-label="Default breadcrumb example">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
  <BreadcrumbItem href="/">Projects</BreadcrumbItem>
  <BreadcrumbItem>Project 1</BreadcrumbItem>
</Breadcrumb> -->



  <div class="my-6">
    <Label for="email" class="mb-2">Task Name</Label>
    <Input type="text" id="name" placeholder="Sample Task" required bind:value={task_name} />
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
      <Input type="date" id="last_name" placeholder="Doe" required bind:value={start_date}/>
      
    </div>
    <div>
      <Label for="last_name" class="mb-2">Expiration Date</Label>
      <Input type="date" id="last_name" placeholder="Doe" required bind:value={deadline}/>
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