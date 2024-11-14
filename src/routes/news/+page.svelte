<script lang='ts'>
    import { onMount } from "svelte";
    import { getRecentNews } from '$lib/components/base/news';

    let articles: TheNewsAPIArticle[] = [];

    async function getNews() {
        const news = await getRecentNews() as TheNewsAPIResponse;
        articles = news.data.slice(0, 3); // Get the top three articles
    }

    onMount(async () => {
        await getNews();
    });
</script>

<div class="news">
    {#each articles as article}
        <div class="article">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a href={article.url} class="underline">{article.title}</a>
            <p>{article.description}</p>
            <!-- svelte-ignore a11y_missing_attribute -->
            {#if article.image_url}
                <!-- svelte-ignore a11y_img_redundant_alt -->
                <img src={article.image_url} alt="News image">
            {/if}
        </div>
    {/each}
</div>