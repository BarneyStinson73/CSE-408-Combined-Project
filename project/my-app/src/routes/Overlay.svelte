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
    align-items: center; /* Center the content vertically */
    justify-content: flex-start; /* Left align the content */
    padding: 0 20px; /* Add padding for better aesthetics */
    background-color: rgba(255, 255, 255, 0.8); /* Add transparency (adjust the last value between 0 and 1) */
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
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
</style>

<div class="overlay">
    <div class="logo-container" >
      <img src="logo-no-background.svg" alt="logo" />
  </div>
     <div class="button-container">
      <GradientButton color="blue">Sign Up</GradientButton>
      <GradientButton color="blue">Log In</GradientButton>
  </div>
  <!-- Plan. Execute. Mesmerize. -->
</div>