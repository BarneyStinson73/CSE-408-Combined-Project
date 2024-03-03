<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { onMount } from 'svelte';


    import axios from 'axios'
	import { data } from '../timeline/data';
  let isLoading = true;
    let databackend = "";
    let flatTasks = [];
    function flattenTasks(tasks , str) {
      let flatTasks = [];
     
      let childCount = 1;
      tasks.forEach(task => {
        let object = {
            index : str+childCount,
            taskName: task.taskName,
            startTime: task.startTime,
            deadline: task.deadline,
            dependencyTask : task.dependencyTask
        }
        flatTasks.push(object);
        flatTasks.push(...flattenTasks(task.subTasks , str+childCount+'.'));
        childCount = childCount + 1;
      });
      return flatTasks;
    }
    onMount(async () => {
      console.log("I am in on mount")
        
        try{
            const response = await axios.get('http://localhost:9000/api/admin/4/project/2');
            console.log(response.data);
            databackend = response.data;
            databackend.index = '0'
        }
        catch(err){
            console.log(err);
        }

        flatTasks = flattenTasks(databackend.tasks , '');
        isLoading = false;
    });

    //let 
  
    let project = {
      index : '0',
      projectName: "Project X",
      startDate : new Date('2024-02-10'),
      deadline : new Date('2024-02-10'),
      tasks: [
        {
          taskName: "Task 1",
          startDate: new Date('2024-02-10'),
          endDate: new Date('2024-02-20'),
          subtasks: [
            {
              taskName: "Subtask 1",
              startDate: new Date('2024-02-11'),
              endDate: new Date('2024-02-15'),
              subtasks: [{
                taskName: "Sub Subtask 1",
                startDate: new Date('2024-02-11'),
                endDate: new Date('2024-02-15'),
                subtasks: [{
                    taskName: "Sub Sub Subtask 1",
                    startDate: new Date('2024-02-11'),
                    endDate: new Date('2024-02-15'),
                    subtasks: []
                }]
              }]
            },
            {
              taskName: "Subtask 2",
              startDate: new Date('2024-02-12'),
              endDate: new Date('2024-02-18'),
              subtasks: []
            }
          ]
        },
        {
          taskName: "Task 2",
          startDate: new Date('2024-02-15'),
          endDate: new Date('2024-02-25'),
          subtasks: []
        }
      ]
    };
  
    // Function to recursively flatten the task hierarchy
    
  
    // let flatTasks = []; // Flattened tasks array
  
    // Flatten the tasks on component mount
    // onMount(() => {
    //   flatTasks = flattenTasks(project.tasks , '');
    // });

    console.log(flatTasks);
    //let tasks = [{index:1,name:"task 1"},{index : 2 , name:"task 2"}];
  </script>
<!-- <div class = 'flex flex-row'> -->
  <!-- <div class = 'basis-1/4'> -->
{#if !isLoading}
<Table hoverable={true}>
  <TableHead>
    <TableHeadCell>Index</TableHeadCell>
    <TableHeadCell>Task Name</TableHeadCell>
    <TableHeadCell>Start Date</TableHeadCell>
    <TableHeadCell>Deadline</TableHeadCell>
    <TableHeadCell>Dependency Task</TableHeadCell>
  </TableHead>
  <TableBody class="divide-y">
    <TableBodyRow>
      <TableBodyCell><b>{databackend.index}</b></TableBodyCell>
      <TableBodyCell><b>{databackend.projectName}</b></TableBodyCell>
      <TableBodyCell><b>{databackend.startTime.split('T')[0]}</b></TableBodyCell>
      <TableBodyCell><b>{databackend.deadline.split('T')[0]}</b></TableBodyCell>
      <TableBodyCell>None</TableBodyCell>
    </TableBodyRow>
    {#each flatTasks as task}
    <TableBodyRow>
      <TableBodyCell>{task.index}</TableBodyCell>
      <TableBodyCell>{task.taskName}</TableBodyCell>
      <TableBodyCell>{task.startTime.split('T')[0]}</TableBodyCell>
      <TableBodyCell>{task.deadline.split('T')[0]}</TableBodyCell>
      <TableBodyCell>
        {#if task.dependencyTask.length == 0}
          None
        {/if}
        {#each task.dependencyTask as dependencyTask}
          <p>{dependencyTask.Task_DependentTask_masterIdToTask.taskName}</p>
        {/each}
      </TableBodyCell>
    </TableBodyRow>
    {/each}
  </TableBody>
</Table>
{/if}

<!-- </div> -->
<!-- <div class='basis-1/2'> <h1>Gantt Chart</h1></div> -->

<!-- </div> -->
  
  