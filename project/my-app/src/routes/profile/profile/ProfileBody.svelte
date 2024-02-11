<script>
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper , Label, Input, Checkbox , A } from 'flowbite-svelte';
    import { LockOpenSolid , GridSolid, MailBoxSolid, UserSolid, BagSolid, ArrowRightToBracketSolid, FileEditSolid, FireSolid, BookSolid, WindowRestoreOutline, LifeBuoySolid } from 'flowbite-svelte-icons';
    import { Card, Dropdown, DropdownItem, Avatar, Button } from 'flowbite-svelte';
    import { Modal } from 'flowbite-svelte';
    import { Tooltip} from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
    import { Alert } from 'flowbite-svelte';
    import { InfoCircleSolid } from 'flowbite-svelte-icons';
    import { fly } from 'svelte/transition';

    import UpdateProfile from './UpdateProfile.svelte';

    let defaultModal = false;
    let formModal = false;
    let count=[1,2,3];
    let placement = 'right';

    let tags = [{
        tag : "Java",
        projects : 3
    },{
        tag : "Python",
        projects : 4
    },{
        tag : "Java Script",
        projects : 2
    }]
    
    import { Progressbar } from 'flowbite-svelte';
    //export let upFunc;

    let user = {
      firstName : "John",
      lastName : "Doe",
      email : "John@email.com",
      contantNo : 1234,
      currently_available : true,
      type : "admin",
      password : 123
    }

    // let formData = {
    //   firstName : "",
    //   lastName : "",
    //   email : "",
    //   contantNo : 0,
    //   password: 123,

    // }
    let autoClose = false;
    let isHovered = false;
    function handleHover() {
    isHovered = !isHovered;
  }

  let userPassword = "123";
  let passwordCheck = 0;
  let passwordUpdateCheck = 0;

  function updatePassword(event){
    const password = event.target.old_password.value;

    if(password !== userPassword){
      passwordUpdateCheck = 2;
      setTimeout(()=>{
      passwordUpdateCheck = 0;
    } , 2000);
      return;
    }

    const newPassword = event.target.new_password.value;
    const confirmPassword = event.target.confirm_password.value;

    if(confirmPassword !== newPassword){
      passwordUpdateCheck = 3;
      setTimeout(()=>{
      passwordUpdateCheck = 0;
    } , 2000);
      return;
    } 

    user.password = newPassword;
    userPassword = newPassword;

    passwordUpdateCheck = 1;

    setTimeout(()=>{
      passwordUpdateCheck = 0;
    } , 2000);

  }

  function updateProfile(event){
    //console.log("In update Profile");
    const password = event.target.password.value;
    //console.log(password);
    if(password !== userPassword){
      //console.log("Wrong Password");
      //cnsole.log(password);
      passwordCheck = 2;
      setTimeout(() => {
      passwordCheck = 0
    } , 2000);
      return;
    }
      
      event.preventDefault(); // Prevent default form submission

    // Access form input values
    const firstName = event.target.first_name.value;
    //console.log(firstName);
    const lastName = event.target.last_name.value;
    const contantNo = event.target.phone.value;
    const email = event.target.email.value;
    
    // console.log(lastName);
    // console.log(email);
    // console.log(contantNo);
    user = {
      firstName : firstName,
      lastName : lastName,
      email : email,
      contantNo : contantNo,
      currently_available : true,
      type : "admin"
    };
    
    passwordCheck = 1;

    setTimeout(() => {
      passwordCheck = 0
    } , 2000);
    

    // user = user;


  }
  //console.log(user);
    
</script>


<style>
.imageSize{
    width: 150px;
    height: 100 px;
    border-radius: 50%;
    padding-left: 10 px;
}

.zIndex{
  z-index: 999;
}


.text:hover {
    color: rgb(0, 128, 0); /* Change color on hover */
    transition: color 0.3s ease;
}
.handleMargin{
  margin-top: 100 px;
}
.alignProper{
  align-items: center;
}
</style>

{#if passwordCheck === 1}
<Alert color="green" dismissable>
  <InfoCircleSolid slot="icon" class="w-4 h-4" />
  Profile updated Successfully 
 </Alert>
   <!-- <Alert visible={true} >
    Profile updated successfully!
  </Alert>  -->
{:else if passwordCheck === 2}
<Alert color="green" dismissable>
  <InfoCircleSolid slot="icon" class="w-4 h-4" />
  Sorry Wrong Password. Try Again.
</Alert>
{/if}

{#if passwordUpdateCheck === 1}
<Alert color="green" dismissable>
  <InfoCircleSolid slot="icon" class="w-4 h-4" />
  Password updated Successfully 
 </Alert>
   <!-- <Alert visible={true} >
    Profile updated successfully!
  </Alert>  -->
{:else if passwordUpdateCheck === 2}
<Alert color="green" dismissable>
  <InfoCircleSolid slot="icon" class="w-4 h-4" />
  Sorry Wrong Password. Try Again.
</Alert>

{:else if passwordUpdateCheck === 3}
<Alert color="green" dismissable>
  <InfoCircleSolid slot="icon" class="w-4 h-4" />
  New Password Filed and Confirmed Password Field is not same. Try Again.
</Alert>

{/if}

<div class = 'flex flex-row bg-yellow-50 z-10'>
    <div class ='basis-1/6 mt-10 pl-10'>
        <img src="./src/Human.jpeg" alt="Manager" class='imageSize'>
    </div>
    <div class=' mt-12'>
        <p>Name:{user.firstName +" "+ user.lastName}</p>
        <p>Contact No:{user.contantNo}</p>
        <p>Status: {user.type.charAt(0).toUpperCase() + user.type.slice(1)}</p>
        <p>Email:{user.email}</p>
        <p>Currently Available:{user.currently_available?("Yes"):("No")}</p>
    </div>  
</div>
<div class="flex flex-row z-10">
    <div class=" bg-slate-300 h-screen bg-white sticky top-0 z-40">
        <Sidebar>
            <SidebarWrapper >
              <SidebarGroup border >
                <button id='placement-4' on:mouseenter={()=> placement='right'}>
                <SidebarItem label="Expertise" class='text mt-5 pb-5' >
                  <svelte:fragment slot="icon">
                    <FireSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                 </SidebarItem>
                </button> 
                <Tooltip color="green" triggeredBy="[id^='placement-']" {placement}>
                  {#each tags as tag}
                  <div class='flex flex-col alignProper'>
                    <p>{tag.tag}</p>
                    <p>{tag.projects}</p>
                    
                    </div>
                    <hr/>
                  {/each}
                </Tooltip>
                <SidebarGroup border ></SidebarGroup>
                <button>
                <SidebarItem label="Projects"  class='mt-5 pb-5'>
                  <svelte:fragment slot="icon">
                    <GridSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                  <!-- <svelte:fragment slot="subtext">
                    <span class="inline-flex justify-center items-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"> Pro </span>
                  </svelte:fragment> -->
                </SidebarItem></button>
                <SidebarGroup border ></SidebarGroup>
<!--
                <button on:click={() => (defaultModal = true)}>Add me
                <Modal title="Update Profile" bind:open={defaultModal} autoclose outsideclose>
                <UpdateProfile />
                <svelte:fragment slot="footer">
                <Button on:click={() => alert('Handle "success"')}>I accept</Button>
                <Button color="alternative">Decline</Button>
                </svelte:fragment>
                </Modal></button> -->
                
                <button on:click={() => {defaultModal = true ; autoClose = false}}>
                <SidebarItem label="Update Profile" class='mt-5 pb-5'>
                  <svelte:fragment slot="icon">
                    <UserSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                  <!-- <svelte:fragment slot="subtext">
                    <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>
                  </svelte:fragment> --> 
                </SidebarItem></button>
                <SidebarGroup border ></SidebarGroup>
               
                  <Modal bind:open={defaultModal} size="xs" autoclose={autoClose} outsideclose class="w-full handleMargin">
                    <form class="flex flex-col space-y-6" on:submit={updateProfile}>
                      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Profile</h3>
                      <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                          <Label for="first_name" class="mb-2">First name</Label>
                          <Input type="text" id="first_name" placeholder="John"  required />
                        </div>
                        <div>
                          <Label for="last_name" class="mb-2">Last name</Label>
                          <Input type="text" id="last_name" placeholder="Doe"  required />
                        </div>
                        </div>
                        <div>
                          <Label for="phone" class="mb-2">Phone number</Label>
                          <!-- pattern={"[0-9]{3}-[0-9]{2}-[0-9]{3}"} -->
                          <Input type="tel" id="phone" placeholder="123-45-678" required />
                        </div>
                        <div class="mb-6">
                          <Label for="email" class="mb-2">Email address</Label>
                          <Input type="email" id="email" placeholder="john.doe@company.com"  required />
                        </div>
                        <div class="mb-6">
                          <Label for="password" class="mb-2">Password</Label>
                          <Input type="password" id="password" placeholder="•••••••••"  required />
                        </div>
                        <!-- <div class="mb-6">
                          <Label for="confirm_password" class="mb-2">Confirm password</Label>
                          <Input type="password" id="confirm_password" placeholder="•••••••••" required />
                        </div> -->
                        <Checkbox class="mb-6 space-x-1 rtl:space-x-reverse" required>
                          I agree with the terms and conditions.
                        </Checkbox>
                        <Button type="submit">Submit</Button>
                    </Modal>

                  <button on:click={() => (formModal = true)}>  
                <SidebarItem label="Update Password" class='mt-5 pb-5'>
                  <svelte:fragment slot="icon">
                    <LockOpenSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </svelte:fragment>
                  <!-- <svelte:fragment slot="subtext">
                    <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>
                  </svelte:fragment> --> 
                </SidebarItem></button>
                <Modal bind:open={formModal} size="xs" autoclose={false} outsideclose class="w-full handleMargin">
                  <form class="flex flex-col space-y-6" on:submit={updatePassword}>
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Password</h3>
                    
                      <div class="mb-6">
                        <Label for="password" class="mb-2">Old Password</Label>
                        <Input type="password" id="old_password" placeholder="•••••••••" required />
                      </div>
                      <div class="mb-6">
                        <Label for="new_password" class="mb-2">New password</Label>
                        <Input type="password" id="new_password" placeholder="•••••••••" required />
                      </div>
                      <div class="mb-6">
                        <Label for="confirm_password" class="mb-2">Confirm password</Label>
                        <Input type="password" id="confirm_password" placeholder="•••••••••" required />
                      </div>
                      
                      <Checkbox class="mb-6 space-x-1 rtl:space-x-reverse" required>
                        I agree with the <A href="/" class="text-primary-700 dark:text-primary-600 hover:underline">terms and conditions</A>.
                      </Checkbox>
                      <Button type="submit">Submit</Button>
                  </Modal>

                <SidebarGroup border></SidebarGroup>
              </SidebarGroup>
            </SidebarWrapper>
          </Sidebar>
    </div>
    <div class='mt-10 ml-10 flex-grow'>
        {#each count as _}
        <div class='grid grid-cols-2 '>
            
            <div class='mr-20'>
            <Card class="w-full m-auto">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project 1</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:15 February 2024</p>
              
                <Progressbar progress="50" size="h-4" labelInside style="background-color: lime"/>
                <br>
                <Button class="w-fit" style="background-color: green">
                  Details <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
                </Button>
              </Card>
            </div>
            <div class='mr-20'>
                <Card class="w-full m-auto">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project 1</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:15 February 2024</p>
                  
                    <Progressbar progress="50" size="h-4" labelInside style="background-color: lime"/>
                    <br>
                    <Button class="w-fit" style="background-color: green">
                      Details <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
                    </Button>
                  </Card>
                </div>
              <div class='my-10'></div>
              
        </div>
        {/each}
       
    </div>
</div>
<!-- <div class='mt-10 flex flex-row'>
    <div class='flex flex-row '>
        <div class="py-5 w-full"><GradientButton color="purpleToBlue">Expertise</GradientButton></div>
        <div class="py-5 w-full"><GradientButton color="cyanToBlue">Projects</GradientButton></div>
        <div class="py-5 w-full"><GradientButton color="greenToBlue">Update Profile</GradientButton></div>    
             <button class='resizeBlock'>Expertise</button>
            <but class='resizeBlock'>Projects</but>
            <div class='resizeBlock'>Update Profile</div> -->
    <!-- </div>

        <div>
            {#each count as _}
            <Card class="w-full m-auto">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project 1</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:15 February 2024</p>
              
                <Progressbar progress="50" size="h-4" labelInside style="background-color: lime"/>
                <br>
                <Button class="w-fit" style="background-color: green">
                  Details <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
                </Button>
              </Card>
              <div class='my-5'></div>
              {/each}
        </div>
    </div> -->

    
      
      



  
  