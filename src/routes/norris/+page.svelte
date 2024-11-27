<script lang="ts">
    import { flip } from "svelte/animate";
    import { blur, fade, fly } from "svelte/transition";

    let data: ChuckNorrisJoke;
    let firstLoad: boolean = false;
    let loading: boolean = false;
    let savedJokes: string[] = [];
    let isHandlingClick: boolean = false;

    async function handleClick() {
        // Prevents the function from being called multiple times when pressing enter
        if (isHandlingClick) return;
        isHandlingClick = true;
        loading = true;

        const response = await fetch("/api/norris");
        const result = (await response.json()) as ChuckNorrisJoke;
        data = result;

        // Add the new joke to the beginning of the list
        savedJokes = [data.value, ...savedJokes];

        loading = false;
        firstLoad = true;
        isHandlingClick = false;
    }
</script>

<svelte:window 
    on:keypress={(e) => {
        if (e.key === "Enter" && !loading) handleClick();
    }}
/>

<div class="w-full h-[8%] flex items-center justify-center space-x-8">
    <button class:isHandlingClick class="px-2 py-1 mt-1 border transition duration-300 hover:scale-110 active:scale-105 loading:scale-100 loading:text-gray-400 loading:border-gray-400"
        on:click={handleClick}>
        Get a Fact
    </button>
</div>

<div class="px-2 py-1 h-[92%] space-y-2">
    {#each savedJokes as joke (joke)}
        <div class="flex items-center border-2 rounded-lg border-gray-600 p-2 shadow"
            animate:flip={{ duration: 200 }}
            in:fly={{ y: -50, duration: 300 }}>
            <img alt="Chuck Norris icon" 
                src="{data?.icon_url || ''}" 
                class="w-[35px] h-[35px] mr-2 rounded-full">
            <p>{joke}<span class="text-gray-400"></span></p>
        </div>
    {/each}
</div>

<style lang="postcss">
    .isHandlingClick {
        @apply scale-95 border-gray-400 text-gray-400
    }    
</style>
