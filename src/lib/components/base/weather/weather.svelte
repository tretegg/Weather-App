<script lang="ts">
    import type CurrentWeather from "$lib/types/weather";

    
    let loading: boolean = false
    let firstLoad: boolean = false

    let form: HTMLFormElement
    let weatherDisplay: HTMLParagraphElement
    let forecastDisplay: HTMLParagraphElement

    
    async function handleClick() {
        loading = true

        let response = (await fetch("/api/weather", {
            headers: {
                "X-city": form["city"].value as string
            }
        }))

        response 

        

        //getWeather(form, weatherDisplay);
        //getHourlyWeather(form, forecastDisplay);
    }
</script>

<form bind:this={form} name="weatherForm" class="flex">
    <label class="pr-2" for="city">City:</label><br>
    <input class="text-black px-1 !outline-none" type="text" id="city" name="city" placeholder="e.g London"><br>
</form> 

<br>

<button disabled={loading} class:loading={loading} class="px-2 py-1 border border-white transitions duration-300 hover:scale-110 active:scale-105" on:click={handleClick}>Refresh Weather</button>

<br>

{#if loading || !firstLoad}
    <p bind:this={weatherDisplay} class:loading-bar={loading} class='mt-3 text-lg font-mono' id="weatherDisplay">{loading ? "Loading Weather..." : "Enter City."}</p>
{:else}

{/if}
<p bind:this={forecastDisplay} class="font-mono" id="forecastDisplay"></p>

<style lang="postcss">
    
    .loading {
        @apply hover:!scale-100 active:!scale-100 text-gray-400 border-gray-400;
    }

    .loading-bar::after {
        content: "";
        @apply animate-spin inline-block rounded-full border-4 bg-transparent ml-2 border-gray-600 border-t-white w-[15px] h-[15px]
    }
</style>