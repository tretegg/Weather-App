import { getWeather } from "$lib/components/base/weather/weather";
import { json, error } from "@sveltejs/kit";

export async function GET({ request, fetch }) {

    const city = request.headers.get("X-city")

    if (!city) {
        return error(400, "Missing city")
    }

    const weather = await getWeather(city, fetch)

    return json(weather)
}