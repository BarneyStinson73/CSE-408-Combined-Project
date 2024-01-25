<!-- <script>
  import { Carousel } from 'flowbite-svelte';

  const images = [
    {
      alt: 'Home1',
      src: 'homepage1.webp',
      title: 'cosmic-timetraveler-pYyOZ8q7AII-unsplash.com'
    },
    {
      alt: 'Home2',
      src: 'homepage3.webp',
      title: 'cristina-gottardi-CSpjU6hYo_0-unsplash.com'
    },
    {
      alt: 'Johannes Plenio',
      src: 'homepage2.jpg',
      title: 'johannes-plenio-RwHv7LgeC7s-unsplash.com'
    },

  ];
</script>

<div class="max-w-4xl">
  
  <Carousel {images} Duration = {2000} />
</div> -->

<script>
  import { Carousel } from 'flowbite-svelte';

  const images = [
    {
      alt: 'Home1',
      src: 'homepage1.webp',
      title: 'cosmic-timetraveler-pYyOZ8q7AII-unsplash.com'
    },
    {
      alt: 'Home2',
      src: 'homepage3.webp',
      title: 'cristina-gottardi-CSpjU6hYo_0-unsplash.com'
    },
    {
      alt: 'Johannes Plenio',
      src: 'homepage2.jpg',
      title: 'johannes-plenio-RwHv7LgeC7s-unsplash.com'
    },
  ];
</script>
hello
hmph
<div class="carousel-container min-h-screen">
  <Carousel {images} Duration={2000} />
</div>

<style>
  .carousel-container {
    height: 100vh; /* Make the container full-screen height */
    width: 75vw/* Make the container full-screen width */;
    overflow: hidden; /* Hide overflow to prevent scrollbar */
  }

  /* Additional styles for Carousel customization can be added here */
</style>
