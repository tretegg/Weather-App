<script lang="ts">
    import Nav from "$lib/components/base/Nav.svelte";
    import "../app.css"
    import { onNavigate } from '$app/navigation';
    import Particles from "$lib/components/particles.svelte";

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

<div class="absolute pointer-events-none top-0 left-0 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
    <Particles className="absolute inset-0" refresh={true} />
</div>
  