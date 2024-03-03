<!-- GanttChart.svelte -->
<script>
  import TaskBar from './TaskBar.svelte';
  export let tasks;
  export let projectName;
  let container;

  // Calculate the earliest start date among all tasks
  const earliestStart = Math.min(...tasks.map(task => new Date(task.startTime.split('T')[0]).getTime()));

  //console.log(typeof(earliestStart));

  // Find the latest end date among all tasks
  const latestEnd = Math.max(...tasks.map(task => new Date(task.deadline.split('T')[0]).getTime()));

  // Calculate the total duration of all tasks
  const totalDuration = latestEnd - earliestStart;

  // Generate an array of dates for the grid
  console.log((earliestStart));
  console.log((latestEnd));
  const gridDates = [];
  for (let i = earliestStart; i <= latestEnd; i += 24 * 60 * 60 * 1000) {
    gridDates.push(new Date(i));
  }
</script>

<style>
  .gantt-chart {
    position:relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    overflow: auto; 
    height:100vh;
    
    /* position:sticky; */
    
  }
  .grid-new {
    display: flex;
    border-top: 1px solid #ccc;
  }

  .grid-date {
    flex: 1;
    padding: 5px;
    text-align: center;
    font-size: 0.8em;
    color: #666;
    width: 50px;
    position: sticky;
    top: 0; /* This ensures that the grid-date sticks to the top */
    background-color: white; /* This ensures that the sticky headers have a background and aren't transparent */
    z-index: 50;
  }
</style>

<div class = 'grid grid-cols-4'>
 
  <div class = 'col-span-3'>
    <!-- <div bind:this={container} class="gantt-chart"> -->
      <div id='gantt-chart' class="gantt-chart">
        <!-- <div class = "gantt-chart-container"> -->
        <div class="grid-new">
          {#each gridDates as date}
            <div class="grid-date">{date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
          {/each}
        </div>
        {#each tasks as task}
          <TaskBar {task} {earliestStart} {totalDuration} />
          <!-- <TaskBar {task} {earliestStart} {totalDuration} {container}/> -->
        {/each}
        <!-- </div> -->
      </div>
  </div>
  <div class = 'col-span-1 ml-2'>
    <h1>Gantt Chart for {projectName}</h1>
  </div>
</div>

<!-- <div bind:this={container} class="gantt-chart"> -->
<!-- <div class="gantt-chart"> -->
  <!-- <div class = "gantt-chart-container"> -->
  <!-- <div class="grid">
    {#each gridDates as date}
      <div class="grid-date">{date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
    {/each}
  </div>
  {#each tasks as task}
    <TaskBar {task} {earliestStart} {totalDuration} {container}/>
  {/each} -->
  <!-- </div> -->
<!-- </div> -->