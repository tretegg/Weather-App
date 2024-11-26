import { NASA_KEY } from "$env/static/private";
import type { NasaApodResponse } from "$lib/types/nasa";

let storage: NasaApodResponse
const DEBOUNCE = (1000 * 60 * 30) // 30 minutes
let lastRequest = 0

console.log("Nasa.ts reloaded")

export async function getNasaData(fetch: any): Promise<NasaApodResponse | undefined> {
    if (Date.now() - lastRequest < DEBOUNCE) {
        return storage
    }

    let apiURL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json() as NasaApodResponse;
        
        lastRequest = Date.now()
        storage = data

        return data;
    } catch (error) {
        console.error(error);
        return; // or some other default value
    }
}
