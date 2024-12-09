<script lang="ts">
	import Cell from "./Cell.svelte";

	// Props
	let { gameOver }: { gameOver: boolean } = $props();

	// Static board for UI demonstration
	const BOARD_SIZE = 8;
	const board = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0));
</script>

<div class="grid grid-cols-8 gap-1 gap-y-3 bg-transparent rounded">
	{#each board as row, i}
		{#each row as _, j}
			<Cell />
		{/each}
	{/each}
</div>
