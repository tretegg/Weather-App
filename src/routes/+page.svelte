<script lang='ts'>
    import { onMount } from "svelte";
    import Weather from "$lib/components/base/weather/weather.svelte";
    import Nasa from "$lib/components/base/nasa/Nasa.svelte"
</script>

<div class="flex h-full">
    <div class="weather h-full w-[50%] border-r">
        <Weather/>
    </div>

    <div class="h-full w-[50%]">
        <Nasa/>
    </div>
</div>