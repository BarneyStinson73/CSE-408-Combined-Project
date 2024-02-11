<script>
  import GanttTable from './GanttTable.svelte'

  let tasks = [
    {
      taskName: "Task 1",
      startDate: new Date('2024-02-2'),
      endDate: new Date('2024-02-2'),
      dependencies: []
    },
    {
      taskName: "Task 2",
      startDate: new Date('2024-02-2'),
      endDate: new Date('2024-02-2'),
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

<GanttTable />