
<script>
    import { Card } from 'flowbite-svelte';
    import { GiftBoxSolid, ArrowUpRightFromSquareOutline } from 'flowbite-svelte-icons';
    let notifications = [1,2,3,4,5,7];
    let type = 1;
    let svgType1 = "https://www.clipartmax.com/png/middle/301-3011314_pe-success-icon-task-done.png";
    let svgType2 = "./src/job.png";
    let svgType3 = "./src/danger.png";

    let svgType = (type===1)?(svgType1) : ((type===2)?(svgType2):(svgType3));
    let alt = (type===1)?("done") : ((type===2)?("job coming"):("deadline extended"));
    let notImage = './src/routes/notification/notft.jpg'
</script>
<div class="grid grid-cols-2">
    <div class="col-span-1 ">
        <img src="https://static.vecteezy.com/system/resources/previews/000/442/087/original/notification-vector-icon.jpg" class="w-full h-screen object-cover object-center sticky top-0" alt='Notification'>
    </div>
    <div class='flex flex-col min-h-screen'>
        <h1 class = 'bg-green-200'>Notifications</h1>
        {#each notifications as notification}
        
            <div class='w-full pl-2 pr-2' >
            <Card class="max-w-full">
                <img src={svgType} alt="Danger" class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" />
                <a href="/">
                  <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Good news!!</h5>
                </a>
                <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Task Has been completed</p>
              </Card>
              </div>
            <div class='mb-2'></div>

        {/each}
    </div>
</div>


  