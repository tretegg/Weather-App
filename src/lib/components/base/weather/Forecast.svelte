<script lang="ts">
    import type { Forecast } from "$lib/types/weather";
    import Cell from "./Forecast/Cell.svelte";

    export let forecast: Forecast

    $: days = forecast.forecastday
</script>

<div class="flex ">
    {#each days as day}
        <Cell {day} />
    {/each}
</div>