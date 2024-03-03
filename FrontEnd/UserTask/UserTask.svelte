<script>
    import { A , AccordionItem, Accordion , Button } from 'flowbite-svelte';
    import { Indicator } from 'flowbite-svelte';
    import { GradientButton } from 'flowbite-svelte';
    import { ShoppingCartSolid, CogOutline } from 'flowbite-svelte-icons';
    import { Alert } from 'flowbite-svelte';
    import { InfoCircleSolid } from 'flowbite-svelte-icons';
    import { fly } from 'svelte/transition';
    import { Tooltip} from 'flowbite-svelte';
	import user from 'svelte-awesome/icons/user';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import Task from '../ganttTest/Task.svelte';
    export let userTasks;
    export let userTaskAssignmentReq;
    export let userId;
    console.log(userTasks);
    // console.log(userTaskAssignmentReq);

    
    let type = 'dark';


    let DoneTask = [];
    let DueTask = [];
    let TaskReq = userTaskAssignmentReq;

    // $:{
    //     for (const task of userTasks) {
    //     //console.log(task.Task);
    //     if (task.Task.progression === 100) {
    //         DoneTask = [...DoneTask, task.Task];
    //     }
    //     else{
    //         DueTask = [...DueTask, task.Task];
    //     }
    // }
    // }

    

    for (const task of userTasks) {
        //console.log(task.Task);
        //console.log(task.isCompleted);
        if (task.isCompleted) {
            DoneTask = [...DoneTask, task.Task];
        }
        else{
            DueTask = [...DueTask, task.Task];
        }
    }

   // console.log(typeof(DueTask[0].startTime))
   // const {DueTask, DoneTask} = await getDueDoneTask(userTasks);
    console.log(DueTask);
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
    //let userId = 5;

    // $:{
    //     DoneTask = [];
    //     DueTask = [];
    //     try{
    //         const response = await axios.get(`http://localhost:9000/api/user/${userId}/profile`)
    //         userTasks = response.data.userProfile_taskInfo
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    //     for (const task of userTasks) {
    //     //console.log(task.Task);
    //     if (task.Task.progression === 100) {
    //         DoneTask = [...DoneTask, task.Task];
    //     }
    //     else{
    //         DueTask = [...DueTask, task.Task];
    //     }
    // }
    // }
    async function dueToDone(due){
        try{
            const dataToSend = {
                taskId : due.taskId
            }
            const response = await axios.post(`http://localhost:9000/api/user/${userId}/profile/updateTaskProgression` , dataToSend)
        }
        catch(err){
            console.log(err);
        }
        // DueTask  = DueTask.filter(obj => obj.taskId !== due.taskId);
        // let tempObj = {taskId : due.taskId , taskName:due.taskName , startDate : due.startDate , deadline:due.deadline};
        // DoneTask = [...DoneTask , tempObj];

        DoneTask = [];
        DueTask = [];
        try{
            const response = await axios.get(`http://localhost:9000/api/user/${userId}/profile`)
            userTasks = response.data.userProfile_taskInfo
            
        }
        catch(err){
            console.log(err);
        }
        for (const task of userTasks) {
        //console.log(task.Task);
        if (task.isCompleted) {
            DoneTask = [...DoneTask, task.Task];
        }
        else{
            DueTask = [...DueTask, task.Task];
        }
        }
       
    }
    
    async function approveReq(req){
        // taskRequest  = taskRequest.filter(obj => obj.taskId !== req.taskId);
        reqStatus = 1;
        setTimeout(() => {
          reqStatus = 0;
        }, 1000); // Set timeout to 1 second
        const dataToSend = {
            taskId : req.Task.taskId,
            managerId : req.User_TaskAssignmentRequest_managerIdToUser.userId
        }
        try{
            const response = await axios.post(`http://localhost:9000/api/user/${userId}/profile/approveTaskAssignmentReq` , dataToSend)
        }catch(err){
            console.log(err);
        }
       
        try{
            const response2 = await axios.get(`http://localhost:9000/api/user/${userId}/profile`)
            userTasks = response2.data.userProfile_taskInfo
            TaskReq = response2.data.userProfile_taskAssignmentReq
        }catch(err){
            console.log(err);
        }

        
        

        DoneTask = [];
        DueTask = [];
        for (const task of userTasks) {
        //console.log(task.Task);
        if (task.isCompleted) {
            DoneTask = [...DoneTask, task.Task];
        }
        else{
            DueTask = [...DueTask, task.Task];
        }
        }

    }
    
    
    async function ignoreReq(req){
        //taskRequest = taskRequest.filter(obj => obj.taskId !== req.taskId);
        try{
            const dataToSend = {
                taskId : req.Task.taskId,
                managerId : req.User_TaskAssignmentRequest_managerIdToUser.userId
            }
            const response = await axios.post(`http://localhost:9000/api/user/${userId}/profile/ignoreTaskAssignmentReq` , dataToSend)
        }catch(err){
            console.log(err);
        }

        try{
            const response2 = await axios.get(`http://localhost:9000/api/user/${userId}/profile`)
            //userTasks = response2.data.userProfile_taskInfo
            TaskReq = response2.data.userProfile_taskAssignmentReq
        }catch(err){
            console.log(err);
        }

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
        .alignCenter{
            display : flex;
            align-items:center;
            margin-left: 5px;
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
       
    
        <div class='basis-1/2'>
            <Accordion>
                <AccordionItem>
                  <span slot="header" class="text-base flex gap-2">
                    <ShoppingCartSolid class="mt-0.5" />
                    <span>Due Task</span>
                  </span>
                  {#if DueTask.length === 0}
                     <h3>No Dues Task</h3>
                {/if}
                  {#each DueTask as due}
                  <div class='mb-5'>
                    <button>
                    <span class="flex items-center"><Indicator size="sm" color="orange" class="me-1.5 mr-2" />Task Name : {due.taskName} <Button outline color="green" class="ml-10 size-sm" on:click={()=>dueToDone(due)}>Done</Button></span>
                    </button>
                    <Tooltip>
                        <div>
                            <p>TaskName : {due.taskName}</p>
                            <p>Start Date : {due.startTime}</p>
                            <p>Deadline : {due.deadline}</p>
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
                  {#if DoneTask.length === 0}
                     <h3>No Done Task</h3>
                {/if}
                  {#each DoneTask as done}
                  <div class='mb-5'>
                    <button>
                    <A href='/../comment'><span class="flex items-center"><Indicator size="sm" color="orange" class="me-1.5 mr-2" />Task Id : {done.taskId}   ,   Task Name : {done.taskName} </span></A>
                    </button>
                    <Tooltip>
                        <div>
                            <p>TaskName : {done.taskName}</p>
                            <p>Start Date : {done.startTime}</p>
                            <p>Deadline : {done.deadline}</p>
                        </div>
    
                    </Tooltip>
                  </div>
                  {/each}
                </AccordionItem>
              </Accordion>
        
        </div>
        
    
        <div class='basis-1/2'>
        <h1 class='mb-5'>Task Request</h1>
        {#if TaskReq.length === 0}
        <h3>There is no request to show</h3>
        {/if}
        {#each TaskReq as req}
        <div class = 'flex flex-rows'>
            <div class='alignCenter'>
                <Indicator size="sm" color="orange" class="me-1.5 mr-2 ml-2" />
            </div>
            <div class='mb-5 ml-3'>
                <p> Manager Name : {req.User_TaskAssignmentRequest_managerIdToUser.userName} </p>
                <p> Task Name : {req.Task.taskName} </p>
                <p> Creation time : {req.creationDate} </p>
            </div>
            <div class='alignCenter'>
                <GradientButton color="green" class='ml-10 ' on:click={()=>approveReq(req)}>Approve</GradientButton>
                <GradientButton color="red" class='ml-10 ' on:click={()=>ignoreReq(req)}>Ignore</GradientButton> 
            </div>
            <!-- <span class="flex items-center mb-5"><Indicator size="sm" color="orange" class="me-1.5 mr-2" />Task Id : {req.taskId} is requested by <b> manager name </b> : {req.managerId} 
            <GradientButton color="green" class='ml-10 ' on:click={()=>approveReq(req)}>Approve</GradientButton>
            <GradientButton color="red" class='ml-10 ' on:click={()=>ignoreReq(req)}>Ignore</GradientButton> -->
            
            
            <!-- </span> -->
        </div>
        {/each}
        </div>
        
    </div>
    
    