<script lang="ts">
    import Nav from "$lib/components/base/Nav.svelte";
    import "../app.css"
    import { onNavigate } from '$app/navigation';
    import Particles from "$lib/components/particles.svelte";
    import Dock from "$lib/components/docktest.svelte"
    import { onMount } from "svelte";
    import { injectAnalytics } from '@vercel/analytics/sveltekit'

    let currentPage: string

    onMount(()=>{
        currentPage = window.location.pathname
    })

    onNavigate((navigation) => {
        if (!navigation.to) return
        if (navigation.to.url.pathname === currentPage) return

        currentPage = navigation.to.url.pathname

	    if (!document.startViewTransition) return;

	    return new Promise<void>((resolve) => {
	    	document.startViewTransition(async () => {
	    		resolve();
	    		await navigation.complete;
        	});
	    });
    });

    injectAnalytics()

</script>

<Nav />

<div class="w-full h-[95%]">
    <slot/>
</div>

<div class="absolute pointer-events-none top-0 left-0 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
    <Particles className="absolute inset-0" refresh={true} />
</div>

<div class="fixed bottom-0 left-1/2 -translate-x-1/2 z-[9999] mb-2">
    <Dock />
</div>
