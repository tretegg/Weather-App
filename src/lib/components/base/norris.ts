
// Function to fetch norris
export async function getNorris(fetch: any): Promise<ChuckNorrisJoke | undefined> {

    const apiURL = `https://api.chucknorris.io/jokes/random`;

    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            const data = (await response.json()) as ChuckNorrisJoke;
            console.error("API Error:", data)

            return data
        }

        const data = (await response.json()) as ChuckNorrisJoke;

        return data

        
    } catch (error) {
        // Handle network or fetch errors
        console.error("Network Error");
    }
}