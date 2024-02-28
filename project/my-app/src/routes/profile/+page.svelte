<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Input, Search } from 'flowbite-svelte';
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownSolid, SearchOutline } from 'flowbite-svelte-icons';
	import ProfileBody from './ProfileBody.svelte';
	import NavbarModule from './NavbarModule.svelte';
</script>

<NavbarModule></NavbarModule>
<ProfileBody></ProfileBody>

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
