<!-- <script>
  import { Card, Button, Label, Input, Checkbox,TextPlaceholder,Textarea } from 'flowbite-svelte';
</script>


<Card >
  <form class="flex flex-col space-y-6" action="/">
    <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
    <Label class="space-y-2">
      <span>Email</span>
      <Input type="email" name="email" placeholder="name@admin.com" required />
    </Label>
    <Label class="space-y-2">
      <span>Your password</span>
      <Input type="password" name="password" placeholder="•••••" required />
    </Label>
    <div class="flex items-start">
      <Checkbox>Remember me</Checkbox>
      <a href="/" class="ms-auto text-sm text-primary-700 hover:underline dark:text-primary-500"> Lost password? </a>
    </div>
    <Button type="submit" class="w-full">Login to your account</Button>
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
      Not registered? <a href="/" class="text-primary-700 hover:underline dark:text-primary-500"> Create account </a>
    </div>
  </form>
</Card> -->
<script>
  import { Card, Button, Label, Input, Checkbox,TextPlaceholder,Textarea } from 'flowbite-svelte';
</script>
<!-- <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
  <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
  <Card>
    <form class="flex flex-col space-y-6" action="/">
      <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
      <label class="space-y-2">
        <span>Email</span>
        <input type="email" name="email" placeholder="name@admin.com" required />
      </label>
      <label class="space-y-2">
        <span>Your password</span>
        <input type="password" name="password" placeholder="•••••" required />
      </label>
      <div class="flex items-start">
        <Checkbox>Remember me</Checkbox>
        <a href="/" class="text-primary-700 dark:text-primary-500 ms-auto text-sm hover:underline"> Lost password? </a>
      </div>
      <button type="submit" class="w-full">Login to your account</button>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">Not registered? <a href="/" class="text-primary-700 dark:text-primary-500 hover:underline"> Create account </a></div>
    </form>
  </Card>
</div> -->
<div class="relative flex min-h-screen flex-col justify-center bg-gray-50">
  <!-- <img src="/img/beams.jpg" alt="" class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" /> -->
  <!-- <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5  sm:max-w-lg sm:rounded-lg sm:px-10"> -->


  <Card class="flex flex-col m-auto w-1/2">
  <form class="flex flex-col space-y-6" action="/">
    <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
    <Label class="space-y-2">
      <span>Email</span>
      <Input type="email" name="email" placeholder="name@admin.com" required />
    </Label>
    <Label class="space-y-2">
      <span>Your password</span>
      <Input type="password" name="password" placeholder="•••••" required />
    </Label>
    <div class="flex items-start">
      <a href="/" class="ms-auto text-sm text-primary-700 hover:underline dark:text-primary-500"> Forgot password? </a>
    </div>
    <Button type="submit" class="w-full">Login to your account</Button>
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
      Not registered? <a href="/" class="text-primary-700 hover:underline dark:text-primary-500"> Create account </a>
    </div>
  </form>
</Card>
  <!-- </div> -->
</div>