export default interface CurrentWeather {
    last_updated: string;
    last_updated_epoch: number;
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    is_day: 0 | 1;
    uv: number;
    gust_mph: number;
    gust_kph: number;
}

export interface Forecast {
    forecastday: ForecastDay[];
}

export interface ForecastDay {
    date: string;
    date_epoch: number;
    day: Day;
    astro: Astro;
    air_quality: any; // Note: air_quality element is not well-defined in the spec
    hour: Hour[];
}

export interface Day {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    uv: number;
    daily_will_it_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
}

export interface Astro {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
    is_moon_up: number;
    is_sun_up: number;
}

export interface Hour {
    time_epoch: number;
    time: string;
    temp_c: number;
    temp_f: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    snow_cm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: number;
    will_it_snow: number;
    is_day: number;
    vis_km: number;
    vis_miles: number;
    chance_of_rain: number;
    chance_of_snow: number;
    gust_mph: number;
    gust_kph: number;
    uv: number;
    short_rad: number;
    diff_rad: number;
}

export interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

export interface Condition {
    text: string;
    icon: string;
    code: number;
}

export interface WeatherApiError {
    error: {
        code: number,
        message: string
    }
}

// export interface CurrentWeather {
//     last_updated_epoch: number;
//     last_updated: string;
//     temp_c: number;
//     temp_f: number;
//     is_day: number;
//     condition: Condition;
//     wind_mph: number;
//     wind_kph: number;
//     wind_degree: number;
//     wind_dir: string;
//     pressure_mb: number;
//     pressure_in: number;
//     precip_mm: number;
//     precip_in: number;
//     humidity: number;
//     cloud: number;
//     feelslike_c: number;
//     feelslike_f: number;
//     windchill_c: number;
//     windchill_f: number;
//     heatindex_c: number;
//     heatindex_f: number;
//     dewpoint_c: number;
//     dewpoint_f: number;
//     vis_km: number;
//     vis_miles: number;
//     uv: number;
//     gust_mph: number;
//     gust_kph: number;
// }

export interface WeatherAPIResponse {
    location: Location;
    current: CurrentWeather;
}