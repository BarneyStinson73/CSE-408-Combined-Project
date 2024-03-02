<!-- <script>
	import '../app.pcss';
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">

	<main>
		<slot />
	</main>

	<footer>
		<p>Our Project Management tool is working with over 30 companies.</p> 
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1 rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}



	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style> -->

<script>
	import '../app.pcss';
	import Header from './Header.svelte';
	import './styles.css';
	import NavbarModule from './profile/profile/NavbarModule.svelte';
	import {navigating} from '$app/stores';
	import { Diamonds } from 'svelte-loading-spinners';
</script>

<div>
	<!-- <Header></Header> -->
	<!-- <NavbarModule></NavbarModule> -->
	<main>
		{#if $navigating}
		<div class="flex justify-center items-center h-screen">
			<Diamonds size="60" color="#FF3E00" unit="px" duration="1s" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />
		</div>
		{:else}
		<slot />
		{/if}
		

		
	</main>
</div>
