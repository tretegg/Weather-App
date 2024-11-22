import { getRecentNews } from "$lib/components/base/news.js";
import { json, error } from "@sveltejs/kit";

export async function GET({ request, fetch }) {

    const news = await getRecentNews(fetch)

    return json(news)
}