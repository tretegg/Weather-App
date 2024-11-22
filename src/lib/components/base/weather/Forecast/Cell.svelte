<script lang="ts">
    import type { ForecastDay } from "$lib/types/weather";
    import { createEventDispatcher } from "svelte";

    export let day: ForecastDay

    const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const dispatch = createEventDispatcher()

    const CONDITION_MAP: {[id: number]: string} = {
        1000: "Sunny",
        1003: "PartlyCloudy",
        1006: "Cloudy",
        1009: "Overcast",
    }

    const DEFAULT_CONDITION = "Cloudy"

    $: condition = day.day.condition.code in CONDITION_MAP ? CONDITION_MAP[day.day.condition.code] : DEFAULT_CONDITION


</script>

<button on:click={()=>{dispatch("dayChange", day)}} class=" w-20 h-28 border flex flex-col relative">

    <div class="w-full h-3/4 border-b">
        <img class="w-full h-full object-fill invert" src="/svgs/{condition}.svg" alt="{day.day.condition.text}">
    </div>

    <!-- <p class="w-full text-center text-xs absolute">
        {day.day.condition.text}
    </p> -->
    
    <p class="text-center w-full ">{dayMap[new Date(day.date).getDay()]}</p>
</button>