<script>
  import { onMount, onDestroy } from "svelte";
  import {page} from '$app/stores';

  let chartContainer;
  let chart; // Declare chart here to ensure it's accessible in onDestroy
  let data=$page.data;
  let tasks = [...data.data.inprogress, ...data.data.completed];
  console.log(tasks);

  onMount(() => {
    // Dynamically import ApexCharts to ensure it's only loaded client-side
    import("apexcharts").then((ApexCharts) => {
      const options = {
        chart: {
          type: "rangeBar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        series: [
          {
            
            data: tasks.map((task) => {
              return {
                x: task.taskName,
                y: [
                  new Date(task.startTime).getTime(),
                  new Date(task.endTime).getTime(),
                ],
              };
            }),
          },
        ],
        xaxis: {
          type: "datetime",
        },
      };

      // Ensure chartContainer is available
      if (chartContainer) {
        chart = new ApexCharts.default(chartContainer, options);
        chart.render();
      }
    });
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
</script>

<div bind:this={chartContainer} ></div>