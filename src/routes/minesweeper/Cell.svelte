<script lang="ts">
    import { Flag } from "lucide-svelte";
    import { onMount } from "svelte";
    import { get } from "svelte/store";


	// Props
	let { board }: { board: Array<Array<number>> } = $props();

	let hidden: boolean = $state(true);
	// Demo cell click

	type HiddenCell = {
		x: number;
		y: number;
		hidden: boolean;
		flagged: boolean;
	};

	let hiddenCells: HiddenCell[] = $state([]);

	const BOARD_SIZE = 8;

	// Initialize hiddenCells with all cells hidden
	hiddenCells = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
		const x = Math.floor(index / BOARD_SIZE);
		const y = index % BOARD_SIZE;

		return { x, y, hidden: true, flagged: false };
	});


	onMount(() => {
	})

	function getNearBombs(row: number, col: number) {
		let nearBombs = 0;

		// Loop through the 3x3 grid around the cell
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				const neighborRow = row + i;
				const neighborCol = col + j;

				// Check if the neighbor is within bounds
				if (
					neighborRow >= 0 &&
					neighborRow < board.length &&
					neighborCol >= 0 &&
					neighborCol < board[0].length
				) {
					if (board[neighborRow][neighborCol] === 1) {
						nearBombs++;
					}
				}
			}
		}

		return nearBombs;
	}

	const handleClick = (row: number, col: number) => {
		console.log("Cell clicked");
		if (board[row][col] === 1) {
			console.log("Game Over");
			revealCell(row, col);
		} else if (board[row][col] === 0) {
			revealCell(row, col);
			// floodFill(row, col);
		}
	};

	function revealCell(x: number, y: number) {
        const cell = hiddenCells.find(c => c.x === x && c.y === y);
        if (cell) {
            cell.hidden = false;
        }
    }

	function floodFill(x: number, y: number) {
		const cell = hiddenCells.find(c => c.x === x && c.y === y);

		// Loop through the 3x3 grid around the cell
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				const neighborRow = x + i;
				const neighborCol = y + j;

				// Check if the neighbor is within bounds
				if (
					neighborRow >= 0 &&
					neighborRow < board.length &&
					neighborCol >= 0 &&
					neighborCol < board[0].length
				) {
					if (getNearBombs(neighborRow, neighborCol) == 0 && board[neighborRow][neighborCol] != 1) {
						revealCell(neighborRow, neighborCol);
						floodFill(neighborRow, neighborCol);
					} else if (getNearBombs(neighborRow, neighborCol) > 0 && board[neighborRow][neighborCol] != 1) {
						revealCell(neighborRow, neighborCol);
					} else if (board[neighborRow][neighborCol] === 1 || i && j == 0) {
						// ignore bombs and center cell
					}
				}
			}
		}
	}


	const flagCell = (event: MouseEvent, x:number, y:number) => {
        event.preventDefault();

		const cell = hiddenCells.find(c => c.x === x && c.y === y);
		if (cell) {
			cell.flagged = !cell.flagged;
			revealCell(x, y);
		}
    };

</script>

{#each board as row, rowIndex}
    {#each row as cell, colIndex}
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button
            class="w-10 h-10 flex items-center rounded-md justify-center border border-white/20 text-sm font-bold bg-white/5 hover:bg-white/10"
            onclick={() => handleClick(rowIndex, colIndex)}
			oncontextmenu={(event) => flagCell(event, rowIndex, colIndex)}
        >
			{#if !hiddenCells.find(cell => cell.x === rowIndex && cell.y === colIndex)?.hidden}
                {#if hiddenCells.find(cell => cell.x === rowIndex && cell.y === colIndex)?.flagged == true}
					<img
                        src="/svgs/flag.svg"
                        alt="minesweeper"
                        width="20"
                        height="20"
                        class="svg-white"
                    />
				{:else if cell === 1}
                    <img
                        src="/svgs/bomb.svg"
                        alt="minesweeper"
                        width="20"
                        height="20"
                        class="svg-white"
                    />
                {:else}
                    <p>{getNearBombs(rowIndex, colIndex)}</p>
                {/if}
            {/if}
        </button>
    {/each}
{/each}


<style>
    .svg-white {
      filter: invert(1) brightness(2);
    }
</style>