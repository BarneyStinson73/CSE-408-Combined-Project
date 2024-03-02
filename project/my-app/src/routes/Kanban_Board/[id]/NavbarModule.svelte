<script>
	import { goto } from '$app/navigation';
import { Navbar, NavBrand, NavLi, NavUl, NavHamburger ,  Input , Search , Button} from 'flowbite-svelte'
import { SearchOutline } from 'flowbite-svelte-icons';
// import { goto } from '$app/navigation';
async function logout(){
  const res = await fetch('http://localhost:3000/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    if(data.success){
      alert("Logged out successfully");
      goto('./');
    }
  }
}
</script>


  <Navbar class='sticky top-0 z-50'>
    <NavBrand href="/homepage">
      <img src="logo-no-background.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white" style="color: #dede50;font-family: 'Montserrat Alternates', monospace">Victor</span>
    </NavBrand>
    <div class="flex md:order-2">
      <Button color="none" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
        <SearchOutline class="w-5 h-5" />
      </Button>
      <div class="hidden relative md:block space--6">
        <div class="flex absolute inset-y-0 start-0 items-center ps-3 pointer-events-none">
          <SearchOutline class="w-4 h-4" />
        </div>
        <Input id="search-navbar" class="ps-10" placeholder="Search..." />
      </div>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;
    <Button on:click={logout} >Sign out</Button>
      <NavHamburger />
    </div>
    <NavUl>
      <NavLi href="/homepage" active={true}>Home</NavLi>
      <NavLi href="/profile">Profile</NavLi>
      <NavLi href="/notifications">Notifications</NavLi>
    </NavUl>
  </Navbar>
