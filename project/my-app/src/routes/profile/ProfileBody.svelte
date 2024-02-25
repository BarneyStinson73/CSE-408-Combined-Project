<script >

    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Label, Input, Checkbox , A } from 'flowbite-svelte';
    import { LockOpenSolid , GridSolid, MailBoxSolid, UserSolid, FireSolid} from 'flowbite-svelte-icons';
    import { Tooltip} from 'flowbite-svelte';
    import { Card, Dropdown, DropdownItem, Avatar, Button,Select,MultiSelect } from 'flowbite-svelte';

    import { Modal } from 'flowbite-svelte';
    
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
    import {token} from '$lib/token.js';
    import {get} from 'svelte/store';
    import {goto} from '$app/navigation';
   
    let defModal = false;
    let fModal = false;
    let defaultModal = false;
    let formModal = false;
    let placement = 'right';
    let task_name='',start_date='',deadline='';
    // let count=[1,2,3];
    let projectData= $page.data.project_data;
    let count  = projectData.length;
    import { Progressbar } from 'flowbite-svelte';
    import {page} from '$app/stores';

    // let name = "John Doe";
    let name= $page.data.user_data[0].userName;
    let user_email = $page.data.user_data[0].email;
    let contantNo = $page.data.user_data[0].contactNo;
    let Currently_available = $page.data.user_data[0].isAvailable;
    let type = $page.data.user_data[0].type;
    let tags={};

    let autoClose = false;
    let isHovered = false;
    function handleHover() {
    isHovered = !isHovered;
  }


  let username='';
  let email='';
  let contact='';
  let prev_password='';
  let new_password='';

  async function updatePassword(){
    const redirecturl='http://localhost:3000/manager/profile';
    const res = await fetch('http://localhost:3000/manager/update_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: get(token)
      },
      body: JSON.stringify({ prev_password, new_password})
    });

    if (res.ok) {
      const data = await res.json();
      // token.set(data.token);
      console.log(data);
      if(data.success){
        alert("Password Updated Successfully");
        location.reload();
      }
    }

  }

  async function updateProfile(){
    //console.log("In update Profile");
    const redirecturl='/profile';
    const res = await fetch('http://localhost:3000/manager/update_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: get(token)
      },
      body: JSON.stringify({ username, email, contact})
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      if(data.success){
        alert("Profile Updated Successfully");
        //goto(redirecturl);
        location.reload();
      }
    }



  }
  




    function calculateTagCounts(data) {
    const tags = {};
    data.forEach(project => {
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

console.log(tagCounts);
let managers=[];
let collaborators=[];
let tasks=[];
let tasks2=[];
let showing_tasks = tasks;
let selected_manager = [];
  let selected_tag = [];
  let selected_collaborator = [];
  let selected_sp_collaborator = [];
async function task_creation(){

}


async function project_task_manager(){
    const res = await fetch('http://localhost:3000/manager/project_admins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: get(token)

      },
      body: JSON.stringify({managers })
    });

    if (res.ok) {
      const data = await res.json();
      token.set(data.token);
      console.log(data);
      // console.log(data.success);
      if(data.success){
        alert('Project admins are retrieved');
      }
    }
}
async function task_task_manager(){

}
</script>


<style>
.imageSize{
    width: 150px;
    height: 100 px;
    border-radius: 50%;
    padding-left: 10 px;
}

</style>



<div class = 'flex flex-row bg-gray-50'>
    <div class = 'flex flex-row bg-yellow-50 z-10'>

    </div><div class ='basis-1/6 mt-10 pl-10'>
        <img src="http://thispix.com/wp-content/uploads/2015/06/passport-017.jpg" alt="Manager" class='imageSize'>
    </div>
    <div class=' mt-12'>
        <p>Name:{name}</p>
        <p>Contact No:{contantNo}</p>
        <p>Status: {type.charAt(0).toUpperCase() + type.slice(1)}</p>
        <p>Email:{user_email}</p>
        <p>Currently Available:{Currently_available?("Yes"):("No")}</p>
    </div>  
</div>
<div class="flex flex-row">
    <div class=" bg-slate-300 h-screen bg-white sticky top-0 z-40">
        <Sidebar>
            <SidebarWrapper >
              <SidebarGroup border >
                <button id='placement-4' on:mouseenter={()=> placement='right'}>
                <SidebarItem label="Expertise" class='mt-5 pb-5'>
                  <svelte:fragment slot="icon">
                    <FireSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                </SidebarItem></button>
                <Tooltip color="green" triggeredBy="[id^='placement-']" {placement}>
                  {#each tags as tag}
                  <div class='flex flex-col alignProper'>
                    <p>{tag.tag} &nbsp &nbsp {tag.projects}</p>
                    <!-- <p>{tag.projects}</p> -->
                    
                    </div>
                    <hr/>
                  {/each}
                </Tooltip>
                <SidebarGroup border ></SidebarGroup>
                <button on:click={() => (defModal = true)}>
                <SidebarItem label="Update Profile" class='mt-5 pb-5'>
                  <svelte:fragment slot="icon">
                    <UserSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                </SidebarItem></button>
                <SidebarGroup border ></SidebarGroup>
                  <Modal bind:open={defModal} size="xs" autoclose={autoClose} outsideclose class="w-full handleMargin">
                    <form class="flex flex-col space-y-6" on:submit={updateProfile}>
                      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Profile</h3>
                      <div class="grid gap-6 mb-6 ">
                        
                        <div>
                          <Label for="last_name" class="mb-2">UserName</Label>
                          <Input type="text" id="last_name" placeholder="Doe"  required bind:value={username}/>
                        </div>
                        </div>
                        <div>
                          <Label for="contact" class="mb-2">contact number</Label>
                          <!-- pattern={"[0-9]{3}-[0-9]{2}-[0-9]{3}"} -->
                          <Input type="tel" id="contact" placeholder="123-45-678" required bind:value={contact}/>
                        </div>
                        <div class="mb-6">
                          <Label for="email" class="mb-2">Email address</Label>
                          <Input type="email" id="email" placeholder="john.doe@company.com"  required bind:value={email}/>
                        </div>
                        <Checkbox class="mb-6 space-x-1 rtl:space-x-reverse" required>
                          I agree with the terms and conditions.
                        </Checkbox>
                        <Button type="submit">Submit</Button>
                    </Modal>

                  <button on:click={() => (fModal = true)}>
                <SidebarItem label="Update Password" class='mt-5 pb-5'>
                  <svelte:fragment slot="icon">
                    <LockOpenSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                </SidebarItem></button>
                <Modal bind:open={fModal} size="xs" autoclose={false} outsideclose class="w-full handleMargin">
                  <form class="flex flex-col space-y-6" on:submit={updatePassword}>
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Password</h3>
                    
                      <div class="mb-6">
                        <Label for="password" class="mb-2">Old Password</Label>
                        <Input type="password" id="old_password" placeholder="•••••••••" required bind:value={prev_password}/>
                      </div>
                      <div class="mb-6">
                        <Label for="new_password" class="mb-2">New password</Label>
                        <Input type="password" id="new_password" placeholder="•••••••••" required bind:value={new_password} />
                      </div>
                      
                      <Checkbox class="mb-6 space-x-1 rtl:space-x-reverse" required>
                        I agree with the <A href="/" class="text-primary-700 dark:text-primary-600 hover:underline">terms and conditions</A>.
                      </Checkbox>
                      <Button type="submit">Submit</Button>
                  </Modal>

                <SidebarGroup border></SidebarGroup>
              </SidebarGroup>
            </SidebarWrapper>
          </Sidebar>
    </div>
    <div class='mt-10 ml-10 grid grid-cols-3 gap-2 flex-grow'>
        {#each projectData as project,i}
         {#if i<count}
        <div class='grid md="grid-cols-2" '>
            
            <div class='mr-20'>
            <Card class="w-full m-auto">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.projectName}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
                  Deadline:
                  {new Date(project.deadline).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(project.deadline).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})}
                </p>
              
                <Progressbar progress={project.progression} size="h-4" labelInside style="background-color: lime"/>
                <br>
                <div class="grid grid-cols-2 gap-4">
                <Button class="w-fit" style="background-color: green" on:click={() => (defaultModal = true)}>
                  Details <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
                </Button>
                <Button on:click={() => (formModal = true)}>Create New Task</Button>
                </div>
                <Modal bind:open={formModal} size="md" autoclose={false} class="w-full">
  <form class="bg-blue-100 px-10 h-full rounded" on:submit|preventDefault={task_creation}>
  <h1 class="text-center">New Task</h1>
  <hr>
  <div class="my-4">
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
  <div class="grid gap-6 mb-4 md:grid-cols-2">
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
                
              </Card>
            </div>
              <div class='my-10'></div>
              
        </div>
        {/if}
        {/each}
       
    </div>
</div>