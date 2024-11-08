export interface NasaApodResponse {
    date: string; // The date the APOD was published (format: YYYY-MM-DD)
    explanation: string; // A detailed explanation or description of the image or video
    hdurl?: string; // The URL for the high-definition version of the image (optional, may not always be provided)
    media_type: 'image' | 'video'; // Indicates whether the media is an image or a video
    service_version: string; // The version of the API used
    title: string; // The title of the APOD
    url: string; // The URL for the standard version of the image or video
    copyright?: string; // The name of the copyright holder, if applicable (optional)
}