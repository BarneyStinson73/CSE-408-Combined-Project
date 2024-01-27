<script>
  import { Input, Label, Helper, Button, Checkbox, A } from 'flowbite-svelte';
import { Select } from 'flowbite-svelte';
import { Datepicker } from 'flowbite-svelte';
  let selected=[''];

  let countries = [
    { value: 'us', name: 'United States' },
    { value: 'ca', name: 'Canada' },
    { value: 'fr', name: 'France' }
  ];
</script>


manager,collaborator,sp colcollaborator


start end progress state tag

<div class="w-1/2 m-auto">
<form >
  
  <div class="mb-6">
    <Label for="email" class="mb-2">Project Name</Label>
    <Input type="email" id="email" placeholder="Sample Project" required />
  </div>
  <div class="mb-6">
    <Label>Project Manager
  <Select class="mt-2" items={countries} bind:value={selected} />
</Label>
  </div>
  <div class="mb-6">
    <!-- <Label for="confirm_password" class="mb-2">Confirm password</Label>
    <Input type="password" id="confirm_password" placeholder="•••••••••" required /> -->
  </div>
  <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
      <Label for="last_name" class="mb-2">Start Date</Label>
      <Input type="date" id="last_name" placeholder="Doe" required />
      
    </div>
    <div>
      <Label for="last_name" class="mb-2">Expiration Date</Label>
      <Input type="date" id="last_name" placeholder="Doe" required />
    </div>

  </div>
  <Button type="submit">Submit</Button>
</form>
</div>




