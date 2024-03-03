<script>
    import GanttTable from './GanttTable.svelte'
    import App from './App.svelte'
    import {onMount} from 'svelte'

    // let square;
    // let circle;
    // let arrowPosition ;


    // onMount(() => {
    //     square = document.getElementById('square');
    //     circle = document.getElementById('circle');
    //     calculatePosition();
    // })

    // function calculatePosition() {
    //     const squareRect = square.getBoundingClientRect();
    //     const circleRect = circle.getBoundingClientRect();

    //     console.log(squareRect, circleRect);

    //     arrowPosition = {
    //         x1: squareRect.left + + squareRect.width / 2 ,
    //         y1: squareRect.bottom,
    //         x2: circleRect.left + (circleRect.width / 2),
    //         y2: circleRect.top - 10,
    //         arrowheadPoints: `${circleRect.left + (circleRect.width / 2)},${circleRect.top} ${circleRect.left + + (circleRect.width / 2) - 10},${circleRect.top - 10} ${circleRect.left + (circleRect.width / 2) + 10},${circleRect.top - 10}`
    //     };
    // }

    // let tasks = [
    //   {
    //     taskName: "Task 1",
    //     startDate: new Date('2024-02-2'),
    //     endDate: new Date('2024-02-2'),
    //     dependencies: []
    //   },
    //   {
    //     taskName: "Task 2",
    //     startDate: new Date('2024-02-2'),
    //     endDate: new Date('2024-02-2'),
    //     dependencies: ["Task 1"]
    //   },
    //   // Add more tasks as needed
    // ];
  
    // // Calculate the total duration of the project
    // let projectStartDate = tasks.reduce((minDate, task) => minDate < task.startDate ? minDate : task.startDate, tasks[0].startDate);
    // let projectEndDate = tasks.reduce((maxDate, task) => maxDate > task.endDate ? maxDate : task.endDate, tasks[0].endDate);
    // let projectDuration = (projectEndDate - projectStartDate) / (1000 * 60 * 60 * 24) + 1; // Total days including both start and end dates
  
    // // Calculate the width of each task in the Gantt chart
    // const taskWidth = 100 / projectDuration;
  
    // // Function to calculate the left offset of each task based on its start date
    // function getLeftOffset(startDate) {
    //   const startDiff = (startDate - projectStartDate) / (1000 * 60 * 60 * 24);
    //   return startDiff * taskWidth;
    // }
  
    // // Function to calculate the width of each task based on its duration
    // function getTaskWidth(startDate, endDate) {
    //   const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);
    //   return duration * taskWidth;
    // }
  
    // // Function to check if a task has dependencies
    // function hasDependencies(task) {
    //   return task.dependencies && task.dependencies.length > 0;
    // }
</script>
<div class='flex flex-row'>
    <div class="mr-5">
        <GanttTable />
    </div>
    <div>
        <a href="./ganttTry">View Gantt Chart</a>
    </div>
    
    <!-- <div class='basis-1/2'>
        <App />
    </div> -->


</div>
 

 <!-- <div class = "square" id="square" >
 </div>

 <div class = "circle" id="circle"> 
 </div>

 <svg
 style="position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
 xmlns="http://www.w3.org/2000/svg"
>
 {#if arrowPosition}
   <line
     x1={arrowPosition.x1}
     y1={arrowPosition.y1}
     x2={arrowPosition.x2}
     y2={arrowPosition.y2}
     stroke="red"
     stroke-width="2"
   />
   <polygon points={arrowPosition.arrowheadPoints} fill="red" />
 {/if}
</svg>

 <style>
    .square {
        width: 100px;
        height: 100px;
        background-color: red;
        margin-left : 400px;
    }

    .circle {
        width: 100px;
        height: 100px;
        background-color: blue;
        border-radius: 50%;
        margin-top: 50px;
        margin-left: 200px;
    }
</style> -->