<script lang="ts">
    import type { ForecastDay, WeatherApiError, WeatherAPIResponse } from "$lib/types/weather";
    
    let loading: boolean = false
    let firstLoad: boolean = false

    let form: HTMLFormElement
    let weatherDisplay: HTMLParagraphElement
    let forecastDisplay: HTMLParagraphElement
    
    let response: WeatherAPIResponse
    let forecast: ForecastDay

    let errorData: WeatherApiError["error"]

    let error: boolean = false

    async function handleClick() {
        loading = true

        response = (await (await fetch("/api/weather", {
            headers: {
                "X-city": form["city"].value as string
            }
        })).json() as WeatherAPIResponse)

        // @ts-ignore
        if (response.error) {
            error = true
            // @ts-ignore
            errorData = response.error
        }

        //forecast = (await (await fetch("/api/weather/forecast", {
        //    headers: {
        //        "X-city": form["city"].value as string
        //    }
        //})).json() as ForecastDay)
        
        // @ts-ignore
        //if (forecast.error) {
        //    error = true
        //    // @ts-ignore
        //    errorData = forecast.error
        //}

        console.log("forecast:", forecast)

        loading = false
        firstLoad = true
        

        //getWeather(form, weatherDisplay);
        //getHourlyWeather(form, forecastDisplay);
    }
</script>

<svelte:window 
    on:keypress={(e) => {
        if (e.key === "Enter" && !loading) handleClick()
    }}
/>

<div class="w-full h-[8%] border-b flex items-center justify-center space-x-8">
    <form bind:this={form} name="weatherForm" class="flex">
        <label class="pr-2" for="city">City:</label><br>
        <input class="text-black px-1 !outline-none" type="text" id="city" name="city" placeholder="e.g London"><br>
    </form> 

    <button disabled={loading} class:loading={loading} class="px-2 py-1 border border-white transitions duration-300 hover:scale-110 active:scale-105" on:click={handleClick}>Refresh Weather</button>

</div>

<div class='pl-2 pt-1 h-[92%]'>
{#if loading || !firstLoad}
    <p bind:this={weatherDisplay} class:loading-bar={loading} class='text-lg font-mono' id="weatherDisplay">{loading ? "Loading Weather..." : "Enter City."}</p>
{:else}
    {#if error}
        <div class="w-full h-full flex items-center justify-center">
            <p class="text-lg font-mono text-red-400">Error: {errorData.message}</p>
        </div>
    {:else}
        <div>
            <div>
                <div class="flex items-start">
                    <div class="flex flex-col">
                        <h1 class="text-2xl">
                            Weather for <strong>{response.location.name}</strong>
                        </h1>

                        <p class="text-sm text-gray-200">{response.location.country}</p>
                    </div>

                    <div class="flex flex-col ml-auto pr-4">
                        <div class="flex items-center justify-end space-x-1 text-right">
                            <p class="text-sm">Conditions are <strong class="text-base">{response.current.condition.text}</strong>  </p>
                            <!-- <img class=" w-[25px] h-[25px] aspect-square grayscale-100" src="{response.current.condition.icon}" alt="Wheather Icon"> -->
                        </div>

                        <div class="flex items-center justify-center space-x-1 text-xs">
                            <p class="">@ <strong class="text-sm">{response.location.localtime}</strong> local time</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    {/if}
{/if}
</div>

<style lang="postcss">
    
    .loading {
        @apply hover:!scale-100 active:!scale-100 text-gray-400 border-gray-400;
    }

    .loading-bar::after {
        content: "";
        @apply animate-spin inline-block rounded-full border-4 bg-transparent ml-2 border-gray-600 border-t-white w-[15px] h-[15px] relative top-[3px]
    }
</style>