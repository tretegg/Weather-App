import { getRecentNews } from "$lib/components/base/news.js";
import { json, error } from "@sveltejs/kit";

export async function GET({ request, fetch, setHeaders }) {

    setHeaders({
        'cache-control': '3600',
    })

    const news = await getRecentNews(fetch)

    return json(news)
}