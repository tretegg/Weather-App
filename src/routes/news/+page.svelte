<script lang='ts'>
    import { onMount } from "svelte";

    let news : TheNewsAPIResponse;

    let articles: TheNewsAPIArticle[] = [];

    async function getNews() {
        news = await (await fetch("/api/news")).json()
        console.log(news)
        articles = news.data.splice(0, 3) // Limit to 3
    }

    onMount(async () => {
        await getNews();
    });
</script>

<div class="news overflow-auto h-[100%] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-800">
    {#each articles as article}
        <div class="article flex flex-col items-center justify-center text-center">
            <!-- Title -->
            <a href={article.url} 
               class="hover:underline font-bold text-xl mb-1 mt-1">{article.title}</a>
            
            <!-- Description -->
            <p class="mb-2 max-w-lg text-lg">{article.description}</p>
            
            <!-- Image -->
            {#if article.image_url}
                <a href={article.url} class="w-[50%] h-[50%] block">
                    <img src={article.image_url} alt="News thumbnail" 
                         class="rounded-lg h-full w-full mb-2 
                         transition-all duration-300 hover:scale-105
                         shadow-lg hover:[box-shadow:0_0_20px_0px_rgba(255,255,255,0.5)]">
                    </a>
            {/if}
        </div>
    {/each}
    
</div>