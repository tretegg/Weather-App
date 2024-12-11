<script lang="ts">
    import { onMount } from "svelte";
	import Cell from "./Cell.svelte";

	// Props
	let { gameOver }: { gameOver: boolean } = $props();

	// Static board for UI demonstration
	const BOARD_SIZE = 8;
	let board = $state(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0)));
	const MINE_COUNT = 3;

	onMount(() => {
		generateMines();
		console.table(board);
	});

	function generateMines() {
		const newBoard = [...board]; // Create a shallow copy of the board
		for (let i = 0; i < MINE_COUNT; i++) {
			let done = false;
			while (!done) {
				let x = getRandomInt(BOARD_SIZE);
				let y = getRandomInt(BOARD_SIZE);

				if (newBoard[x][y] != 1) {
					newBoard[x][y] = 1;
					done = true;
				}
			}
		}
		board = newBoard; // Reassign to trigger reactivity
	}

	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}
</script>

<div class="grid grid-cols-8 gap-1 gap-y-3 bg-transparent rounded">
	<Cell board={board}/>
</div>
