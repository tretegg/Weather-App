<script lang="ts">
    import type { WeatherAPIResponse } from "$lib/types/weather";
    
    let loading: boolean = false
    let firstLoad: boolean = false

    let form: HTMLFormElement
    let weatherDisplay: HTMLParagraphElement
    let forecastDisplay: HTMLParagraphElement
    
    let response: WeatherAPIResponse

    async function handleClick() {
        loading = true

        response = (await (await fetch("/api/weather", {
            headers: {
                "X-city": form["city"].value as string
            }
        })).json() as WeatherAPIResponse)

        
        console.log(response)

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
    <div>
        <div>
            <div class="flex items-start">
                <div class="flex flex-col">
                    <h1 class="text-2xl">
                        Weather for <strong>{response.location.name}</strong>
                    </h1>
                                
                    <p class="text-sm text-gray-200">{response.location.country}</p>
                </div>

                <div class="flex ml-auto items-center justify-center pr-4 space-x-1">
                    <p class="text-sm">Conditions are </p> <strong class="text-base">{response.current.condition.text}</strong>
                    <!-- <img class=" w-[25px] h-[25px] aspect-square grayscale-100" src="{response.current.condition.icon}" alt="Wheather Icon"> -->
                </div>

            </div>
        </div>

    </div>
{/if}
</div>

<style lang="postcss">
    
    .loading {
        @apply hover:!scale-100 active:!scale-100 text-gray-400 border-gray-400;
    }

    .loading-bar::after {
        content: "";
        @apply animate-spin inline-block rounded-full border-4 bg-transparent ml-2 border-gray-600 border-t-white w-[15px] h-[15px]
    }
</style>