export interface INewApiPayload {
    q: string;
    apiKey: string;
    from?: string;
    to?: string;
    sources?: string; // Use the /sources endpoint to locate these programmatically or look at the sources index.
}

export interface INewsApiResponse {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
