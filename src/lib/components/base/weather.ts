const apiKey = 'e731687e132c408da2e162923242309';

// Function to fetch weather data
export async function getWeather(form: HTMLFormElement, weatherDisplay: HTMLParagraphElement) {
    let city = form["city"].value;
    let apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    console.log(apiURL);
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (response.ok) {
            // Extract weather information
            const temperature = data.current.temp_c;  // Celsius temperature
            const description = data.current.condition.text; // Weather description
            const humidity = data.current.humidity; // Humidity

            // Display the weather data
            weatherDisplay.innerHTML =
                `Temperature: ${temperature}°C<br>  
                ${description}<br> 
                Humidity: ${humidity}%`;
        } else {
            // Handle errors from the API
            weatherDisplay.innerHTML = `Error: ${data.error.message}`;
        }
    } catch (error) {
        // Handle network or fetch errors
        weatherDisplay.innerHTML = `Error: Could not retrieve weather data.`;
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
