<!-- App.svelte -->
<script>
	import GanttChart from './GanttChart.svelte';
  import axios from 'axios';
  import {onMount} from 'svelte';

  let userId = 4;
  let projectId = 2;
  let tasksList = [];
  let projectInfo = {};
  let isLoading = true;
  
	// Initialize tasks with a dependsOn property
	// const tasks = [
	//   { name: 'Task 1', start: new Date(2024, 1, 1), end: new Date(2024, 1, 10), dependsOn: null },
	//   { name: 'Task 2', start: new Date(2024, 1, 5), end: new Date(2024, 1, 15), dependsOn: 'Task 1' },
	//   { name: 'Task 3', start: new Date(2024, 1, 8), end: new Date(2024, 1, 18), dependsOn: null }
	// ];

  onMount(async () => {
    const res = await axios.get(`http://localhost:9000/api/admin/${userId}/project/${projectId}`);
    projectInfo = res.data;
    console.log(projectInfo);
    tasksList = projectInfo.tasks;
    isLoading = false;
    // console.log(typeof(tasksList[0].startTime.split('T')[0]));
    // console.log(tasksList[0].startTime.split('T')[0]);
    // console.log(typeof(new Date(tasksList[0].startTime.split('T')[0])));
    // console.log(new Date(tasksList[0].startTime.split('T')[0]).toDateString());
  });
	// let tasks = [
  //     {
  //       id: 1,
  //       name: 'Task A',
  //       start: new Date(2024, 2, 1),
  //       end: new Date(2024, 2, 15),
  //       subtasks: [
  //         {
  //           id: 11,
  //           name: 'Task 1',
  //           start: new Date(2024, 2, 1),
  //           end: new Date(2024, 2, 5),
  //           subtasks: [
  //             {
  //               id: 111,
  //               name: 'Subtask 1.1',
  //               start: new Date(2024, 2, 1),
  //               end: new Date(2024, 2, 3),
  //               subtasks: [
  //                 {
  //                   id: 1111,
  //                   name: 'Sub Subtask 1.1.1',
  //                   start: new Date(2024, 2, 1),
  //                   end: new Date(2024, 2, 2)
  //                 },
  //                 {
  //                   id: 1112,
  //                   name: 'Sub Subtask 1.1.2',
  //                   start: new Date(2024, 2, 3),
  //                   end: new Date(2024, 2, 3)
  //                 }
  //               ]
  //             },
  //             {
  //               id: 112,
  //               name: 'Subtask 1.2',
  //               start: new Date(2024, 2, 4),
  //               end: new Date(2024, 2, 5),
	// 			dependency: [
	// 				{ 
	// 					id: 1111
	// 				}
	// 		  	]
  //             }
  //           ]
  //         },
  //         {
  //           id: 12,
  //           name: 'Task 2',
  //           start: new Date(2024, 2, 6),
  //           end: new Date(2024, 2, 10)
  //         }
  //       ]
  //     },
  //    {
  //       id: 2,
  //       name: 'Task B',
  //       start: new Date(2024, 2, 16),
  //       end: new Date(2024, 3, 25),
	// 	dependency: [
	// 		{	
	// 			id: 1
	// 		},
	// 		{
	// 			id: 11
	// 		}
	// 	]
  //    },
	//  {
	// 	id: 3,
	// 	name: 'Task C',
	// 	start: new Date(2024, 3, 26),
	// 	end: new Date(2024, 4, 5),
	//  },
	//  {
	// 	id: 4,
	// 	name: 'Task D',
	// 	start: new Date(2024, 4, 6),
	// 	end: new Date(2024, 4, 15),
	//  }
  //   ];
  </script>
  {#if !isLoading}
  <GanttChart tasks={tasksList} projectName={projectInfo.projectName}/>
  {/if}