import { IQueryMapper, SOURCES } from '@/types';

const queryMapper: IQueryMapper = {
    [SOURCES.newsAPI]: query => ({
        q: query.keyword,
        from: query.fromDate,
        to: query.toDate,
        sources: query.sources?.join(','),
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_BASE_URL as string,
    }),

    [SOURCES.guardian]: query => ({
        q: query.keyword,
        'from-date': query.fromDate,
        'to-date': query.toDate,
        section: query.category,
        'api-key': process.env.NEXT_PUBLIC_GUARDIAN_API_KEY as string,
    }),

    [SOURCES.nyTimes]: query => ({
        q: query.keyword,
        begin_date: query.fromDate?.replace(/-/g, ''), // Convert to YYYYMMDD
        end_date: query.toDate?.replace(/-/g, ''), // Convert to YYYYMMDD
        fq: query.sources ? `source:(${query.sources.join(' OR ')})` : undefined,
        'api-key': process.env.NEXT_PUBLIC_NY_TIMES_API_KEY as string,
    }),
};

export default queryMapper;
