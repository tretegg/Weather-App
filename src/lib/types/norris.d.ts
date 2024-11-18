// Type for the joke response
interface ChuckNorrisJoke {
    icon_url: string;  // URL for the icon image
    id: string;        // Unique ID for the joke
    url: string;       // URL to the joke on the API
    value: string;     // The joke text itself
  }