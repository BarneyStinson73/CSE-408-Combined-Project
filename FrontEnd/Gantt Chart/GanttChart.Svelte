<script>
  import TaskBar from './TaskBar.svelte';
  export let tasks;

  // Calculate the earliest start date among all tasks
  const earliestStart = Math.min(...tasks.map(task => task.start.getTime()));

  // Find the latest end date among all tasks
  const latestEnd = Math.max(...tasks.map(task => task.end.getTime()));

  // Calculate the total duration of all tasks
  const totalDuration = latestEnd - earliestStart;

  // Generate an array of dates for the grid
  const gridDates = [];
  for (let i = earliestStart; i <= latestEnd; i += 24 * 60 * 60 * 1000) {
    gridDates.push(new Date(i));
  }
</script>

<style>
  .gantt-chart {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    border: 1px solid #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
    position: relative;
  }

  .grid {
    display: flex;
    border-top: 1px solid #ccc;
  }

  .grid-date {
    flex: 1;
    padding: 5px;
    text-align: center;
    font-size: 0.8em;
    color: #666;
  }

  .alternate-bg {
    background-color: #f0f0f0; /* Alternate background color */
  }
</style>

<div class="gantt-chart">
  <div class="grid">
    {#each gridDates as date, index}
      <div class="grid-date" style="width: 25px;" class:alternate-bg="{index % 2 !== 0}">
        {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
      </div>
    {/each}
  </div>
  {#each tasks as task}
    <TaskBar {task} {earliestStart} {totalDuration} />
  {/each}
</div>
