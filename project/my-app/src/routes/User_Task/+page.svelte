<script>
import { A , AccordionItem, Accordion , Button } from 'flowbite-svelte';
import { Indicator } from 'flowbite-svelte';
import { GradientButton } from 'flowbite-svelte';
import { ShoppingCartSolid, CogOutline } from 'flowbite-svelte-icons';
import { Alert } from 'flowbite-svelte';
import { InfoCircleSolid } from 'flowbite-svelte-icons';
import { fly } from 'svelte/transition';
import { Tooltip} from 'flowbite-svelte';
let type = 'dark';
let donetask = [   
                {
                    taskId : 1,
                    taskName : "task1",
                    startDate : new Date('2004-2-2'),
                    deadline : new Date('2004-2-2')
                },
                {
                    taskId : 2,
                    taskName : "task2",
                    startDate : new Date('2004-2-2'),
                    deadline : new Date('2004-2-2')
                },
                {
                    taskId : 3,
                    taskName : "task3",
                    startDate : new Date('2004-2-2'),
                    deadline : new Date('2004-2-2')
                }
                ];

let duetask = [   
                {
                    taskId : 4,
                    taskName : "task4",
                    startDate : new Date('2004-2-2'),
                    deadline : new Date('2004-2-2')
                },
                {
                    taskId : 5,
                    taskName : "task5",
                    startDate : new Date('2004-2-2'),
                    deadline : new Date('2004-2-2')
                },
                {
                    taskId : 6,
                    taskName : "task6",
                    startDate : new Date('2004-2-2'),
                    deadline : new Date('2004-2-2')
                }
                ];

let taskRequest = [   
                {
                    taskId : 1,
                    managerId : "Manager1",
                    userId : "User1",
                    creationDate : new Date(20-12-2002)
                },
                {
                    taskId : 2,
                    managerId : "Manager2",
                    userId : "User1",
                    creationDate : new Date(20-12-2002)
                },
                {
                    taskId : 3,
                    managerId : "Manager1",
                    userId : "User1",
                    creationDate : new Date(20-12-2002)
                }
                ];

let reqStatus = 0;
function dueToDone(due){
    duetask  = duetask.filter(obj => obj.taskId !== due.taskId);
    let tempObj = {taskId : due.taskId , taskName:due.taskName , startDate : due.startDate , deadline:due.deadline};
    donetask = [...donetask , tempObj];
}

function approveReq(req){
    taskRequest  = taskRequest.filter(obj => obj.taskId !== req.taskId);
    reqStatus = 1;
    setTimeout(() => {
      reqStatus = 0;
    }, 1000); // Set timeout to 1 second
}


function ignoreReq(req){
    taskRequest = taskRequest.filter(obj => obj.taskId !== req.taskId);
    reqStatus = 2;
    setTimeout(() => {
        reqStatus = 0;
    }, 1000); // Set timeout to 1 second
}


</script>

<style>
    .fixed-size{
        width:1px;
        height:1px;
        border-radius: 50%;
    }
</style>

{#if reqStatus === 1}
<Alert color="green" dismissable>
    <InfoCircleSolid slot="icon" class="w-4 h-4" />
    Congratulations!!!! You have entered the task!!
  </Alert>
{:else if reqStatus === 2}
<Alert color="red" dismissable>
    <InfoCircleSolid slot="icon" class="w-4 h-4" />
    Unfortunately You have ignored the task!!!!
</Alert>
{/if}

<div class='flex flex-row'>
   

    <div class='basis-1/2 flex flex flex-col'>
        <Accordion>
            <AccordionItem>
              <span slot="header" class="text-base flex gap-2">
                <ShoppingCartSolid class="mt-0.5" />
                <span>Due Task</span>
              </span>
              {#if duetask.length === 0}
                 <h3>No Dues Task</h3>
            {/if}
              {#each duetask as due}
              <div class='mb-5'>
                <button>
                <span class="flex items-center"><Indicator size="sm" color="orange" class="me-1.5 mr-2" />Task Id : {due.taskId}   ,   Task Name : {due.taskName} <Button outline color="green" class="ml-10 size-sm" on:click={()=>dueToDone(due)}>Done</Button></span>
                </button>
                <Tooltip>
                    <div>
                        <p>TaskName : {due.taskName}</p>
                        <p>Start Date : {due.startDate.toLocaleDateString()}</p>
                        <p>Deadline : {due.deadline.toLocaleDateString()}</p>
                    </div>

                </Tooltip>
            </div>
              {/each}
            </AccordionItem>
            <AccordionItem>
              <span slot="header" class="text-base flex gap-2">
                <CogOutline class="mt-0.5" />
                <span>Done Task</span>
              </span>
              {#each donetask as done}
              <div class='mb-5'>
                <button>
                <A href='/../comment'><span class="flex items-center"><Indicator size="sm" color="orange" class="me-1.5 mr-2" />Task Id : {done.taskId}   ,   Task Name : {done.taskName} </span></A>
                </button>
                <Tooltip>
                    <div>
                        <p>TaskName : {done.taskName}</p>
                        <p>Start Date : {done.startDate.toLocaleDateString()}</p>
                        <p>Deadline : {done.deadline.toLocaleDateString()}</p>
                    </div>

                </Tooltip>
              </div>
              {/each}
            </AccordionItem>
          </Accordion>
    
    </div>
    

    <div class='basis-1/2'>
    <h1 class='mb-5'>Task Request</h1>
    {#if taskRequest.length === 0}
    <h3>There is no request to show</h3>
    {/if}
    {#each taskRequest as req}
    <div>
        <span class="flex items-center mb-5"><Indicator size="sm" color="orange" class="me-1.5 mr-2" />Task Id : {req.taskId} is requested by <b> manager name </b> : {req.managerId} 
        <GradientButton color="green" class='ml-10 ' on:click={()=>approveReq(req)}>Approve</GradientButton>
        <GradientButton color="red" class='ml-10 ' on:click={()=>ignoreReq(req)}>Ignore</GradientButton>
        
        
        </span>
    </div>
    {/each}
    </div>
    
</div>

