import {
    IGuardianResponse,
    INewsApiResponse,
    INormalisedNewsArticle,
    IDefaultNewsResponse,
    INYTimesResponse,
    IQueryMapper,
    SOURCES,
} from '@/types';

const normaliseNewsResponse = (
    source: keyof IQueryMapper,
    data: IDefaultNewsResponse
): Array<INormalisedNewsArticle> => {
    switch (source) {
        case SOURCES.newsAPI:
            const newsAPIData = data as INewsApiResponse;

            return newsAPIData.articles.map(article => ({
                source,
                title: article.title,
                description: article.description,
                url: article.url,
                image: article.urlToImage,
                publishedAt: article.publishedAt,
            }));
        case SOURCES.nyTimes:
            const nyTimesAPIData = data as INYTimesResponse;

            return nyTimesAPIData.response.docs.map(article => ({
                source,
                title: article.headline.main,
                description: article.abstract,
                url: article.web_url,
                publishedAt: article.pub_date,
                image: article.multimedia.length > 0 ? `https://nytimes.com/${article.multimedia[0].url}` : null, // Construct image url with NY Times domain
            }));
        case SOURCES.guardian:
            const guardianAPIData = data as IGuardianResponse;

            return guardianAPIData.response.results.map(article => ({
                source,
                image: '',
                url: article.webUrl,
                title: article.webTitle,
                description: article.sectionName,
                publishedAt: article.webPublicationDate,
            }));
        default:
            return [];
    }
};

export default normaliseNewsResponse;
