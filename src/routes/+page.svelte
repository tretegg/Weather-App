<script lang='ts'>
    import { onMount } from "svelte";
    import { getHourlyWeather, getWeather } from "../lib/components/base/weather";

    onMount(() => {
        
    })    

    function handleClick() {
        // @ts-ignore
        const form = document.forms["weatherForm"] as HTMLFormElement;
        const weatherDisplay = document.getElementById("weatherDisplay") as HTMLParagraphElement;
        const forecastDisplay = document.getElementById("forecastDisplay") as HTMLParagraphElement;
        getWeather(form, weatherDisplay);
        getHourlyWeather(form, forecastDisplay);
    }

</script>


<div class="weather">
    <form name="weatherForm">
        <label for="city">City:</label><br>
        <input type="text" id="city" name="city"><br>
    </form> 
    <br>
    <button on:click={handleClick}>Refresh Weather</button>
    <br>
    <p id="weatherDisplay">Loading weather...</p>
    <p id="forecastDisplay"></p>
</div>

<style>

</style>