<script lang="ts">
    import type { ForecastDay } from "$lib/types/weather";

    export let day: ForecastDay

    const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
</script>

<div class=" w-20 h-28 border flex flex-col relative">
    <img class="w-full border-b saturate-[5] " src="{day.day.condition.icon}" alt="{day.day.condition.text}">
    <!-- <p class="w-full text-center text-xs absolute">
        {day.day.condition.text}
    </p> -->
    
    <p class="text-center w-full ">{dayMap[new Date(day.date).getDay()]}</p>
</div>