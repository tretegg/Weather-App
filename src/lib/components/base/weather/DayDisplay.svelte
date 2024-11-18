<script lang="ts">
    import type { ForecastDay } from "$lib/types/weather";

    export let day: ForecastDay;
    export let dayName: string
</script>

<div class="w-full h-[20%]">
    <h2 class="text-2xl text-bold">{dayName}</h2>
</div>

<div class="w-full h-[80%] pl-2 flex">
    <div class="w-[50%] h-full flex flex-col ">
        <p class=" text-bold w-full text-left">Daily average temperature of: {day.day.avgtemp_c}°</p>
        <p class=" text-bold w-full text-left">Daily average temperature of: {day.day}°</p>
    
    </div>
    <div class="w-[50%] h-full flex flex-col border-l border-t pt-1 pl-2 border-r">
        <h3 class="text-lg font-semibold">
            Forecasts
        </h3>
        <p class=" text-bold w-full text-left">Rain: {day.day.daily_will_it_rain ? "✔" : "❌"}</p>
        <p class=" text-bold w-full text-left">Snow: {day.day.daily_will_it_snow ? "✔" : "❌"}</p>
    </div>
</div>
