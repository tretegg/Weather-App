<script lang='ts'>
    import type { OMDBMovieDetail, OMDBSearchResponse, OMDBSearchResult } from "$lib/types/movies";
    import { onMount } from "svelte";

    let form: HTMLFormElement
    let data: OMDBMovieDetail

    let firstLoad: boolean = false
    let loading: boolean = false
    let genresList: string[] = []

    async function handleClick() {
        loading = true

        data = await (await fetch("/api/movies", {
            headers: {
                "X-movie": movieTitle.value
            }
        })).json() as OMDBMovieDetail

        console.log(data) 

        loading = false
        firstLoad = true
        genresList = data.Genre.split(', ').map(genre => genre.trim());
    }

    let movieTitle: HTMLInputElement
</script>

<svelte:window 
    on:keypress={(e) => {
        if (e.key === "Enter" && !loading) handleClick()
    }}
/>

<div class="w-full h-[8%] border-b flex items-center justify-center space-x-8">

    <div class="flex space-x-4">
        <div class="flex items-center justify-center">
            <p class="tex-sm pr-2">Search Movies:</p>
            <input placeholder="e.g The Matrix" class="!outline-none text-black pl-1" bind:this={movieTitle} type="text">
        </div>

        <button class:loading class="px-2 py-1 border transitions duration-300 hover:scale-110 active:scale-105" on:click={handleClick}>Search</button>
    </div>
 
</div>
<div class='px-2 py-1 h-[92%]'>
    {#if loading || !firstLoad}
        <p class:loading-bar={loading} >{loading ? "Loading..." : "Enter Movie Title."}</p>
    {:else if data.Response === "True"}
        <p class="text-4xl font-bold mb-1">{data.Title}</p>
        <p class="text-gray-300 mb-1">{data.Released} &middot; {data.Rated} &middot; {data.Runtime}</p>
        <img src="{data.Poster}" alt="{data.Title} Poster" class="border-2 rounded-lg border-gray-600 mb-2">
        <div class="flex flex-wrap gap-x-2 mb-2">
            {#each genresList as genre}
                <p class="border-2 rounded-full px-2 border-gray-600">{genre}</p>
            {/each}
        </div>
        <p>{data.Plot}</p>
        <div class="flex items-center"> 
            <img alt="Star icon" src="/imgs/star.png" class="w-[35px] h-[35px]">
            <p>{data.imdbRating}<span class="text-gray-400">/10</span></p>
        </div>
    {:else if data.Response === "False"}
        <p>{data.Error}</p>
    {/if}
</div>


<style lang="postcss">
    .loading {
        @apply hover:!scale-100 active:!scale-100 text-gray-400 border-gray-400;
    }

    .loading-bar::after {
        content: "";
        @apply animate-spin inline-block rounded-full border-4 bg-transparent ml-2 border-gray-600 border-t-white w-[15px] h-[15px] relative top-[3px]
    }
</style>