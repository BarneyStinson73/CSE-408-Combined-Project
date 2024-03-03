<script>
  import TaskBar from './TaskBar.svelte'; // recursion handled here
  import { createEventDispatcher } from 'svelte';
  import Arrow from './Arrow.svelte';
  import { Tooltip, Button } from 'flowbite-svelte';
  import ArrowDependency from './ArrowDependency.svelte';
  //import {Tooltip} from 'svelte';
  let placement = 'right';
  export let task;
  export let earliestStart;
  export let totalDuration;
  //export let container;
  let isPopupOpen = false;
  

  let taskId = `task-${task.taskId}`;

  const dispatch = createEventDispatcher();

  function calculateMarginLeft() {
    const taskStart = new Date(task.startTime.split('T')[0]).getTime();
    return ((taskStart - earliestStart) / (1000 * 60 * 60 * 24)) * 50; // Adjust scaling factor as needed
    // const durationFromStart = taskStart - earliestStart;
    // return (durationFromStart / totalDuration) * 100;
  }

  function calculateWidth() {
    const startDate = new Date(task.startTime.split('T')[0]).getTime();
    const endDate = new Date(task.deadline.split('T')[0]).getTime();
    return ((endDate - startDate) / (1000 * 60 * 60 * 24)) * 50; // Adjust scaling factor as needed
  }

  function togglePopup() {
    isPopupOpen = !isPopupOpen;
    dispatch('toggle', { isOpen: isPopupOpen, task });
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      togglePopup();
      event.preventDefault();
    }
  }

  // function togglePopup() {
  //   // Implement the logic to toggle the popup here if needed
	//   isPopupOpen = !isPopupOpen;
  //   dispatch('toggle', { isOpen: isPopupOpen, task });
	// }

	// function handleKeydown(event) {
  //   // Check if the key pressed is 'Enter' or 'Space'
  //   if (event.key === 'Enter' || event.key === ' ') {
  //     togglePopup();
  //     event.preventDefault(); // Prevent the default action to avoid scrolling on space key
  //   }
  // }

  // console.log(document.getElementById(`task-${task.id}`));
</script>

<style>
  .task-bar {
    display: flex;
    align-items: center;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    position: relative; /* Adjusted for positioning */
    z-index:25;
    margin-bottom: 20px;
    justify-content: center;
  }
  .adjustz-index{
    z-index:100;
  }
  /* .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid black;
  } */
  /* .dependency-text {
    margin-right: 10px;
    font-weight: normal;
    color: #ffda44;  */
    /* Highlight color for dependencies */
  /* } */
</style>
<button on:mouseenter={()=> placement='right'}>
<div
  class="task-bar"
  id={taskId}
  style="margin-left: {calculateMarginLeft()}px; width: {calculateWidth()}px;"
  tabindex="0"
  role="button"
>
  <!-- {#if task.dependsOn}
    <span class="dependency-text">{task.dependsOn}</span>
  {/if}
    -->
  <!-- {task.taskName}  -->
  <!-- {#if task.subtasks}
  <div class="subtasks" style="margin-left: {calculateMarginLeft()}px;">
    <div class="arrow" style="left: -5px; top: 50%;"></div> <ul>
      {#each task.subtasks as subtask}
        <li>
          <TaskBar task={subtask} {earliestStart} />
        </li>
      {/each}
    </ul>
  </div>
  {/if}
-->
{task.taskName}
</div>
</button> 
<Tooltip class="z-50">
    <p>{task.taskName}</p>
    <p>Start Time : {new Date(task.startTime.split('T')[0]).toDateString()}</p>
    <p>Deadline : {new Date(task.deadline.split('T')[0]).toDateString()}</p>
    <p> Progression : {task.progression}</p>
</Tooltip>


{#if isPopupOpen}
  <div class="popup" style="margin-left: {calculateMarginLeft()}px; width: {calculateWidth()}px;">
    <h3>{task.taskName}</h3>
    <p>Start: {new Date(task.startTime.split('T')[0]).toDateString()}</p>
    <p>End: {new Date(task.deadline.split('T')[0]).toDateString()}</p>
    <!-- Add other task details here -->
  </div>
{/if}

{#if task.subTasks.length > 0}

    {#each task.subTasks as subtask}
      <!-- <TaskBar bind:this={subtaskElements[i]} task={subtask} {earliestStart} />
      <Arrow fromElement={taskElement} toElement={subtaskElements[i]} /> -->
    <!-- <TaskBar task={subtask} {earliestStart} {totalDuration} {container} />
    <Arrow fromTask={task} toTask={subtask} {earliestStart} {container} /> -->
    <TaskBar task={subtask} {earliestStart} {totalDuration} />
    <!-- <Arrow fromTask={task} toTask={subtask} {earliestStart}  /> -->
     
    {/each}

{/if}

{#if task.subTasks.length > 0}
  {#each task.subTasks as subtask}
    <Arrow fromTask={task} toTask={subtask} />
  {/each}
{/if}

{#if task.dependencyTask.length > 0}
  {#each task.dependencyTask as dependency}
    <ArrowDependency fromTask={dependency.Task_DependentTask_masterIdToTask} toTask={task} />
  {/each}
{/if}
<!-- {#each task.dependency as dependency}
  <ArrowDependency fromTask={dependency} toTask={task} />
{/each}
{/if} -->





