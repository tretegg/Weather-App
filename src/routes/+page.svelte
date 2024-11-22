<script lang='ts'>
    import { onMount } from "svelte";
    import Weather from "$lib/components/base/weather/weather.svelte";
    import Nasa from "$lib/components/base/nasa/Nasa.svelte"
</script>

<div class="flex h-full overflow-hidden">
    <div class="weather h-full w-full lg:w-[50%] lg:border-r">
        <Weather/>
    </div>

    <div class="h-full hidden lg:block lg:w-[50%]">
        <Nasa/>
    </div>
</div>