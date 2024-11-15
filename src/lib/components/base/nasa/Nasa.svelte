<script lang="ts">
    import type { NasaApodResponse } from "$lib/types/nasa";
    import { onMount } from "svelte";

    let nasa: NasaApodResponse;

    onMount(async () => {
        nasa = await (await fetch("/api/nasa")).json()
    })
</script>

{#if nasa}
    <div class="w-full h-full flex flex-col items-center justify-center px-4 font-mono ">
        <h2 class="w-full text-left text-xl font-bold">Nasa APOD</h2>
        <p class="text-left text-sm">{nasa.explanation}</p>
        <img class="max-h-[60%] border mt-2" src="{nasa.url}" alt="Nasa APOD of the day.">
    </div>
{:else}
    <div class="w-full h-full flex items-center justify-center">
        <p class="loading-bar">Loading</p>
    </div>
{/if}

<style lang="postcss">
    .loading-bar {
        @apply font-mono
    }

    .loading-bar::after {
        content: "";
        @apply animate-spin inline-block rounded-full border-4 bg-transparent ml-2 border-gray-600 border-t-white w-[15px] h-[15px] relative top-[3px]
    }
</style>