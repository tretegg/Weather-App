<script lang="ts">
    import type { NasaApodResponse } from "$lib/types/nasa";
    import { onMount } from "svelte";

    let nasa: NasaApodResponse | undefined;
    let error: NasaApodResponse["error"] | undefined 

    const MESSAGE_OVERRIDES: {[key: string]: string} = {
        "OVER_RATE_LIMIT": "Rate Limit Exceeded. Try again later."
    }

    onMount(async () => {
        error = undefined

        nasa = await (await fetch("/api/nasa")).json()

        if (nasa?.error) {
            error = nasa.error
            nasa = undefined
        }
    })
</script>

{#if nasa}
    <div class="w-full h-full flex flex-col items-center justify-center px-4 font-mono ">
        <h2 class="w-full text-left text-xl font-bold">Nasa APOD</h2>
        <p class="text-left text-sm">{nasa.explanation}</p>
        <img class="max-h-[60%] max-w-[90%] object-cover border mt-2 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:[box-shadow:0_0_20px_0px_rgba(255,255,255,0.5)]"
             src="{nasa.url}" alt="Nasa APOD of the day.">
    </div>
{:else if error}
    <div class="w-full h-full flex items-center justify-center">
        <p class="font-mono text-red-400 text-lg">Error: {MESSAGE_OVERRIDES[error.code] ? MESSAGE_OVERRIDES[error.code] : error.message}</p>
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