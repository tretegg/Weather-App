<script lang="ts">
    import { onMount } from "svelte";
	import Cell from "./Cell.svelte";

	// Props
	let { gameOver }: { gameOver: boolean } = $props();

	// Static board for UI demonstration
	const BOARD_SIZE = 8;
	let  board = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0));
	const MINE_COUNT = 10;

	onMount(() => {
		generateMines();
		console.table(board)
	});

	function generateMines () {
		for (let i = 0; i < MINE_COUNT; i++) {
			let done = false;
			while (!done) {
				let x = getRandomInt(8);
				let y = getRandomInt(8);

				if (board[x][y] != 1) {
					board[x][y] = 1;
					done = true;
				} 
			}
		}
	}

	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}
</script>

<div class="grid grid-cols-8 gap-1 gap-y-3 bg-transparent rounded">
	{#each board as row, i}
		{#each row as _, j}
			<Cell />
		{/each}
	{/each}
</div>
