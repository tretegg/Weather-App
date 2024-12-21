import { getHourlyForecast } from "$lib/components/base/weather/weather";
import { json, error } from "@sveltejs/kit";

export async function GET({ request, fetch }) {

    const city = request.headers.get("X-city")

    if (!city) {
        return error(400, { 
            message: "No city provided."
        })
    }

    const weather = await getHourlyForecast(city, fetch)

    return json(weather)
}