import axios from 'axios';

import apiConfig from '@/config/api-config';
import { IDefaultNewsResponse, INewsQueryMapper, INewsQueryParams, INormalisedNewsArticle, SOURCES } from '@/types';
import { normaliseNewsResponse, queryMapper } from '@/utils';
import shuffleArray from '@/utils/suffle-array';

/**
 * Fetches news articles from multiple sources, normalizes the responses, and returns a shuffled array of articles.
 *
 * @param queryParams - The query parameters for filtering news results.
 * @param sources - An optional list of sources to fetch news from. If not provided, all available sources are used.
 * @returns A promise that resolves to an array of normalized news articles.
 */
const fetchNews = async (
    queryParams: INewsQueryParams,
    sources?: [SOURCES, INewsQueryMapper][]
): Promise<Array<INormalisedNewsArticle>> => {
    // If sources are not provided, use all sources from the queryMapper
    const aggregatedSources = sources ?? (Object.entries(queryMapper) as Array<[SOURCES, INewsQueryMapper]>);

    // Create an array of asynchronous requests to fetch news from different sources
    const requests = aggregatedSources.map(async ([source, mapper]) => {
        try {
            const response = await axios.get(apiConfig[source].baseUrl, { params: mapper(queryParams) });
            return { source, data: response.data }; // Return source and fetched data
        } catch (error) {
            // Throw an error if fetching from this source fails
            throw new Error(`Failed to fetch news from ${source}: ${error.response?.data?.message || error.message}`);
        }
    });

    // Wait for all API requests to complete, allowing both success and failure cases to be handled
    const responses = await Promise.allSettled<{ source: SOURCES; data: IDefaultNewsResponse }>(requests);

    // Extract successful responses and normalize them
    const successfulResults = responses
        .filter(res => res.status === 'fulfilled') // Filter only fulfilled requests
        .flatMap(res => normaliseNewsResponse(res.value.source, res.value.data)); // Normalize the data

    // If all sources fail, extract error messages and throw a combined error
    if (successfulResults.length === 0) {
        const errors = responses
            .filter(res => res.status === 'rejected') // Filter only rejected requests
            .map(res => (res as PromiseRejectedResult).reason.message) // Extract error messages
            .join('; '); // Combine error messages into a single string

        throw new Error(errors); // Throw the aggregated error messages
    }

    // Return the fetched news articles in a shuffled order to diversify content display
    return shuffleArray<INormalisedNewsArticle>(successfulResults);
};

export default fetchNews;
