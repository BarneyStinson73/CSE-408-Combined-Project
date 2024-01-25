<!-- <script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style> -->
<script>
  import { onMount } from 'svelte';

  let currentIndex = 0;
  const images = [
    'static/homepage2.jpg',
    'static/homepage1.webp',
    'static/homepage3.webp',
    // Add more image URLs if needed
  ];

  const direction = -1; // 1 for left to right, -1 for right to left

  const nextImage = () => {
    currentIndex = (currentIndex + direction + images.length) % images.length;
  };

  onMount(() => {
    // Auto-advance the slideshow every few seconds
    const interval = setInterval(nextImage, 5000); // Change the interval as needed

    return () => {
      // Cleanup the interval on component destruction
      clearInterval(interval);
    };
  });
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    height: 100vh;
  }

  .slideshow {
    flex: 1;
    position: relative;
    overflow: hidden;
    height: 100vh; /* Ensure the slideshow occupies full height */
  }

  .slide-container {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }

  .slide {
    width: 100vw;
    box-sizing: border-box;
  }

  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }

  .sidebar {
    width: 35%;
    box-sizing: border-box;
    background-color: rgba(242, 242, 242, 0.8); /* Partially transparent background */
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  /* Add more styling as needed */
</style>

<div class="slideshow">
  <div class="slide-container" style="transform: translateX(-{currentIndex * 100}vw)">
    {#each images as image, i (image)}
      <div class="slide" key={i}>
        <img src={image} alt={`Slide ${i + 1}`} />
      </div>
    {/each}
  </div>
</div>

<div class="sidebar">
  <!-- Add your text content here -->
  <h1>Welcome to My Website</h1>
  <p>This is some text content for the sidebar.</p>
  <!-- Add more content as needed -->
</div>







