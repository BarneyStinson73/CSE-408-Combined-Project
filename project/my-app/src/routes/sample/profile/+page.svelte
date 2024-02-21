<script >
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger ,  Input , Search } from 'flowbite-svelte'
    import {Button, Dropdown, DropdownItem } from 'flowbite-svelte';
    import { ChevronDownSolid , SearchOutline } from 'flowbite-svelte-icons'; 
    import { Modal } from 'flowbite-svelte';
    let defaultModal = false;
    import ProfileBody from './ProfileBody.svelte'
    import NavbarModule from './NavbarModule.svelte'
    import UpdateProfile from './UpdateProfile.svelte'
    let showPrompt = false;
    const handlePrompt = () => {
        showPrompt = true;
    }
  </script>
    

  <NavbarModule></NavbarModule>

  <!-- <Button on:click={() => (defaultModal = true)}>Default modal</Button> -->
  <!-- <Modal title="Update Password" bind:open={defaultModal} autoclose>
  <UpdateProfile />
  <svelte:fragment slot="footer">
    <Button on:click={() => alert('Handle "success"')}>I accept</Button>
    <Button color="alternative">Decline</Button>
  </svelte:fragment>
  </Modal> -->
    <!-- {#if showPrompt}
        <UpdateProfile/>
    {/if} -->
  <ProfileBody/>

 
    


<!-- <Search>
    <Button>Search</Button>
</Search> -->
<!-- <Button>Dropdown button<ChevronDownSolid class="w-3 h-3 ms-2 text-white dark:text-white" /></Button>
<Dropdown>
  <DropdownItem>Dashboard</DropdownItem>
  <DropdownItem>Settings</DropdownItem>
  <DropdownItem>Earnings</DropdownItem>
  <DropdownItem>Sign out</DropdownItem>
</Dropdown> -->