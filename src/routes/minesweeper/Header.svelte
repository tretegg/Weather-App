<script lang="ts">
	let { timeElapsed, flagCount }: { timeElapsed: number; flagCount: number } = $props();
</script>

<header class="flex justify-between items-center bg-transparent p-4 pl-2 rounded">
	<div class="flex items-center gap-2">
		<img src="/svgs/clock.svg" alt="clock" class="w-5 h-5 svg-white" />
		<span>00:00</span>
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