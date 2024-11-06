<script lang='ts'>
    import { onMount } from "svelte";
    import { getWeather } from "../lib/components/base/weather";

    onMount(() => {

    })    

</script>


<div class="weather">
    <form name="weatherForm">
        <label for="city">City:</label><br>
        <input type="text" id="city" name="city"><br>
    </form> 
    <br>
    <button on:click={getWeather}>Refresh Weather</button>
    <br>
    <p id="weatherDisplay">Loading weather...</p>
</div>