const apiKey = 'e731687e132c408da2e162923242309';

let city = document.forms["weatherForm"]["city"].value;

// WeatherAPI URL with latitude and longitude
let apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

// Function to fetch weather data
export async function getWeather() {
    let city = document.forms["weatherForm"]["city"].value;
    let apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (response.ok) {
            // Extract weather information
            const temperature = data.current.temp_c;  // Celsius temperature
            const description = data.current.condition.text; // Weather description
            const humidity = data.current.humidity; // Humidity

            // Display the weather data
            document.getElementById('weatherDisplay').textContent =
                `Temperature: ${temperature}°C, ${description}, Humidity: ${humidity}%`;
        } else {
            // Handle errors from the API
            document.getElementById('weatherDisplay').textContent = `Error: ${data.error.message}`;
        }
    } catch (error) {
        // Handle network or fetch errors
        document.getElementById('weatherDisplay').textContent = `Error: Could not retrieve weather data.`;
    }
}

// Fetch the weather on page load
getWeather();