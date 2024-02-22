<!-- 
<script>
	import { page } from '$app/stores';
    import { Card } from 'flowbite-svelte';
    import { GiftBoxSolid, ArrowUpRightFromSquareOutline } from 'flowbite-svelte-icons';
    import NavbarModule from './NavbarModule.svelte'
    import {token} from '$lib/token.js';
    import {get} from 'svelte/store';
    let notifications = [1,2,3,4,5,7];
    let type = 3;
    let svgType1 = "https://icon-library.com/images/completed-icon/completed-icon-6.jpg";   // job done
    let svgType2 = "https://1.bp.blogspot.com/-re0oDlJ5D7k/VtlGNWfAxiI/AAAAAAAAAnE/KRr7nLSYOR0/s1600/Deadline%252520Clock.jpg"; // danger ,deadline
    let svgType3 = "https://w7.pngwing.com/pngs/46/279/png-transparent-caution-logo-warning-sign-symbol-yellow-triangle-s-sign-signage-color-triangle.png";   // deadline extended

    let svgType = (type===1)?(svgType1) : ((type===2)?(svgType2):(svgType3));
    let alt = (type===1)?("done") : ((type===2)?("job coming"):("deadline extended"));
    let notImage = './src/routes/notification/notft.jpg'
    
    async function fetchnotifications(){
    //console.log("In update Profile");
    const redirecturl='/profile';
    const res = await fetch('http://localhost:3000/manager/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: get(token)
      }
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      if(data.success){
        alert("Notifications fetched successfully");
        //goto(redirecturl);
        location.reload();
      }
    }



  }
</script> -->
<!-- <NavbarModule></NavbarModule>
<hr class="my-.5 border-gray-300 dark:border-gray-700" />

<div class="grid grid-cols-2">
    <div class="col-span-1 ">
        <img src="https://static.vecteezy.com/system/resources/previews/000/442/087/original/notification-vector-icon.jpg" class="w-full h-screen object-cover object-center sticky top-0" alt='Notification'>
    </div>
    <div class='flex flex-col min-h-screen'>
        <h1 class = 'bg-blue-200'>Notifications</h1>
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
</div> -->
<script>
    import { Card } from 'flowbite-svelte';
    import NavbarModule from './NavbarModule.svelte';
    import { token } from '$lib/token.js';
    import { get } from 'svelte/store';
    import { goto } from '$app/navigation';
    import {page} from '$app/stores';
    console.log($page.data);
    let notifications = $page.data.data;

    // Functions to map notification types to corresponding SVG images
    function notificationTypeToSvg(type) {
        if (type === 0) return "https://icon-library.com/images/completed-icon/completed-icon-6.jpg";
        else if (type === 1) return "https://1.bp.blogspot.com/-re0oDlJ5D7k/VtlGNWfAxiI/AAAAAAAAAnE/KRr7nLSYOR0/s1600/Deadline%252520Clock.jpg";
        else if (type === 2) return "https://w7.pngwing.com/pngs/46/279/png-transparent-caution-logo-warning-sign-symbol-yellow-triangle-s-sign-signage-color-triangle.png";
        else return ""; // Default image URL or empty string if no match found
    }

</script>

<NavbarModule />
<hr class='my-.5 border-gray-300 dark:border-gray-700' />

<div class='grid grid-cols-2'>
    <div class='col-span-1'>
        <img src='https://static.vecteezy.com/system/resources/previews/000/442/087/original/notification-vector-icon.jpg' class='w-full h-screen object-cover object-center sticky top-0' alt='Notification' />
    </div>
    <div class='flex flex-col min-h-screen'>
        <h1 class='bg-blue-200'>Notifications</h1>
        {#each notifications as notification}
            <div class='w-full pl-2 pr-2'>
                <Card class='max-w-full'>
                    <img src={notificationTypeToSvg(notification.notificationType)} alt='Notification Type' class='w-7 h-7 mb-3 text-gray-500 dark:text-gray-400' />
                    <a href='/'>
                        <h5 class='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>Notification</h5>
                    </a>
                    <p class='mb-3 font-normal text-gray-500 dark:text-gray-400'>{notification.notificationMessage}</p>
                </Card>
            </div>
            <div class='mb-2'></div>
        {/each}
    </div>
</div>


  