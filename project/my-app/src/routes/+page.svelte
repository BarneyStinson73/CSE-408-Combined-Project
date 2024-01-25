<script>
	// import 'workingcarousel.svelte';
  // import { Carousel, GradientButton } from 'flowbite-svelte';
  import Workingcarousel from './workingcarousel.svelte';
  import Overlay from './Overlay.svelte';
  
  import {GradientButton} from 'flowbite-svelte';


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

<div class="h-screen">
  
  <Workingcarousel {images} duration = {2000} />
</div>
<div class="max-w-4xl">
  <!-- Your existing homepage content -->

  <!-- Include the Overlay component to overlay on top -->
  <Overlay />
  
</div>
