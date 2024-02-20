<script>
	import { goto } from '$app/navigation';
  import {page} from '$app/stores';
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
  // import { ChartPieSolid, GridSolid, MailBoxSolid, UserSolid, BagSolid, ArrowRightToBracketSolid, FileEditSolid, FireSolid, BookSolid, WindowRestoreOutline, LifeBuoySolid, CirclePlusSolid } from 'flowbite-svelte-icons';
  import { Card, Dropdown, DropdownItem, Avatar } from 'flowbite-svelte';
  import { DotsHorizontalOutline } from 'flowbite-svelte-icons';
  import { ArrowRightOutline ,CirclePlusSolid} from 'flowbite-svelte-icons';
   import { Button, Modal, Label, Checkbox } from 'flowbite-svelte';
   import { Select } from 'flowbite-svelte';
    import { MultiSelect } from 'flowbite-svelte';

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
  let selected_manager = [];
  let selected_tag = [];
  let selected_collaborator = [];
  let selected_sp_collaborator = [];
  let defaultModal = false;
  let formModal = false;
  let spanClass = 'flex-1 ms-3 whitespace-nowrap';
  let task_name='',start_date='',deadline='';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Input } from 'flowbite-svelte';
  import { SearchOutline } from 'flowbite-svelte-icons';

import { Progressbar } from 'flowbite-svelte';

  import { AccordionItem, Accordion } from 'flowbite-svelte';


  let data=$page.data;
  async function task_creation(){
  }
</script>
<!-- <img src="profile.jpg" alt="sample 1" class="w-64 h-64 rounded-full" /> -->


<Navbar>
  <NavBrand href="/">
    <img src="logo-no-background.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white" style="color: #dede50;font-family: 'Montserrat Alternates', monospace">Victor</span>
  </NavBrand>
  <div class="flex md:order-2">
    <Button color="none" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
      <SearchOutline class="w-5 h-5" />
    </Button>
    <div class="hidden relative md:block">
      <div class="flex absolute inset-y-0 start-0 items-center ps-3 pointer-events-none">
        <SearchOutline class="w-4 h-4" />
      </div>
      <Input id="search-navbar" class="ps-10" placeholder="Search..." />
    </div>
    <NavHamburger />
  </div>
  <NavUl>
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/about">About</NavLi>
    <NavLi href="/docs/components/navbar">Navbar</NavLi>
  </NavUl>
</Navbar>

<div class="flex flex-row h-full w-screen mx-auto">
<!-- <Card padding="md" class="flex flex-col h-full" color="rgb(255,255,255)"> -->
  
  <div class="flex flex-col items-center pb-4 space-y-5 mx-auto pt-10 w-1/4">
    <img src="profile.jpg" class="w-64 h-64 rounded-full" alt="bonnie"/>
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
    <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
    <div class="flex mt-4 space-x-3 rtl:space-x-reverse lg:mt-6">
    </div>
  </div>
  
<!-- </Card> -->




<div class="grid grid-cols-4 gap-2 flex-grow">
<Card class="w-full h-1/2 m-auto">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project 1</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:31 January 2024</p>

  <Progressbar progress="70" size="h-4" labelInside style="background-color: lime"/>
  <br>
  <!-- <Button class="w-fit" style="background-color: green">
    Details <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
  </Button> -->
<div class="grid grid-cols-2 gap-4">
  <Button class="w-fit" style="background-color: green" on:click={() => (defaultModal = true)}>Details</Button>
<!-- 
  <Button class="w-fit" style="background-color: red" on:click={() => (defaultModal = true)}>Create New</Button> -->

  <Button on:click={() => (formModal = true)}>Create New</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
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
</Modal>
</div>
</Card>

<Modal title="Tasks" bind:open={defaultModal} autoclose  outsideclose>
  <div class="grid grid-cols-2 gap-4">
  <Card class="w-full m-auto">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Flow Diagram</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline: 28 January 2024</p>

  <Progressbar progress="90" size="h-4" labelInside style="background-color: lime"/>
  <br>
  <div class="grid grid-cols-2 gap-4">
  <Button class="w-fit" style="background-color: green" on:click={(
  ) => (defaultModal = true)}>Details</Button>

  <a href="/tasks/2">Click here</a>

  <Button class="w-fit" style="background-color: red" on:click={() => (defaultModal = true)}>Create New</Button>
</div>
</Card>

<Card class="w-full m-auto">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Collaboration Diagram</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:31 January 2024</p>

  <Progressbar progress="50" size="h-4" labelInside style="background-color: lime"/>
  <br>
  <div class="grid grid-cols-2 gap-4">
  <Button class="w-fit" style="background-color: green" on:click={() => (defaultModal = true)}>Details</Button>

  <Button class="w-fit" style="background-color: red" on:click={() => (defaultModal = true)}>Create New</Button>
</div>
</Card>

<Card class="w-full m-auto">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mock UI</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:20 January 2024</p>

  <Progressbar progress="100" size="h-4" labelInside style="background-color: lime"/>
  <br>
<div class="grid grid-cols-2 gap-4">
  <Button class="w-fit" style="background-color: green" on:click={() => (defaultModal = true)}>Details</Button>

  <Button class="w-fit" style="background-color: red" on:click={() => (defaultModal = true)}>Create New</Button>
</div>
</Card>

</div>
  
</Modal>


<Card class="w-full h-1/2 m-auto">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project 2</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:15 February 2024</p>

  <Progressbar progress="50" size="h-4" labelInside style="background-color: lime"/>
  <br>
<div class="grid grid-cols-2 gap-4">
  <Button class="w-fit" style="background-color: green" on:click={() => (defaultModal = true)}>Details</Button>

  <Button class="w-fit" style="background-color: red" on:click={() => (defaultModal = true)}>Create New</Button>
</div>
</Card>


<Card class="w-full h-1/2 m-auto">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project 3</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:25 February 2024</p>

  <Progressbar progress="20" size="h-4" labelInside style="background-color: lime"/>
  <br>
<div class="grid grid-cols-2 gap-4">
  <Button class="w-fit" style="background-color: green" on:click={() => (defaultModal = true)}>Details</Button>

  <Button class="w-fit " style="background-color: red" on:click={() => (defaultModal = true)}>Create New</Button>
</div>
 </Card>



<Card class="w-full h-1/2 m-auto bg-transparent shadow-none">
  <!-- <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create New Project</h5> -->
  <!-- <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:25 February 2024</p>

  <Progressbar progress="20" size="h-4" labelInside style="background-color: lime"/>
  <br>
  <Button class="w-fit" style="background-color: green">
    Details <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
  </Button> -->

  <CirclePlusSolid class="w-20 h-20 m-auto text-gray-500 dark:text-gray-400" />
 </Card>
</div>
</div>





<div class="flex flex-col w-3/4 m-auto">
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
</div>