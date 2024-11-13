<script lang='ts'>
    import { onMount } from "svelte";
    import { getNasaData } from "$lib/components/base/nasa";
    import type { NasaApodResponse } from "$lib/types/nasa";
    import Weather from "$lib/components/base/weather/weather.svelte";

    onMount(async () => {
        let nasa = await getNasaData() as NasaApodResponse;
        if (nasa.hdurl) {
           nasaImage.src = nasa.hdurl; 
        }
        nasaImage.alt = nasa.title;
        nasaExplanation.innerHTML = nasa.explanation;
    })    


    let nasaImage: HTMLImageElement
    let nasaExplanation: HTMLParagraphElement

</script>

<nav class="navbar h-[5%]">
    <ul class="nav-links">
        <li><a href="./">Home</a></li>
        <li><a href="./news">News</a></li>
    </ul>
</nav>

<div class="flex h-[95%]">
    <div class="weather h-full w-[50%] border-r">
        <Weather/>
    </div>

    <div class="nasa-image px-4 pt-3 h-full w-[50%] flex flex-col items-center justify-center">
        <h2 class="text-left text-xl font-mono w-full">NASA APOD</h2>
        <p bind:this={nasaExplanation} class="font-mono text-sm"></p>
        <img bind:this={nasaImage} alt="An image taken from a nasa apod" class="mt-2 border border-white" width="100%" height="60%">
    </div>
</div>

<style lang="postcss">


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