<script lang="ts">
    import type { ForecastDay } from "$lib/types/weather";
    import { createEventDispatcher } from "svelte";

    export let day: ForecastDay

    const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const dispatch = createEventDispatcher()
</script>

<button on:click={()=>{dispatch("dayChange", day)}} class=" w-20 h-28 border flex flex-col relative">

    <div class="w-full h-3/4 border-b">
        <img class="w-full h-full object-fill saturate-[5]" src="{day.day.condition.icon}" alt="{day.day.condition.text}">
    </div>

    <!-- <p class="w-full text-center text-xs absolute">
        {day.day.condition.text}
    </p> -->
    
    <p class="text-center w-full ">{dayMap[new Date(day.date).getDay()]}</p>
</button>