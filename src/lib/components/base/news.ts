const apiKey = '19b2cfae55ba4defa57d90d55479fc2a';



// Function to fetch weather data
export async function getRecentNews(q: string) {
    let apiURL = `https://newsapi.org/v2/everything?q=${q}&language=en&from=2024-10-13&sortBy=publishedAt&apiKey=${apiKey}`;
    console.log(apiURL);
    try {
        const response = await fetch(apiURL);
        const data = (await response.json()) as NewsApiResponse;
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
        console.log("Netork Error:", error)
    }
}
