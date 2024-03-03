<script>
	import { onMount } from "svelte";
    
    export let fromTask;
    export let toTask;
   // export let container;
    let fromTaskElement;
    let toTaskElement;
    let arrowPosition;


    onMount(() => {
        fromTaskElement = document.getElementById(`task-${fromTask.taskId}`);
        toTaskElement = document.getElementById(`task-${toTask.taskId}`);
      
        //console.log(fromTaskElement, toTaskElement);
        calculatePosition();
        window.addEventListener('scroll', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };  
        //  // Add scroll event listener to the window or a specific container
        // window.addEventListener('scroll', handleScroll, true);

        // return () => {
        // // Clean up event listener when component is destroyed
        // window.removeEventListener('scroll', handleScroll, true);
// };
    });


    function calculatePosition(){
        const fromTaskRect = fromTaskElement.getBoundingClientRect();
        const toTaskRect = toTaskElement.getBoundingClientRect();
        

        //console.log(fromTaskRect, toTaskRect);

        // const containerScrollTop = container.scrollTop;

        const scrollX = window.scrollX;
        const scrollY = window.scrollY;


        let x1 , x2;
        // if(fromTaskRect.left + fromTaskRect.width / 2 - 20 - scrollX < containerRect.right){
        //     x1 = fromTaskRect.left + fromTaskRect.width / 2 - 20 - scrollX;
        // } else {
        //     x1 = containerRect.right - scrollX;
        // }

        // if(toTaskRect.left + toTaskRect.width / 2 - 20 - scrollX < containerRect.right){
        //     x2 = toTaskRect.left + toTaskRect.width / 2 - 20 - scrollX;
        // } else {
        //     x2 = containerRect.right - scrollX;
        // }

        arrowPosition = {
            x1: fromTaskRect.left + fromTaskRect.width / 2 - scrollX,
            y1: fromTaskRect.top - scrollY,
            x2: toTaskRect.left + toTaskRect.width / 2 - scrollX,
            y2: toTaskRect.top - 10 - scrollY,
           arrowheadPoints: `${toTaskRect.left + toTaskRect.width / 2},${toTaskRect.top} ${toTaskRect.left + (toTaskRect.width / 2) - 10},${toTaskRect.top - 10} ${toTaskRect.left + toTaskRect.width / 2 + 10},${toTaskRect.top - 10}`
        };
    }

    function handleScroll() {
        calculatePosition();
    }
</script>
  
  <!-- This SVG will be positioned absolutely within your Gantt chart container -->
  <svg
  style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow:visible"
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
    /* Additional styles if needed */
  </style>
  