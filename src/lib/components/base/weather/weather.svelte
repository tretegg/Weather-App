<script lang="ts">
    import type { ForecastDay, WeatherApiError, WeatherAPIResponse, WeatherForecastAPIResponse } from "$lib/types/weather";
    import DayDisplay from "./DayDisplay.svelte";
    import Forecast from "./Forecast.svelte";
    import Radar from "./Radar.svelte";
    
    let loading: boolean = false
    let firstLoad: boolean = false

    let form: HTMLFormElement
    let weatherDisplay: HTMLParagraphElement
    
    // let response: WeatherAPIResponse
    let forecast: WeatherForecastAPIResponse

    let errorData: WeatherApiError["error"]

    let error: boolean = false

    let currentDay: ForecastDay
    let currentDate: Date

    $: if (currentDay) {
        currentDate = new Date(currentDay.date)
    }

    $: if (forecast && forecast.forecast) {
        // currentDay = forecast.forecast.forecastday[0]
        currentDay = getTodayForecast(forecast.forecast.forecastday)
    }

    
    function getTodayForecast(days: ForecastDay[]) {
        return days.filter(day => new Date(day.date).getDay() === new Date().getDay())[0]
    }

    async function handleClick() {
        loading = true
        error = false

        // response = (await (await fetch("/api/weather", {
        //     headers: {
        //         "X-city": form["city"].value as string
        //     }
        // })).json() as WeatherAPIResponse)

        // // @ts-ignore
        // if (response.error) {
        //     error = true
        //     // @ts-ignore
        //     errorData = response.error
        // }

        forecast = (await (await fetch("/api/weather/forecast", {
           headers: {
               "X-city": form["city"].value as string
           }
        })).json() as WeatherForecastAPIResponse)
        
        //@ts-ignore
        if (forecast.error) {
           error = true
           // @ts-ignore
           errorData = forecast.error
        }

        loading = false
        firstLoad = true
        
        console.log(forecast)

        form["city"].value = ""
        //getWeather(form, weatherDisplay);
        //getHourlyWeather(form, forecastDisplay);
    }

    function dayChange(e: CustomEvent<ForecastDay>) {
        currentDay = e.detail!
    }

    const DAY_MAP = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
</script>

<svelte:window 
    on:keypress={(e) => {
        if (e.key === "Enter" && !loading) handleClick()
    }}
/>

<div class="w-full h-[8%] border-b flex items-center justify-start px-2">
    <form bind:this={form} name="weatherForm" class="flex relative">
        <label class="pr-2" for="city">City:</label>
        <input class="text-black px-1 !outline-none" type="text" id="city" name="city" placeholder="e.g London"><br>
        
        <!-- <button on:click={()=>{form["city"].value = ""}} class="hover:text-black transitions duration-300 ease-in-out absolute scale-x-125 left-[93%] text-gray-400">
            X
        </button> -->
    </form> 

    <button disabled={loading} class:loading={loading} class="ml-auto px-2 py-1 border border-white transitions duration-300 hover:scale-110 active:scale-105" on:click={handleClick}>Refresh Weather</button>

</div>

<div class='px-2 pb-1 h-[92%]'>
{#if loading || !firstLoad}
    <p bind:this={weatherDisplay} class:loading-bar={loading} class='text-lg font-mono' id="weatherDisplay">{loading ? "Loading Weather..." : "Enter City."}</p>
{:else}
    {#if error}
        <div class="w-full h-full flex items-center justify-center">
            <p class="text-lg font-mono text-red-400">Error: {errorData.message}</p>
        </div>
    {:else}
        <div class="w-full h-full">
            <div class="w-full h-[8%]">
                <div class="flex items-center justify-center h-full">
                    <div class="flex flex-col">
                        <h1 class="text-2xl">
                            Weather for <strong>{forecast.location.name}</strong>
                        </h1>

                        <p class="text-sm text-gray-200">{forecast.location.country}</p>
                    </div>

                    <div class="flex flex-col ml-auto pr-4">
                        <div class="flex items-center justify-end space-x-1 text-right">
                            <p class="text-sm">Current conditions are <strong class="font-semibold">{forecast.current.condition.text.toLowerCase()}</strong>  </p>
                            <!-- <img class=" w-[25px] h-[25px] aspect-square grayscale-100" src="{response.current.condition.icon}" alt="Wheather Icon"> -->
                        </div>

                        <div class="flex items-center justify-center space-x-1 text-xs">
                            <p class="">@ <strong class="text-sm font-semibold">{forecast.location.localtime}</strong> local time.</p>
                        </div>
                    </div>

                </div>
            </div>

            <div class="w-full h-[92%]">
                <div class="w-full h-[50%] border-t">
                    <div class="w-full h-[50%] pl-2">
                        <DayDisplay day={currentDay} dayName={DAY_MAP[currentDate.getDay()]}/>
                    </div>

                    <div class="w-full h-[50%] border-t flex relative items-center justify-center">
                        <div class="w-full h-[15%] absolute top-0">
                            <p class="w-full text-left text-sm text-gray-300 pl-1">Click to see forecast for the day.</p>
                        </div>
                        <Forecast on:dayChange={dayChange} forecast={forecast.forecast} />
                    </div>
                </div>
                <Radar longitude={forecast.location.lon} latitude={forecast.location.lat}/>
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