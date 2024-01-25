<script>
	// import 'workingcarousel.svelte';
  // import { Carousel } from 'flowbite-svelte';
  import Workingcarousel from './workingcarousel.svelte';

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
  
  <Workingcarousel {images} Duration = {2000} />
</div>
