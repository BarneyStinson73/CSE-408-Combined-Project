<script>
import Comment from './Comment.svelte';
import TaskGraph from './TaskGraph.svelte'
</script>

<div class = 'flex flex-row'>

    <div class = 'basis-1/2'>
        <TaskGraph />
    </div>



    <div class="basis-1/2">
        <Comment />
    </div>



</div>