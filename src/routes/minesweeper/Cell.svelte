<script lang="ts">
	// Demo cell click
	const handleClick = () => {
		console.log("Cell clicked");
	};
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<button class="w-10 h-10 flex items-center rounded-md justify-center border border-white/20 text-sm font-bold bg-white/5 hover:bg-white/10" onclick={handleClick}></button>
