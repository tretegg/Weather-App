<script lang='ts'>
    import { onMount } from "svelte";

    let news : TheNewsAPIResponse;

    let articles: TheNewsAPIArticle[];

    async function getNews() {
        news = await (await fetch("/api/news")).json()

        articles = news.data.splice(0, 3) // Limit to 3
    }

    onMount(async () => {
        await getNews();
    });

    const monthMap = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    function getExtension(dayOfMonth: number) {
        if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
            return "st"
        } else if (dayOfMonth === 2 || dayOfMonth === 22) {
            return "nd"
        } else if (dayOfMonth === 3 || dayOfMonth === 23) {
            return "rd"
        } else {
            return "th"
        }
    }

    let date = new Date();

    $: readableDate = `${monthMap[date.getMonth()]} ${date.getDate()}${getExtension(date.getDate())}, ${date.getFullYear()}`
</script>

<div class="news overflow-auto h-[100%] scrollbar-thin scrollbar-track-transparent relative scrollbar-thumb-neutral-800 px-24">
    {#if !news}
    <div class="w-full h-full absolute flex items-center justify-center">
        <p class="font-mono loading-bar">Loading...</p>
    </div>
    {:else}
        <div class="w-full h-[10%] flex items-center border-b mb-4 px-2">
            <h1 class="h-fit font-bold text-2xl font-mono">Recent News Stories</h1>
            <p class="ml-auto font-mono font-semibold">as of {readableDate}</p>
        </div>

        <div class="flex flex-col items-center space-y-8">
            {#each articles as article}
                <div class="article flex items-center justify-center text-center">
                    <div class="w-[40%] h-full flex items-center justify-center">
                        {#if article.image_url}
                            <a href={article.url} class="w-[90%] h-[50%] block">
                                <img src={article.image_url} alt="News thumbnail" 
                                     class="rounded-lg h-full w-full mb-2 
                                     transition-all duration-300 hover:scale-105
                                     shadow-lg hover:[box-shadow:0_0_20px_0px_rgba(255,255,255,0.5)]">
                            </a>
                        {/if}
                    </div>

                    <div class="w-[60%] h-full flex items-center flex-col">
                        <!-- Title -->
                        <a href={article.url} 
                           class="hover:underline font-bold text-lg mb-1 mt-1">{article.title}</a>

                        <!-- Description -->
                        <p class="mb-2 max-w-lg text">{article.description}</p>
                    </div>

                    <!-- Image -->
                </div>
            {/each}
        </div>

        <div class="w-full h-[8%] font-mono flex items-center justify-center">
            <p>Powered By <a href="https://the-news-api.com/" class="hover:underline text-blue-400">The News Api</a></p>
        </div>
    {/if}
    
</div>

<style lang="postcss">
    .loading-bar::after {
        content: "";
        @apply animate-spin inline-block rounded-full border-4 bg-transparent ml-2 border-gray-600 border-t-white w-[15px] h-[15px] relative top-[3px]
    }
</style>