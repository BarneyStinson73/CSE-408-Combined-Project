<script>
  import GanttChart from './GanttChart.svelte';

  // Initialize tasks with a dependsOn property
  const tasks = [
    { name: 'Task 1', start: new Date(2024, 1, 1), end: new Date(2024, 1, 10), dependsOn: null },
    { name: 'Task 2', start: new Date(2024, 1, 5), end: new Date(2024, 1, 18), dependsOn: 'Task 1' },
    { name: 'Task 3', start: new Date(2024, 1, 8), end: new Date(2024, 2, 3), dependsOn: null }		
  ];
</script>

<GanttChart {tasks} />