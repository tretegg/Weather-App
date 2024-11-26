<script lang="ts">
    import Meteors from "$lib/components/meteors.svelte";
    import type { ForecastDay } from "$lib/types/weather";
    import { GetConditionIcon } from "./util";

    export let day: ForecastDay;
    export let dayName: string

    let hour = day.hour[new Date().getHours()]

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

    let condition: string

    $: if (isToday) {
        condition = GetConditionIcon(day, hour)
    } else {
        condition = GetConditionIcon(day)
    }

    let isSunUp = true

    $: isSunUp = day.astro.is_moon_up == 1

    $: isToday = date.getDate() === new Date().getDate()

    let readableTime: string

    $: if (new Date().getHours()+1 < 12) {
        readableTime = (new Date().getHours() + 1).toString() + "AM"
    } else {
        readableTime = (new Date().getHours() + 1).toString() + "PM"
    }
</script>

<!-- <div class="w-full flex items-center">


    {#if isToday}
        <img src="/svgs/{isSunUp ? "Sun" : "Moon"}.svg" class="invert h-[90%] ml-auto mr-2 aspect-square" alt="It is {isSunUp ? "day" : "night"}">
    {/if}
</div> -->

<div class="w-full h-full flex relative">
    <div class="w-[50%] h-full flex flex-col ">
        <div class="flex items-center">
            <h2 class="text-2xl text-bold h-full">{dayName}</h2>
            <p class="pl-2 text-gray-300 text-xs translate-y-1 -translate-x-1">{readableDate}</p>
        </div>

        <div class="flex flex-col pl-2 ">
            <p class="text-bold w-full text-left">Average temperature of: {hour.temp_c}° C</p>
            <p class="text-bold w-full text-left">Average humidity of: {hour.humidity}%</p>
            <p class="text-bold w-full text-left">Estimated wind speed of: {hour.wind_kph} km/h </p>
    
        </div>

    </div>
    <div class="w-[50%] h-full flex items-center justify-center border-l">
        <!-- <h3 class="text-lg font-semibold">
            Forecasts
        </h3>
        <p class="text-bold w-full text-left">Rain: {day.day.daily_will_it_rain ? "✔" : "❌"}</p>
        <p class="text-bold w-full text-left">Snow: {day.day.daily_will_it_snow ? "✔" : "❌"}</p> -->
    
        <div class="w-[80%] h-[75%] border flex">
            <div class="w-[50%] border-r px-2 relative">

                <img class="w-full h-full invert" src="/svgs/{condition}.svg" alt="{isToday ? day.day.condition.text : hour.condition.text}">
            </div>

            <div class="w-[50%] flex flex-col items-center justify-center h-full">
                <h3 class="text- text-center font-semibold ">
                {isToday ? hour.condition.text : day.day.condition.text}
                </h3>
                {#if isToday}
                    <p class="text-xs">@ {readableTime}</p>
                {/if}
            </div>
        </div>
        
    </div>

    <div class="w-full h-full absolute">
        <Meteors number={100}/>
    </div>
</div>