import apiConfig from '@/config/api-config';
import { IDefaultNewsResponse, INewsQueryMapper, INewsQueryParams, INormalisedNewsArticle, SOURCES } from '@/types';
import { normaliseNewsResponse, queryMapper } from '@/utils';
import shuffleArray from '@/utils/suffle-array';
import axios from 'axios';

const fetchNews = async (
    queryParams: INewsQueryParams,
    sources?: [SOURCES, INewsQueryMapper][]
): Promise<Array<INormalisedNewsArticle>> => {
    const aggregatedSources = sources ?? (Object.entries(queryMapper) as Array<[SOURCES, INewsQueryMapper]>);

    const requests = aggregatedSources.map(async ([source, mapper]) => {
        try {
            const response = await axios.get(apiConfig[source].baseUrl, { params: mapper(queryParams) });
            return { source, data: response.data };
        } catch (error) {
            throw new Error(`Failed to fetch news from ${source}: ${error.response?.data?.message || error.message}`);
        }
    });

    const responses = await Promise.allSettled<{ source: SOURCES; data: IDefaultNewsResponse }>(requests);

    // Extract successful results
    const successfulResults = responses
        .filter(res => res.status === 'fulfilled')
        .flatMap(res => normaliseNewsResponse(res.value.source, res.value.data));

    if (successfulResults.length === 0) {
        // Extract errors from failed requests
        const errors = responses
            .filter(res => res.status === 'rejected')
            .map(res => (res as PromiseRejectedResult).reason.message)
            .join('; ');

        throw new Error(errors);
    }

    return shuffleArray<INormalisedNewsArticle>(successfulResults);
};

export default fetchNews;
