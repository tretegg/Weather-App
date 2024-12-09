<script lang="ts">
	import Board from "./Board.svelte";
	import Header from "./Header.svelte";

	// Game state
	let gameOver: boolean = $state(false);
	let won: boolean = $state(false);
	let flagCount: number = $state(0);
	let timeElapsed: number = $state(0);

	/** Start new game */
	const startNewGame = () => {
		gameOver = false;
		won = false;
		flagCount = 0;
		timeElapsed = 0;
	};

	function time() {
		timeElapsed++;
	}

	setInterval(time, 1000)
</script>

<main class="h-max bg-black text-white p-4 flex flex-col items-center justify-center">
	<div class="max-w-md w-full space-y-4">
		<Header {timeElapsed} {flagCount} />

		<Board {gameOver} />

		{#if gameOver}
			<div class="text-center">
				<p class="text-xl mb-4">{won ? "Congratulations! You Won!" : "Game Over!"}</p>
				<button onclick={startNewGame} class="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors rounded">Play Again</button>
			</div>
		{/if}
	</div>
</main>
