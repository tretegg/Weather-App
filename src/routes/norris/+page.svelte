<script lang='ts'>

    let data: ChuckNorrisJoke

    let firstLoad: boolean = false
    let loading: boolean = false

    async function handleClick() {
        loading = true

        data = await (await fetch("/api/norris", {})).json() as ChuckNorrisJoke

        loading = false
        firstLoad = true
    }
</script>

<svelte:window 
    on:keypress={(e) => {
        if (e.key === "Enter" && !loading) handleClick()
    }}
/>

<div class="w-full h-[8%] border-b flex items-center justify-center space-x-8">
    <button class:loading class="px-2 py-1 border transitions duration-300 hover:scale-110 active:scale-105" on:click={handleClick}>Get a Fact</button>
</div>
 
<div class='px-2 py-1 h-[92%]'>
    {#if loading || !firstLoad}
        <p class:loading-bar={loading} >{loading ? "Loading..." : ""}</p>
    {:else}
        <div class="flex items-center border-2 rounded-lg pr-2 mt-2 hover:bg-[#141414]"> 
            <img alt="Chuck Norris icon" src={data.icon_url} class="w-[50px] h-[50px] mr-1">
            <p>"{data.value}"<span class="text-gray-400"></span></p>
        </div>
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