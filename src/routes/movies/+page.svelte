<script lang='ts'>
    import type { OMDBMovieDetail, OMDBSearchResponse, OMDBSearchResult } from "$lib/types/movies";
    import { fade, fly } from "svelte/transition";
    import Blurfade from "$lib/components/blurfade.svelte";
    import Borderbeam from "$lib/components/borderbeam.svelte";
    import NewInput from "$lib/components/base/newInput.svelte";

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
            <NewInput placeholder="e.g The Matrix" bind:element={movieTitle}></NewInput>
        </div>

        <button class:loading class="px-2 py-1 border transitions duration-300 hover:scale-110 active:scale-105" on:click={handleClick}>Search</button>
    </div>
 
</div>

<div class='px-2 py-1 mb-12 h-[92%] max-h-[92%] pb-[18%] sm:pb-[15%] lg:pb-[7%] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-800 scrollable '>
    {#if loading || !firstLoad}
    <Blurfade delay={0.25}>
        <p class:loading-bar={loading}>{loading ? "Loading..." : "Enter Movie Title."}</p>
    </Blurfade>
    {:else if data.Response === "True"}
    <Blurfade delay={0.5}>
        <div class="flex flex-col items-center pt-4">
            <p class="text-4xl font-bold mb-1">{data.Title}</p>
            <p class="text-gray-300 mb-2">{data.Released} &middot; {data.Rated} &middot; {data.Runtime}</p>
            <img src="{data.Poster}" alt="{data.Title} Poster" class="border-2 rounded-lg border-gray-600 mb-2">
            <div class="flex flex-wrap gap-x-2 mb-2">
                {#each genresList as genre}
                    <p class="border-2 rounded-full px-2 border-gray-600">{genre}</p>
                {/each}
            </div>
            <p class="w-[90%] lg:w-[40%] text-center">{data.Plot}</p>
            <div class="flex items-center"> 
                <img alt="Star icon" src="/imgs/star.png" class="w-[35px] h-[35px]">
                <p>{data.imdbRating}<span class="text-gray-400">/10</span></p>
            </div>
        </div>
    </Blurfade>
    {:else if data.Response === "False"}
        <Blurfade delay={0.25}>
            <p>{data.Error}</p>
        </Blurfade>
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
    div.scrollable {
        /* Chrome, Edge, Safari */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            background: transparent;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #2d2d2d;
            border-radius: 10px;
            border: 3px solid transparent;
        }

        ::-webkit-scrollbar-thumb:hover {
            background-color: #4a4a4a;
        }

        /* Firefox */
        scrollbar-width: thin;
        scrollbar-color: #2d2d2d transparent;
    }   
</style>