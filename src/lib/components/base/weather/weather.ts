import { env } from "$env/dynamic/private";
import type CurrentWeather from "$lib/types/weather";

const apiKey = env.WEATHER_API_KEY



// Function to fetch weather data
export async function getWeather(city: string, fetch: any) {
    let apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    console.log(apiURL);
    try {
        const response = await fetch(apiURL);
        const data = (await response.json()) as CurrentWeather;

        if (!response.ok) {
            console.error("API Error:", data)
            // Handle errors from the API
            return
        }

        return data

        
    } catch (error) {
        // Handle network or fetch errors
        console.log("Netork Error:", error)
    }
}

export async function getHourlyWeather(form: HTMLFormElement, forecastDisplay: HTMLParagraphElement) {
    let city = form["city"].value;
    let apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no`;
    console.log(apiURL);
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (response.ok) {
            // Extract weather information
            const temperature: number[] = [];
            for (let i = 0; i < 5; i++) {
                temperature.push(data.forecast.forecastday[0].hour[i].temp_c);
            }
            const temperatureString = temperature[0] + '°C, ' + temperature[1] + '°C, ' + 
            temperature[2] + '°C, ' + temperature[3] + '°C, ' + temperature[4] + '°C';

            forecastDisplay.innerHTML = `
            5 Hour Forecast: ${temperatureString}`;
            
       
        } else {
            // Handle errors from the API
            forecastDisplay.innerHTML = `Error: ${data.message}`;
        }
    } catch (error) {
        // Handle network or fetch errors
        forecastDisplay.innerHTML = `Error: Could not retrieve weather data.`;
    }
}
