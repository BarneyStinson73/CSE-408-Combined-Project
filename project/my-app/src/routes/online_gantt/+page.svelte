<script>
	import { page } from '$app/stores';
  import ApexCharts from 'apexcharts';
  import moment from 'moment';
  
  // import {page} from '$app/stores';

  import { get } from 'svelte/store';
import { token } from '$lib/token.js';
 const ssr = false;
let task_id = '';
 async function load() {
	// const redirectUrl = '/profile';
	const res = await fetch('http://localhost:3000/manager/project/Gantt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: get(token)
		},
        body: JSON.stringify({task_id})
	});

	if (res.ok) {
		const data = await res.json();
		console.log(data);
		if (data.success) {
			alert('Gantt data fetched successfully');
			// notifications = data;
			// location.reload();
		}
		return data;
	}
}






   var options = {
          series: [
          {
            data,
            data: [
              {
                x: 'Design',
                y: [
                  new Date('2019-03-05').getTime(),
                  new Date('2019-03-08').getTime()
                ]
              },
              {
                x: 'Code',
                y: [
                  new Date('2019-03-08').getTime(),
                  new Date('2019-03-11').getTime()
                ]
              },
              {
                x: 'Test',
                y: [
                  new Date('2019-03-11').getTime(),
                  new Date('2019-03-16').getTime()
                ]
              }
            ]
          },
          {
            name: 'Joe',
            data: [
              {
                x: 'Design',
                y: [
                  new Date('2019-03-02').getTime(),
                  new Date('2019-03-05').getTime()
                ]
              },
              {
                x: 'Code',
                y: [
                  new Date('2019-03-06').getTime(),
                  new Date('2019-03-09').getTime()
                ]
              },
              {
                x: 'Test',
                y: [
                  new Date('2019-03-10').getTime(),
                  new Date('2019-03-19').getTime()
                ]
              }
            ]
          }
        ],
          chart: {
          height: 350,
          type: 'rangeBar'
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            var a = moment(val[0])
            var b = moment(val[1])
            var diff = b.diff(a, 'days')
            return diff + (diff > 1 ? ' days' : ' day')
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'vertical',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          }
        },
        xaxis: {
          type: 'datetime'
        },
        legend: {
          position: 'top'
        }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        
      
      
    
  chart.render(); 

  
  
</script>

<div id="chart"></div>
