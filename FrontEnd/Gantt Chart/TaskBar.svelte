<script>
  import { createEventDispatcher } from 'svelte';
  export let task;
  export let earliestStart;
  export let totalDuration;
  let isPopupOpen = false;

  const dispatch = createEventDispatcher();

  function calculateMarginLeft() {
    const taskStart = task.start.getTime();
    const durationFromStart = taskStart - earliestStart;
    return (durationFromStart / totalDuration)*100;
  }

  function calculateWidth() {
    const taskStart = task.start.getTime();
    const taskEnd = task.end.getTime();
    const totalTaskDuration = taskEnd - taskStart;
    return (totalTaskDuration/totalDuration)*100;
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
    position: relative;
  }

  .dependency-text {
    margin-right: 10px;
    font-weight: normal;
    color: #ffda44;
  }

  .popup {
    position: absolute;
    top: 100%;
    left: 0;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>

<div
  class="task-bar"
  style="margin-left: {calculateMarginLeft()}%; width: {calculateWidth()}%;"
  on:click="{togglePopup}"
  on:keydown="{handleKeydown}"
  tabindex="0"
  role="button"
>
  {#if task.dependsOn}
    <span class="dependency-text">{task.dependsOn}</span>
  {/if}
  {task.name}
</div>

{#if isPopupOpen}
  <div class="popup" style="margin-left: {calculateMarginLeft()}%; width: {calculateWidth()}%;">
    <h3>{task.name}</h3>
    <p>Start: {task.start.toLocaleDateString()}</p>
    <p>End: {task.end.toLocaleDateString()}</p>
  </div>
{/if}