<script>
  import { Input, Label, Helper, Button, Checkbox, A, Dropdown, DropdownItem, GradientButton } from 'flowbite-svelte'; 
  let username = '', password = '', confirmPassword = '', email = '', contact = '', position = '';

  import {token} from '$lib/token.js';
  import {goto} from '$app/navigation';
  async function register() {
    const redirecturl='/';
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password,email,contact,position })
    });

    if (res.ok) {
      const data = await res.json();
      token.set(data.token);
      console.log(data);
      if(data.success){
        alert('Registered successfully');
        goto(redirecturl);
      }
    }
  }
</script>
<div class="h-screen pt-20 m-auto  bg-cover bg-contain" style="background-image: url(./static/login.jpg)">
  <div class="bg-white w-1/2 m-auto pb-10 pt-10 rounded">
<h1 class="text-3xl text-center mb-6">Register</h1>
<form class="w-3/4 h-1/2 m-auto" on:submit|preventDefault={register}> 
  <div class="grid gap-6 mb-6 ">
    <div>
      <Label for="user_name" class="mb-2">User name</Label>
      <Input type="text" id="user_name" placeholder="John Doe" bind:value={username} required />
    </div>
    <div>
      <Label for="position" class="mb-2">Position</Label>
      <Input type="text" id="company" placeholder="Developer" bind:value={position} required />
    </div>
    <div>
      <Label for="phone" class="mb-2">Phone number</Label>
      <Input type="tel" id="phone" placeholder="123-45-678" bind:value={contact} required />
    </div>
    <!-- <div>
      <Label for="website" class="mb-2">Website URL</Label>
      <Input type="url" id="website" placeholder="flowbite.com" required />
    </div>
    <div>
      <Label for="visitors" class="mb-2">Unique visitors (per month)</Label>
      <Input type="number" id="visitors" placeholder="" required />
    </div> -->
  </div>
  <div class="mb-6">
    <Label for="email" class="mb-2">Email address</Label>
    <Input type="email" id="email" placeholder="john.doe@company.com" bind:value={email} required />
  </div>
  <div class="mb-6">
    <Label for="password" class="mb-2">Password</Label>
    <Input type="password" id="password" placeholder="•••••••••" bind:value={password} required />
  </div>
  <Checkbox class="mb-6 space-x-1 rtl:space-x-reverse" required>
    I agree with the <A href="/" class="text-primary-700 dark:text-primary-600 hover:underline">terms and conditions</A>.
  </Checkbox>
  <Button type="submit">Submit</Button>
</form>
</div>
</div>