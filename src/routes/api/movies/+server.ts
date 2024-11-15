import { getMovieData } from "$lib/components/base/movies.js";
import { json, error } from "@sveltejs/kit";

export async function GET({ request, fetch }) {

    const title = request.headers.get("X-movie")

    if (!title) {
        return error(400, "Missing movie")
    }

    const movies = await getMovieData(title, fetch)

    return json(movies)
}