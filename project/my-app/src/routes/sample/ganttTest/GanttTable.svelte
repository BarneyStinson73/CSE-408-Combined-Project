<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import Task from './Task.svelte'; // Define the Task component
  
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
    function flattenTasks(tasks , str) {
      let flatTasks = [];
     
      let childCount = 1;
      tasks.forEach(task => {
        let object = {
            index : str+childCount,
            taskName: task.taskName,
            startDate: task.startDate,
            endDate: task.endDate,
            startDateToLocal : task.startDate.toLocaleDateString(),
            endDateToLocal : task.endDate.toLocaleDateString()
        }
        flatTasks.push(object);
        flatTasks.push(...flattenTasks(task.subtasks , str+childCount+'.'));
        childCount = childCount + 1;
      });
      return flatTasks;
    }
  
    let flatTasks = []; // Flattened tasks array
  
    // Flatten the tasks on component mount
    onMount(() => {
      flatTasks = flattenTasks(project.tasks , '');
    });

    console.log(flatTasks);
    let tasks = [{index:1,name:"task 1"},{index : 2 , name:"task 2"}];
  </script>
<div class = 'flex flex-row'>
  <div class = 'basis-1/4'>
<Table hoverable={true}>
  <TableHead>
    <TableHeadCell>Index</TableHeadCell>
    <TableHeadCell>Task Name</TableHeadCell>
    <TableHeadCell>Start Date</TableHeadCell>
    <TableHeadCell>Deadline</TableHeadCell>
  </TableHead>
  <TableBody class="divide-y">
    <TableBodyRow>
      <TableBodyCell>{project.index}</TableBodyCell>
      <TableBodyCell>{project.projectName}</TableBodyCell>
      <TableBodyCell>{project.startDate.toLocaleDateString()}</TableBodyCell>
      <TableBodyCell>{project.deadline.toLocaleDateString()}</TableBodyCell>
    </TableBodyRow>
    {#each flatTasks as task}
    <TableBodyRow>
      <TableBodyCell>{task.index}</TableBodyCell>
      <TableBodyCell>{task.taskName}</TableBodyCell>
      <TableBodyCell>{task.startDateToLocal}</TableBodyCell>
      <TableBodyCell>{task.endDateToLocal}</TableBodyCell>
    </TableBodyRow>
    {/each}
  </TableBody>
</Table>
</div>
<div class='basis-1/2'> <h1>Gantt Chart</h1></div>

</div>
  
  