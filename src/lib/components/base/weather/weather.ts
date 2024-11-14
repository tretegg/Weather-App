import { env } from "$env/dynamic/private";
import type { ForecastDay, WeatherApiError, WeatherAPIResponse } from "$lib/types/weather";

const apiKey = env.WEATHER_API_KEY

// Function to fetch weather data
export async function getWeather(city: string, fetch: any): Promise<WeatherAPIResponse | WeatherApiError> {
    // the api key has single quotes around it so i just get rid of them here
    let key = apiKey.split("'")[1]

    const apiURL = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`;
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            const data = (await response.json()) as WeatherApiError;
            console.error("API Error:", data)

            return data
        }

        const data = (await response.json()) as WeatherAPIResponse;

        return data

        
    } catch (error) {
        // Handle network or fetch errors
        console.error("Network Error:", error)
        
        return {error: {
            code: 0,
            message: "Network Error"
        }}
    }
}

export async function getHourlyForecast(city: string, fetch: any): Promise<ForecastDay | undefined> {
    let key = apiKey.split("'")[1]



    let apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no`;
    
    try {
        const response = await fetch(apiURL);
        const data = await response.json() as ForecastDay;

        if (!response.ok) {            
            console.error("API Error:", data)
        }

        return data;
    } catch (error) {
        console.error("Netork Error:", error)
    }
}
