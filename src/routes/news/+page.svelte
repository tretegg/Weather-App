<script lang='ts'>
    import { onMount } from "svelte";
    import { getRecentNews } from '$lib/components/base/news';

    let form: HTMLFormElement;
    let loading: boolean;
    let display: HTMLDivElement

    async function handleClick () {
            
            loading = true;
            let q = form["news"].value;
            let news = await getRecentNews(q) as NewsApiResponse;
            let article = news.articles[0] as Article;

            let title = document.getElementById("title") as HTMLAnchorElement;
            let description = document.getElementById("description") as HTMLParagraphElement;
            let image = document.getElementById("newsImage") as HTMLImageElement;
            title.innerText = article.title;
            title.href = article.url;
            description.innerText = article.description;
            image.src = article.urlToImage as string;
            loading = false;        
    }

</script>




<nav class="navbar">
    <ul class="nav-links">
        <li><a href="../">Home</a></li>
        <li><a href="./">News</a></li>
    </ul>
</nav>


<form bind:this={form} name="newsForm" class="flex">
    <label class="pr-2" for="news">Search for news:</label><br>
    <input class="text-black px-1 !outline-none" type="text" id="news" name="news" placeholder="e.g Stocks"><br>
</form> 

<button disabled={loading} class:loading={loading} class="px-2 py-1 
border border-white transitions duration-300 hover:scale-110 
active:scale-105" on:click={handleClick}>Search</button>

<div bind:this={display} class="news">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <a id="title" class="underline"></a>
    <p id="description"></p>
    <!-- svelte-ignore a11y_missing_attribute -->
    <img id=newsImage>
</div>

<style>
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