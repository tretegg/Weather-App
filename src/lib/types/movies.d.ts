// Type for a movie search result (short response)
export interface OMDBSearchResult {
    Title: string;
    Year: string;
    imdbID: string;
    Type: 'movie' | 'series' | 'episode';
    Poster: string;
}

// Type for the search response object
export interface OMDBSearchResponse {
    Search: OMDBSearchResult[];
    totalResults: string;
    Response: 'True' | 'False';
    Error?: string; // Included when Response is 'False'
}

// Type for detailed movie/series information
export interface OMDBMovieDetail {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: { Source: string; Value: string }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: 'movie' | 'series' | 'episode';
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response: 'True' | 'False';
    Error?: string; // Included when Response is 'False'
}

// Type for ratings (source-specific ratings like IMDb, Rotten Tomatoes, etc.)
export interface OMDBRating {
    Source: string;
    Value: string;
}
