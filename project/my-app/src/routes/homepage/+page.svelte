<script>
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
  import { ChartPieSolid, GridSolid, MailBoxSolid, UserSolid, BagSolid, ArrowRightToBracketSolid, FileEditSolid, FireSolid, BookSolid, WindowRestoreOutline, LifeBuoySolid } from 'flowbite-svelte-icons';
  import { Card, Dropdown, DropdownItem, Avatar, Button } from 'flowbite-svelte';
  import { DotsHorizontalOutline } from 'flowbite-svelte-icons';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
  let spanClass = 'flex-1 ms-3 whitespace-nowrap';

  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Input } from 'flowbite-svelte';
  import { SearchOutline } from 'flowbite-svelte-icons';

import { Progressbar } from 'flowbite-svelte';
</script>
<!-- <img src="profile.jpg" alt="sample 1" class="w-64 h-64 rounded-full" /> -->


<Navbar>
  <NavBrand href="/">
    <img src="logo-no-background.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white" style="color: #dede50;font-family: 'Montserrat Alternates', monospace">Victor</span>
  </NavBrand>
  <div class="flex md:order-2">
    <Button color="none" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
      <SearchOutline class="w-5 h-5" />
    </Button>
    <div class="hidden relative md:block">
      <div class="flex absolute inset-y-0 start-0 items-center ps-3 pointer-events-none">
        <SearchOutline class="w-4 h-4" />
      </div>
      <Input id="search-navbar" class="ps-10" placeholder="Search..." />
    </div>
    <NavHamburger />
  </div>
  <NavUl>
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/about">About</NavLi>
    <NavLi href="/docs/components/navbar">Navbar</NavLi>
  </NavUl>
</Navbar>















<style>
  .propic {
    background-color: rgba(255, 255, 255, 0.5); /* Set the alpha value between 0 (completely transparent) and 1 (completely opaque) */
    /* You can also set other styles as needed */
  }
</style>

<div class="flex flex-row h-full">
<Card padding="md" class="flex flex-col h-full" color="rgb(255,255,255)">
  
  <div class="flex flex-col items-center pb-4">
    <img src="profile.jpg" class="w-64 h-64 rounded-full" alt="bonnie"/>
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
    <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
    <div class="flex mt-4 space-x-3 rtl:space-x-reverse lg:mt-6">
    </div>
  </div>
</Card>



<!-- 
<Sidebar >
  <SidebarWrapper>
    <SidebarGroup>
      <SidebarItem label="Dashboard">
        <svelte:fragment slot="icon">
          <ChartPieSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Projects" {spanClass}>
        <svelte:fragment slot="icon">
          <GridSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Notifications" {spanClass}>
        <svelte:fragment slot="icon">
          <MailBoxSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
        <svelte:fragment slot="subtext">
          <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Profile">
        <svelte:fragment slot="icon">
          <UserSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Sign Out">
        <svelte:fragment slot="icon">
          <ArrowRightToBracketSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
    </SidebarGroup>
    <SidebarGroup border>
      <SidebarItem label="Help">
        <svelte:fragment slot="icon">
          <LifeBuoySolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar> -->





<Card>
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project 1</h5>
  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Deadline:15 February 2024</p>

  <Progressbar progress="50" size="h-4" labelInside style="background-color: lime"/>
  <br>
  <Button class="w-fit" style="background-color: green">
    Details <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
  </Button>
</Card>
</div>