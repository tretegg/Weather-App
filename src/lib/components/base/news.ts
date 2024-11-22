import { NEWS_KEY } from "$env/static/private";

let storage: TheNewsAPIResponse
const DEBOUNCE = (1000 * 60 * 60) * 2 // 2hrs
let lastRequest = 0

// Function to fetch weather data
export async function getRecentNews(fetch : any): Promise<TheNewsAPIResponse | undefined> {
    let apiURL = `https://api.thenewsapi.com/v1/news/top?api_token=${NEWS_KEY}&limit=3&locale=us,ca`;
    
    if (Date.now() - lastRequest < DEBOUNCE) {
        return storage
    }

    try {
        const response = await fetch(apiURL);
        storage = (await response.json()) as TheNewsAPIResponse;

        if (!response.ok) {
            console.error("API Error:", storage)
            // Handle errors from the API
            return
        }

        lastRequest = Date.now()
        
        return storage;

        
    } catch (error) {
        // Handle network or fetch errors
        console.log("Network Error:", error)
    }
}
