import { env } from "$env/dynamic/private";
import type { OMDBMovieDetail, OMDBSearchResponse, OMDBSearchResult } from "$lib/types/movies";

const apiKey = env.OMDB_KEY;

// Function to fetch weather data
export async function getMovieData(title: string, fetch: any): Promise<OMDBSearchResult | undefined> {
    // the api key has single quotes around it so i just get rid of them here

    const apiURL = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURI(title)}&`;
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            const data = (await response.json()) as OMDBMovieDetail;
            console.error("API Error:", data)

            return data
        }

        const data = (await response.json()) as OMDBMovieDetail;

        return data

        
    } catch (error) {
        // Handle network or fetch errors
        console.error("Network Error");
    }
}