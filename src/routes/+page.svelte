<script lang='ts'>
    import { onMount } from "svelte";
    import { getHourlyWeather, getWeather } from "../lib/components/base/weather";

    onMount(() => {
        
    })    

    let loading: boolean = false

    async function handleClick() {
        loading = true

        let response = await fetch("/api/weather", {
            headers: {
                "X-city": form["city"].value as string
            }
        }) 

        //getWeather(form, weatherDisplay);
        //getHourlyWeather(form, forecastDisplay);
    }

    let form: HTMLFormElement
    let weatherDisplay: HTMLParagraphElement
    let forecastDisplay: HTMLParagraphElement

</script>

<nav class="navbar">
    <ul class="nav-links">
        <li><a href="#home">Weather</a></li>
        <li><a href="#skibidi">Other thign</a></li>
    </ul>
</nav>

<div class="weather px-4 pt-3">
    <form bind:this={form} name="weatherForm" class="flex">
        <label class="pr-2" for="city">City:</label><br>
        <input class="text-black px-1 !outline-none" type="text" id="city" name="city" placeholder="e.g London"><br>
    </form> 

    <br>

    <button disabled={loading} class:loading={loading} class="px-2 py-1 border border-white transitions duration-300 hover:scale-110 active:scale-105" on:click={handleClick}>Refresh Weather</button>

    <br>
    
    <p bind:this={weatherDisplay} class:loading-bar={loading} class='mt-3 text-lg font-mono' id="weatherDisplay">{loading ? "Loading Weather..." : "Enter City."}</p>
    <p bind:this={forecastDisplay} class="font-mono" id="forecastDisplay"></p>
</div>

<style lang="postcss">
    
.loading {
    @apply hover:!scale-100 active:!scale-100 text-gray-400 border-gray-400;
}

.loading-bar::after {
    content: "";
    @apply animate-spin inline-block rounded-full border-4 bg-transparent w-5 h-5
}

.navbar {
    position: sticky;
    top: 0;
    background-color: #333;
    padding: 10px 0;
    z-index: 1000;
}

.navbar .nav-links {
    list-style: none;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
}

.navbar .nav-links li {
    margin: 0 20px;
}

.navbar .nav-links a {
    text-decoration: none;
    color: white;
    font-size: 18px;
    padding: 8px 12px;
    transition: background 0.3s;
    border-radius: 4px;
}

.navbar .nav-links a:hover {
    background-color: #575757;
}

</style>