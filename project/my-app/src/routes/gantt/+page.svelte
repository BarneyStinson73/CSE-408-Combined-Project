<script>
    import GanttTable from './GanttTable.svelte'

    let tasks = [
      {
        taskName: "Task 1",
        startDate: new Date('2024-02-10'),
        endDate: new Date('2024-02-20'),
        dependencies: []
      },
      {
        taskName: "Task 2",
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-02-25'),
        dependencies: ["Task 1"]
      },
      // Add more tasks as needed
    ];
  
    // Calculate the total duration of the project
    let projectStartDate = tasks.reduce((minDate, task) => minDate < task.startDate ? minDate : task.startDate, tasks[0].startDate);
    let projectEndDate = tasks.reduce((maxDate, task) => maxDate > task.endDate ? maxDate : task.endDate, tasks[0].endDate);
    let projectDuration = (projectEndDate - projectStartDate) / (1000 * 60 * 60 * 24) + 1; // Total days including both start and end dates
  
    // Calculate the width of each task in the Gantt chart
    const taskWidth = 100 / projectDuration;
  
    // Function to calculate the left offset of each task based on its start date
    function getLeftOffset(startDate) {
      const startDiff = (startDate - projectStartDate) / (1000 * 60 * 60 * 24);
      return startDiff * taskWidth;
    }
  
    // Function to calculate the width of each task based on its duration
    function getTaskWidth(startDate, endDate) {
      const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);
      return duration * taskWidth;
    }
  
    // Function to check if a task has dependencies
    function hasDependencies(task) {
      return task.dependencies && task.dependencies.length > 0;
    }
</script>

  <svg class="w-full" viewBox="0 0 1000 400">
    <!-- Draw tasks -->
    {#each tasks as task, index}
      <g transform="translate(0, {index * 40})">
        <!-- Task name -->
        <text x="5" y="15" font-size="14" fill="#333">{task.taskName}</text>
        <!-- Task bar -->
        <rect x={getLeftOffset(task.startDate)} y="20" width={getTaskWidth(task.startDate, task.endDate)} height="20" fill="#0074d9"></rect>
        <!-- Dependencies -->
        {#if hasDependencies(task)}
          {#each task.dependencies as dependency}
            {#each tasks as t}
              {#if t.taskName === dependency}
                <line x1={getLeftOffset(t.startDate) + getTaskWidth(t.startDate, t.endDate)} y1="30" x2={getLeftOffset(task.startDate)} y2="30" stroke="#ff4136" stroke-width="2"></line>
              {/if}
            {/each}
          {/each}
        {/if}
      </g>
    {/each}
  </svg>