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
      <p class="text-gray-500 dark:text-gray-400">There is nothing to bother you right now.Have fun!!</p>
    {/if}
  </Accordion>
</div>
