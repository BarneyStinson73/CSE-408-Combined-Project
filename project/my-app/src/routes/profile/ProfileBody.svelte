<script>
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
    import { LockOpenSolid , GridSolid, MailBoxSolid, UserSolid, FireSolid} from 'flowbite-svelte-icons';
    import { Card, Dropdown, DropdownItem, Avatar, Button } from 'flowbite-svelte';
    
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
   
    // let count=[1,2,3];
    let projectData= $page.data.project_data;
    let count  = projectData.length;
    
    import { Progressbar } from 'flowbite-svelte';
    import {page} from '$app/stores';

    // let name = "John Doe";
    let name= $page.data.user_data[0].userName;
    let email = $page.data.user_data[0].email;
    let contantNo = $page.data.user_data[0].contactNo;
    let Currently_available = $page.data.user_data[0].isAvailable;
    let type = $page.data.user_data[0].type;
    
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
    <div class ='basis-1/6 mt-10 pl-10'>
        <img src="./src/Human.jpeg" alt="Manager" class='imageSize'>
    </div>
    <div class=' mt-12'>
        <p>Name:{name}</p>
        <p>Contact No:{contantNo}</p>
        <p>Status: {type.charAt(0).toUpperCase() + type.slice(1)}</p>
        <p>Email:{email}</p>
        <p>Currently Available:{Currently_available?("Yes"):("No")}</p>
    </div>  
</div>
<div class="flex flex-row">
    <div class=" bg-slate-300 h-screen bg-white sticky top-0 z-40">
        <Sidebar>
            <SidebarWrapper >
              <SidebarGroup border >
                <button>
                <SidebarItem label="Expertise" class='mt-5 pb-5'>
                  <svelte:fragment slot="icon">
                    <FireSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                </SidebarItem></button>
                <SidebarGroup border ></SidebarGroup>
                <button>
                <SidebarItem label="Projects"  class='mt-5 pb-5'>
                  <svelte:fragment slot="icon">
                    <GridSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                  <!-- <svelte:fragment slot="subtext">
                    <span class="inline-flex justify-center items-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"> Pro </span>
                  </svelte:fragment> -->
                </SidebarItem></button>
                <SidebarGroup border ></SidebarGroup>
                <button>
                <SidebarItem label="Update Profile" class='mt-5 pb-5'>
                  <svelte:fragment slot="icon">
                    <UserSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                  <!-- <svelte:fragment slot="subtext">
                    <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>
                  </svelte:fragment> --> 
                </SidebarItem></button>
                <SidebarGroup border ></SidebarGroup>
                <button>
                <SidebarItem label="Update Password" class='mt-5 pb-5'>
                  <svelte:fragment slot="icon">
                    <LockOpenSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                  <!-- <svelte:fragment slot="subtext">
                    <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>
                  </svelte:fragment> --> 
                </SidebarItem></button>
                <SidebarGroup border></SidebarGroup>
              </SidebarGroup>
            </SidebarWrapper>
          </Sidebar>
    </div>
    <div class='mt-10 ml-10 flex-grow'>
        {#each projectData as project,i}
         {#if i<count}
        <div class='grid grid-cols-2 '>
            
            <div class='mr-20'>
            <Card class="w-full m-auto">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.name}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:{project.deadline}</p>
              
                <Progressbar progress={project.progress} size="h-4" labelInside style="background-color: lime"/>
                <br>
                <Button class="w-fit" style="background-color: green">
                  Details <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
                </Button>
              </Card>
            </div>
            <!-- <div class='mr-20'>
                <Card class="w-full m-auto">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project 1</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:15 February 2024</p>
                  
                    <Progressbar progress="50" size="h-4" labelInside style="background-color: lime"/>
                    <br>
                    <Button class="w-fit" style="background-color: green">
                      Details <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
                    </Button>
                  </Card>
              </div> -->
              <div class='my-10'></div>
              
        </div>
        {/if}
        {/each}
       
    </div>
</div>
<!-- <div class='mt-10 flex flex-row'>
    <div class='flex flex-row '>
        <div class="py-5 w-full"><GradientButton color="purpleToBlue">Expertise</GradientButton></div>
        <div class="py-5 w-full"><GradientButton color="cyanToBlue">Projects</GradientButton></div>
        <div class="py-5 w-full"><GradientButton color="greenToBlue">Update Profile</GradientButton></div>    
             <button class='resizeBlock'>Expertise</button>
            <but class='resizeBlock'>Projects</but>
            <div class='resizeBlock'>Update Profile</div> -->
    <!-- </div>

        <div>
            {#each count as _}
            <Card class="w-full m-auto">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project 1</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:15 February 2024</p>
              
                <Progressbar progress="50" size="h-4" labelInside style="background-color: lime"/>
                <br>
                <Button class="w-fit" style="background-color: green">
                  Details <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
                </Button>
              </Card>
              <div class='my-5'></div>
              {/each}
        </div>
    </div> -->

    
      
      



  
  