<script>
    import TaskItem from './TaskItem.svelte';
    export let task;
    export let count;

    //let margin = count * 4;

    let str = 'ml-' + count;
  
    function showSubtasks(subtasks) {
      return subtasks && subtasks.length > 0;
    }

  </script>
  <style>
    .task{
      margin-top : 10px;
    }
    </style>
    

  
    <div class="task">
      <h3 style="margin-left: {count}px;">{task.name}</h3>
      <p style="margin-left: {count}px;">Start Date: {task.startDate.toLocaleDateString()}</p>
      <p style="margin-left: {count}px;">End Date: {task.endDate.toLocaleDateString()}</p>
        <!-- <p>count : {count}</p> -->
      {#if showSubtasks(task.children)}
        <ul>
          {#each task.children as subtask}
            <li>
              <TaskItem task={subtask} count={count + 20}/>
            </li>
          {/each}
        </ul>
      {:else}
        {#each task.workers as worker}
        <p style="margin-left: {count}px;">Worker: {worker.username} , Progress : {worker.progress}</p>
        {/each}
      {/if}
    </div>
  