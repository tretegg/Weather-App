<script lang="ts">
    import type { ForecastDay } from "$lib/types/weather";

    export let day: ForecastDay;
    export let dayName: string

    $: date = new Date(day.date)

    const monthMap = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    function getExtension(dayOfMonth: number) {
        if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
            return "st"
        } else if (dayOfMonth === 2 || dayOfMonth === 22) {
            return "nd"
        } else if (dayOfMonth === 3 || dayOfMonth === 23) {
            return "rd"
        } else {
            return "th"
        }
    }

    $: readableDate = `${monthMap[date.getMonth()]} ${date.getDate()}${getExtension(date.getDate())}, ${date.getFullYear()}`


    const CONDITION_MAP: {[id: number]: string} = {
        1000: "Sunny",
        1003: "PartlyCloudy",
        1006: "Cloudy",
        1009: "Overcast",
    }

    const DEFAULT_CONDITION = "Cloudy"

    $: condition = day.day.condition.code in CONDITION_MAP ? CONDITION_MAP[day.day.condition.code] : DEFAULT_CONDITION

    let isSunUp = true

    $: if (day.astro.is_moon_up) {
        isSunUp = false
    } else {
        isSunUp = true
    }

    let isToday = false

    $: if (date.getDate() === new Date().getDate()) {
        isToday = true
    } else {
        isToday = false
    }

</script>

<!-- <div class="w-full flex items-center">


    {#if isToday}
        <img src="/svgs/{isSunUp ? "Sun" : "Moon"}.svg" class="invert h-[90%] ml-auto mr-2 aspect-square" alt="It is {isSunUp ? "day" : "night"}">
    {/if}
</div> -->

<div class="w-full h-full flex">
    <div class="w-[50%] h-full flex flex-col ">
        <div class="flex items-center">
            <h2 class="text-2xl text-bold h-full">{dayName}</h2>
            <p class="pl-2 text-gray-300 text-xs translate-y-1 -translate-x-1">{readableDate}</p>
        </div>

        <div class="flex flex-col pl-2 ">
            <p class="text-bold w-full text-left">Average temperature of: {day.day.avgtemp_c}° C</p>
            <p class="text-bold w-full text-left">Average humidity of: {day.day.avghumidity}%</p>
            <p class="text-bold w-full text-left">Estimated wind speed of: {day.day.maxwind_kph} km/h </p>
    
        </div>

    </div>
    <div class="w-[50%] h-full flex border-l">
        <!-- <h3 class="text-lg font-semibold">
            Forecasts
        </h3>
        <p class="text-bold w-full text-left">Rain: {day.day.daily_will_it_rain ? "✔" : "❌"}</p>
        <p class="text-bold w-full text-left">Snow: {day.day.daily_will_it_snow ? "✔" : "❌"}</p> -->
    </div>
</div>
