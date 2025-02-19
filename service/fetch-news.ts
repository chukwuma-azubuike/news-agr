import apiConfig from '@/config/api-config';
import { IDefaultNewsResponse, INewsQueryMapper, INewsQueryParams, INormalisedNewsArticle, SOURCES } from '@/types';
import { normaliseNewsResponse, queryMapper } from '@/utils';
import axios from 'axios';

const fetchNews = async (queryParams: INewsQueryParams): Promise<Array<INormalisedNewsArticle[]>> => {
    // Convert query map to iterable array
    const sources = Object.entries(queryMapper) as Array<[SOURCES, INewsQueryMapper]>;

    // Initialise request for each news source
    const requests = sources.map(async ([source, mapper]) => {
        const response = await axios.get(apiConfig[source].baseUrl, { params: mapper(queryParams) });

        return {
            source,
            data: response.data,
        };
    });

    try {
        const responses = await Promise.allSettled<{ source: SOURCES; data: IDefaultNewsResponse }>(requests);

        // Return only successful calls
        return responses
            .filter(res => res.status === 'fulfilled')
            .map(res => normaliseNewsResponse(res.value.source, res.value.data));
    } catch (error) {
        console.error('Error fetching news', error);
        return [];
    }
};

export default fetchNews;
