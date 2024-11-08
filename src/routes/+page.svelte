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

<nav class="navbar">
    <ul class="nav-links">
        <li><a href="#home">Weather</a></li>
        <li><a href="#skibidi">Other thign</a></li>
    </ul>
</nav>

<div class="weather px-4 pt-3">
    <Weather/>
</div>

<div class="nasa-image px-4 pt-3">
    <p bind:this={nasaExplanation} class="font-mono"></p>
    <img bind:this={nasaImage} alt="" width="100%" height="100%">
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