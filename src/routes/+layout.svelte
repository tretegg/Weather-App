<script lang="ts">
    import Nav from "$lib/components/base/Nav.svelte";
    import "../app.css"
    import { onNavigate } from '$app/navigation';

    onNavigate((navigation) => {
	    if (!document.startViewTransition) return;

	    return new Promise<void>((resolve) => {
	    	document.startViewTransition(async () => {
	    		resolve();
	    		await navigation.complete;
        	});
	    });
    });

</script>

<Nav />

<div class="w-full h-[95%]">
    <slot/>
</div>