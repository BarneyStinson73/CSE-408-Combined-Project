<!-- Overlay.svelte -->

<script>
    import { GradientButton } from 'flowbite-svelte';
    
  // Add any script logic if needed
</script>

<style>
  .overlay {
    height: 100vh; /* Cover the whole height of the screen */
    width: 35%; /* Only 35% of the width */
    margin: 0; /* Reset margin for body */
    display: flex;
    flex-direction: column;
    align-items: center; /* Center the content vertically */
    justify-content: center; /* Left align the content */
    padding: 0 20px; /* Add padding for better aesthetics */
    background-color: rgba(255, 255, 255, 0.85); /* Add transparency (adjust the last value between 0 and 1) */
    position: fixed; /* Fixed position to overlay on top of the content */
    z-index: 999; /* Ensure it's above other content */
    top: 0;
    left: 0;
  }
  .logo-container {
    margin-right: 20px; /* Adjust the margin as needed */
  }

  .text {
    /* Add any styles for the text */
    font-size: 1.5rem;
    font-weight: bold;
  }
  p {
    font-size: 1.5rem;
    font-weight: bold;
    align-self: center;
  }
    .button-container {
        display: flex;
    }
</style>

<div class="overlay">
    <div class="logo-container" >
      <img src="logo-no-background.svg" alt="logo" class="w-90 py-12 ps-20"/>
  </div>
     <div class="button-container">
      <GradientButton class="m-5" color="lime">Sign Up</GradientButton>
      <GradientButton class="m-5" color="lime">Log In</GradientButton>
  </div>
  <!-- Plan. Execute. Mesmerize. -->
</div>
