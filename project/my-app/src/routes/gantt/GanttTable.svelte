<script>
    import { onMount } from 'svelte';
    import Task from './Task.svelte'; // Define the Task component
  
    let project = {
      projectName: "Project X",
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
            endDate: task.endDate
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
  </script>
  
  <div class="overflow-x-auto">
    <table class="table-auto min-w-full">
      <thead>
        <tr>
          <th class="border px-4 py-2">Index</th>
          <th class="border px-4 py-2">Task Name</th>
          <th class="border px-4 py-2">Start Date</th>
          <th class="border px-4 py-2">End Date</th>
        </tr>
      </thead>
      <tbody>
        {#each flatTasks as task}
          <!-- <Task {task} /> -->
          <tr>
          <td>{task.index}</td>
          <td>{task.taskName}</td>
          <td>{task.startDate}</td>
          <td>{task.endDate}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>