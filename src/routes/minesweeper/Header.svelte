<script lang="ts">
	let { timeElapsed, flagCount }: { timeElapsed: number; flagCount: number } = $props();

	function getlength(number: number) {
		return number.toString().length;
	}

	let minuteDisplay = $state("0");
	let secondsDisplay = $state("0");

	function updateClock() {
		let minutes = Math.floor(timeElapsed / 60);
		let seconds = timeElapsed % 60;
		if (getlength(minutes) == 1) {
			minuteDisplay = "0" + minutes
		} else {
			minuteDisplay = minutes.toString()
		}

		if (getlength(seconds) == 1) {
			secondsDisplay = "0" + seconds
		} else {
			secondsDisplay = seconds.toString()
		}
	}

	setInterval(updateClock, 500)
	
</script>

<header class="flex justify-between items-center bg-transparent p-4 pl-2 rounded">
	<div class="flex items-center gap-2">
		<img src="/svgs/clock.svg" alt="clock" class="w-5 h-5 svg-white" />
		<span>{minuteDisplay}:{secondsDisplay}</span>
	</div>
	<div class="flex items-center gap-2">
		<img src="/svgs/flag.svg" alt="flag" class="w-5 h-5 svg-white" />
		<span>{flagCount}</span>
	</div>
</header>


<style>
    .svg-white {
      filter: invert(1) brightness(2);
    }
</style>