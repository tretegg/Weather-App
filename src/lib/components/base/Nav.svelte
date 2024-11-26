<script lang="ts">
    import { navigating } from "$app/stores";
    import { onMount } from "svelte";
    import Button from "./nav/Button.svelte";

    const pages: {[name: string]: string} = {
        "Home": "/",
        "News": "/news",
        "Movies": "/movies",
        "Norris": "/norris",
        "To-do": "/todo",
    }

    let currentPage = ""

    navigating.subscribe((e)=>{
        if (e?.to?.url?.pathname) {
            currentPage = e?.to?.url?.pathname
        }
    })

    onMount(()=>{
        currentPage = document.location.pathname
    })
</script>

<nav class="h-[5%] flex justify-center md:justify-start items-center w-full px-4 border-b">
    <!-- <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/news">News</a></li>
        <li><a href="/movies">Movies</a></li>
    </ul> -->

    <p class="font-bold text-xl font-mono hidden md:block">Weather & Etc.</p>
    <div class="md:ml-auto flex items-center justify-center space-x-2">
        {#each Object.entries(pages) as page}
            <Button current={currentPage === page[1]} name={page[0]} href={page[1]}/>
        {/each}
    </div>
</nav>

