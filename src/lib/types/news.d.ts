type Source = {
    id: string | null;
    name: string;
};

type Article = {
    source: Source;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string; // ISO 8601 format
    content: string | null;
};

type NewsApiResponse = {
    status: 'ok' | 'error';
    totalResults: number;
    articles: Article[];
    message?: string; // Used when status is 'error' for error details
};