const apiKey = 'UdLkle7VEsux3qXcM4ws33IAMYvpFzror50V379J';



// Function to fetch weather data
export async function getRecentNews() {
    let apiURL = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&limit=3&locale=us,ca`;
    console.log(apiURL);
    try {
        const response = await fetch(apiURL);
        const data = (await response.json()) as TheNewsAPIResponse;
        console.log(data);
        console.log(apiURL);

        if (!response.ok) {
            console.error("API Error:", data)
            // Handle errors from the API
            return
        }

        return data;

        
    } catch (error) {
        // Handle network or fetch errors
        console.log("Network Error:", error)
    }
}
