<!-- Inspiration https://s3-ap-southeast-2.amazonaws.com/focusbooster.cdn/Landing+pages/kanban-and-focusbooster/kanban-board-notion.png -->
<script>
  
    import { BottomNav, BottomNavItem, Tooltip, Skeleton, ImagePlaceholder , Button } from 'flowbite-svelte';
    import { HomeSolid, WalletSolid, AdjustmentsVerticalOutline, UserCircleSolid, PlusSolid } from 'flowbite-svelte-icons';
    import NavbarModule from '../create_project/NavbarModule.svelte';

    let todo = [{id : 1  , taskName : "ToDo1" , deadline : "20-12-2020"},
                {id : 2 , taskName : "ToDo2" , deadline : "20-12-2020"},
                {id : 3 , taskName : "ToDo3" , deadline : "20-12-2020"}];
    let complete = [{id : 1  , taskName : "Complete1" , deadline : "20-12-2020"},
                {id : 2 , taskName : "Complete2" , deadline : "20-12-2020"},
                {id : 3 , taskName : "Complete3" , deadline : "20-12-2020"}];
    let inProgress = [{id : 1  , taskName : "Progress1" , deadline : "20-12-2020"},
                {id : 2 , taskName : "Progress2" , deadline : "20-12-2020"},
                {id : 3 , taskName : "Progress3" , deadline : "20-12-2020"}];
    function handlePushtoProgress(t){
        todo  = todo.filter(obj => obj.id !== t.id);
        let tempObj = {id:t.id , taskName:t.taskName , deadline:t.deadline};
        inProgress = [...inProgress , tempObj];
    }

    function handlePushtoComplete(t){
      inProgress = inProgress.filter(obj => obj.taskName !== t.taskName);
      let tempObj = {id:t.id , taskName:t.taskName , deadline:t.deadline};
      complete = [...complete , tempObj];

    }

    let tasks=[];
    
</script>
<NavbarModule />
<div class="h-screen p-2">
    <div class="grid grid-cols-3 gap-5">
      <!-- To-do -->
      <div class="bg-white rounded px-2 py-2">
        <!-- board category header -->
        <div class="flex flex-row justify-between items-center mb-2 mx-1">
          <div class="flex items-center">
            <h2 class="bg-red-100 text-sm w-max px-1 rounded mr-2 text-gray-700">To-do</h2>
            <p class="text-gray-400 text-sm">{todo.length}</p>
          </div>
          
        </div>
        <!-- board card -->
        
        <div class="grid grid-rows-2 gap-2">
            {#each todo as t}
            <div class="relative p-2 rounded shadow-sm border-gray-100 border-2">
              <h3 class="text-sm mb-3 text-gray-700">Id of Task : {t.id}</h3>
              <!-- <p class="bg-red-100 text-xs w-max p-1 rounded mr-2 text-gray-700">To-do</p> -->
              <div class="flex flex-row items-center mt-2">
                <div class="bg-gray-300 rounded-full w-4 h-4 mr-3"></div>
                <div class="text-xs text-gray-500">Name of Task: {t.taskName}</div>
              </div>
              <p class="text-xs text-gray-500 mt-2">Deadline : {t.deadline}
              <button class="absolute bottom-0 right-0" on:click={()=>handlePushtoProgress(t)}>Push</button></p>
            </div>
           
          {/each}
        </div>
        
        <div class="flex flex-row items-center text-gray-300 mt-2 px-1">
            <Button>
            <PlusSolid class="w-3 h-3 me-2" />
                Add Task
            </Button>

        </div>
        </div>
        
      
  
      <!-- WIP Kanban -->
      <div class="bg-white rounded px-2 py-2">
        <!-- board category header -->
        <div class="flex flex-row justify-between items-center mb-2 mx-1">
          <div class="flex items-center">
            <h2 class="bg-yellow-100 text-sm w-max px-1 rounded mr-2 text-gray-700">WIP</h2>
            <p class="text-gray-400 text-sm">{inProgress.length}</p>
          </div>
          
        </div>
        <!-- board card -->
        <div class="grid grid-rows-2 gap-2">
        {#each inProgress as p}
          <div class="relative p-2 rounded shadow-sm border-gray-100 border-2">
            <h3 class="text-sm mb-3 text-gray-700">Id of Task:{p.id}</h3>
            <!-- <p class="bg-yellow-100 text-xs w-max p-1 rounded mr-2 text-gray-700">WIP</p> -->
            <div class="flex flex-row items-center mt-2">
              <div class="bg-gray-300 rounded-full w-4 h-4 mr-3"></div>
              <div class="text-xs text-gray-500">Name of Task:{p.taskName}</div>
            </div>
            <p class="text-xs text-gray-500 mt-2">Deadline: {p.deadline}
            <button class="absolute bottom-0 right-0" on:click={()=>handlePushtoComplete(p)}>Push</button></p>
          </div>
        {/each}
        </div>
       </div>
  
      <!-- Complete Kanban -->
      <div class="bg-white rounded px-2 py-2">
        <!-- board category header -->
        <div class="flex flex-row justify-between items-center mb-2 mx-1">
          <div class="flex items-center">
            <h2 class="bg-green-100 text-sm w-max px-1 rounded mr-2 text-gray-700">Complete</h2>
            <p class="text-gray-400 text-sm">{complete.length}</p>
          </div>
        </div>
        <!-- board card -->
        <div class="grid grid-rows-2 gap-2">
        {#each complete as c}
          <div class="p-2 rounded shadow-sm border-gray-100 border-2">
            <h3 class="text-sm mb-3 text-gray-700">Id of Task :{c.id}</h3>
            <!-- <p class="bg-green-100 text-xs w-max p-1 rounded mr-2 text-gray-700">Complete</p> -->
            <div class="flex flex-row items-center mt-2">
              <div class="bg-gray-300 rounded-full w-4 h-4 mr-3"></div>
              <div class="text-xs text-gray-500">Name of Task:{c.taskName}</div>
            </div>
            <p class="text-xs text-gray-500 mt-2">Deadline : {c.deadline}</p>
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

  

 