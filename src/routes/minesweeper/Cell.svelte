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

	function getNearBombs(col: number, row: number) {
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
		console.log(row, col);
		if (board[row][col] === 1) {
			console.log("Game Over");
			revealCell(col, row);
		} else if (board[row][col] === 0) { 
			floodFill(row, col);
		}
	};

	function revealCell(col: number, row: number) {
        const cell = hiddenCells.find(c => c.x === col && c.y === row);
        if (cell) {
            cell.hidden = false;
        }
    }

	function floodFill(row: number, col: number) {
		console.log(row, col);
		// Check bounds
		if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) return;

		// Get the current cell
		const cell = hiddenCells.find(c => c.y === row && c.x === col);

		// Skip if already revealed or flagged
		if (!cell || !cell.hidden || cell.flagged) {
			console.log(cell);
			return;
		}

		// Reveal the current cell
		cell.hidden = false;

		// If the cell is near a bomb, stop recursion
		if (getNearBombs(row, col) > 0) {
			if (board[row + 1][col] == 0 && getNearBombs(row + 1, col) == 0) {
				floodFill(row + 1, col);
			}
			if (board[row - 1][col] == 0 && getNearBombs(row - 1, col) == 0) {
				floodFill(row - 1, col);
			}
			if (board[row][col + 1] == 0 && getNearBombs(row, col + 1) == 0) {
				floodFill(row, col + 1);
			}
			if (board[row][col - 1] == 0 && getNearBombs(row, col - 1) == 0) {
				floodFill(row, col - 1);
			}
			return;
		}

		// Recur for all 4 neighboring cells
		floodFill(row + 1, col); // Down
		floodFill(row - 1, col); // Up
		floodFill(row, col + 1); // Right
		floodFill(row, col - 1); // Left
	}



	const flagCell = (event: MouseEvent, row:number, col:number) => {
        event.preventDefault();

		const cell = hiddenCells.find(c => c.x === col && c.y === row);
		if (cell && cell.hidden) {
			cell.flagged = !cell.flagged;
			revealCell(row, col);
		}
    };

</script>

{#each board as col, colIndex}
    {#each col as cell, rowIndex}
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button
            class="w-10 h-10 flex items-center rounded-md justify-center border border-white/20 text-sm font-bold bg-white/5 hover:bg-white/10"
            onclick={() => handleClick(rowIndex, colIndex)}
			oncontextmenu={(event) => flagCell(event, rowIndex, colIndex)}
        >
			{#if !hiddenCells.find(cell => cell.x === colIndex && cell.y === rowIndex)?.hidden}
                {#if hiddenCells.find(cell => cell.x === colIndex && cell.y === rowIndex)?.flagged == true}
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