import type { NasaApodResponse } from "$lib/types/nasa";

const api_key = 'o0HGa2FNDAY9pdIy4mCkWnrVi5RhpQuADxebgzw1';

export async function getNasaData() {
    let apiURL = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;
    console.log(apiURL);
    try {
        const response = await fetch(apiURL);
        const data = await response.json() as NasaApodResponse;
        return data;
    } catch (error) {
        console.log(error);
        return ''; // or some other default value
    }
}
