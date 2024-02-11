<script>
    import { writable } from 'svelte/store';
    import TaskItem from './TaskItem.svelte'
    let count = 0;
    const tasks = [
      {
        id: 1,
        name: 'Task 1',
        startDate: new Date('2024-02-10'),
        endDate: new Date('2024-02-10'),
        children: [
          {
            id: 2,
            name: 'Subtask 1.1',
            startDate: new Date('2024-02-11'),
            endDate: new Date('2024-02-11'),
            children: [
              // ... more subtasks
            ],
            workers : [{
              username : "User 1",
              progress : 100
            },
            {
              username : "User 2",
              progress : 0
            }]
          },
          {
            id: 3,
            name: 'Subtask 1.2',
            startDate: new Date('2024-02-12'),
            endDate: new Date('2024-02-12'),
            workers : [{
              username : "User 1",
              progress : 100
            },
            {
              username : "User 2",
              progress : 0
            }]
          }
        ]
      },
      {
        id: 4,
        name: 'Task 2',
        startDate: new Date('2024-02-13'),
        endDate: new Date('2024-02-13'),
        workers : [{
              username : "User 1",
              progress : 100
            },
            {
              username : "User 2",
              progress : 0
          }]
      }];

  </script>
  
  <style>
    /* Styling for tasks and subtasks */
  </style>
  
  <div class="tasks">
    {#each tasks as task}
        <!-- <p>{task.name}</p> -->
      <TaskItem task={task} count={count}/>
    {/each}
  </div>
  