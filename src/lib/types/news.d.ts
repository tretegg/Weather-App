// thenewsapi.d.ts
// TypeScript definition for TheNewsAPI response

interface TheNewsAPISource {
    id: string | null;
    name: string;
    url: string;
}

interface TheNewsAPIArticle {
    id: string; // Unique identifier for the article
    author: string | null;
    title: string;
    description: string | null;
    content: string | null;
    url: string;
    image_url: string | null;
    language: string; // e.g., "en"
    category: string;
    published_at: string; // ISO 8601 format, e.g., "2024-11-13T18:00:47Z"
    source: TheNewsAPISource;
}

interface TheNewsAPIResponse {
    status: string; // e.g., "ok" or "error"
    total_hits: number;
    page: number;
    total_pages: number;
    page_size: number;
    data: TheNewsAPIArticle[];
    next_page?: string; // Link to the next page if available
    error?: string; // Error message if status is 'error'
}
