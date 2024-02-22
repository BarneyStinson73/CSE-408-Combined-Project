<script>
  import {page} from '$app/stores';
  import { Card } from 'flowbite-svelte';
  import { CirclePlusSolid} from 'flowbite-svelte-icons';
  import NavbarModule from './NavbarModule.svelte';
  import { goto } from '$app/navigation';
  import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
  import { MultiSelect ,Select} from 'flowbite-svelte';
  
  let managers = [
    { value: 'us', name: 'James Moreno' },
    { value: 'ca', name: 'Eric Baena' },
    { value: 'fr', name: 'Vicent DiAfrino' }
  ];
  let tags = [
    { value: 'us', name: 'Java' },
    { value: 'ca', name: 'Python' },
    { value: 'fr', name: 'CPP' }
  ];
  let collaborators = [
    { value: 'us', name: 'Alex Stanley' },
    { value: 'ca', name: 'Roger Burb' },
    { value: 'fr', name: 'Stuart Little' }
  ];
  let tasks=[
    {name:'Flow Diagram',deadline:'28 January 2024',progress:90},
    {name:'Collaboration Diagram',deadline:'31 January 2024',progress:50},
    {name:'Mock UI Hudai',deadline:'20 January 2024',progress:100}
  ];
  let tasks2=[
    {name:'Flow Diagram',deadline:'28 January 2024',progress:90},
    {name:'Collaboration Diagram',deadline:'31 January 2024',progress:50},
  ];
  let showing_tasks = tasks;
  let selected_manager = [];
  let selected_tag = [];
  let selected_collaborator = [];
  let selected_sp_collaborator = [];
  let defaultModal = false;
  let formModal = false;
  let spanClass = 'flex-1 ms-3 whitespace-nowrap';
  let task_name='',start_date='',deadline='';
  import { NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  import { SearchOutline } from 'flowbite-svelte-icons';

import { Progressbar } from 'flowbite-svelte';

  import { AccordionItem, Accordion } from 'flowbite-svelte';

  let data= $page.data;
  console.log(data);
  let name=data.person[0].userName;
  let position=data.person[0].position;
  let reminders=data.reminders;
  let boolean=1;
  if(reminders.length==0){
      boolean=0;
  }
  async function task_creation(){

  };
</script>

<NavbarModule></NavbarModule>

<div class="flex flex-row h-full w-screen mx-auto">

  
  <div class="flex flex-col items-center pb-4 space-y-5 mx-auto pt-10 w-1/4">
    <img src="http://thispix.com/wp-content/uploads/2015/06/passport-017.jpg" class="w-64 h-64 rounded-full" alt="bonnie"/>
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
    <span class="text-sm text-gray-500 dark:text-gray-400">{position}</span>
    <div class="flex mt-4 space-x-3 rtl:space-x-reverse lg:mt-6">
    </div>
  </div>
  





 <!-- <div class="grid grid-cols-4 gap-2 flex-grow"> -->
  <div class="flex flex-col w-4/5 m-auto">
<Card class="w-full h-1/2 m-auto">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project 1</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:31 January 2024</p>

  <Progressbar progress="70" size="h-4" labelInside style="background-color: lime"/>
  <br>
<div class="grid grid-cols-2 gap-4">
  <Button class="w-fit" style="background-color: green" on:click={() => (defaultModal = true)}>Details</Button>


  <Button on:click={() => (formModal = true)}>Create New</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  <form class="bg-blue-100 px-10 h-3/4 rounded" on:submit|preventDefault={task_creation}>
  <h1 class="text-center">New Task</h1>
  <br>



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
  </div>
  <div class="mb-6">
    <Label for="last_name" class="mb-2">Collaborators</Label>
    <MultiSelect items={collaborators} bind:value={selected_collaborator} />
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
</Modal>
</div>
</Card>



<Modal title="Tasks" bind:open={defaultModal} autoclose={false}  outsideclose>
  <div class="grid grid-cols-2 gap-4">
    {#each showing_tasks as task}
      <Card class="w-full m-auto">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.name}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline: {task.deadline}</p>

        <Progressbar progress={task.progress} size="h-4" labelInside style="background-color: lime"/>
        <br>
        <div class="grid grid-cols-2 gap-4">
        <Button class="w-fit" style="background-color: green" on:click={() => (showing_tasks=tasks2)}>Details</Button>

        <Button class="w-fit" style="background-color: red" on:click={() => (defaultModal = true)}>Create New</Button>
        </div>
      </Card>
{/each}
  
</Modal>




<Card class="w-full h-1/2 m-auto bg-white shadow-xl ">
<h1 class="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create New Project</h1>
<br>
  <CirclePlusSolid class="w-20 h-20 m-auto text-gray-500 dark:text-gray-400" on:click={() => goto('./create_project')}>
  </CirclePlusSolid>
 </Card>
</div>
</div>





<!-- <div class="flex flex-col w-3/4 m-auto">
<h1 class="font-bold text-red-500">Reminders</h1>
<Accordion flush >
  <AccordionItem>
    <span slot="header" class="font-semibold">Hurry up!!!</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Project 1 has only 4 days left.</p>
  </AccordionItem>
  <AccordionItem>
    <span slot="header" class="font-semibold">Task updated.</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Project 3 has multiple task details updated.</p>
  </AccordionItem>
</Accordion>
</div> -->
<div class="flex flex-col w-3/4 m-auto">
  <h1 class="font-bold text-red-500">Reminders</h1>
  <Accordion flush>
    {#if reminders.length > 0}
      {#each reminders as reminder}
        <AccordionItem>
          <span slot="header" class="font-semibold">{reminder.header}</span>
          <p class="mb-2 text-gray-500 dark:text-gray-400">{reminder.message}</p>
        </AccordionItem>
      {/each}
    {:else}
      <p class="text-gray-500 dark:text-gray-400">There is nothing to bother you right now.</p>
    {/if}
  </Accordion>
</div>
