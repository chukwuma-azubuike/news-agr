import { IQueryMapper, SOURCES } from '@/types';

const queryMapper: IQueryMapper = {
    [SOURCES.newsAPI]: query => ({
        from: query.fromDate,
        to: query.toDate,
        sortBy: 'relevancy',
        pageSize: query.pageSize,
        page: query.page,
        q: query.keyword || '' + query.category || '',
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY as string,
    }),

    [SOURCES.guardian]: query => ({
        'from-date': query.fromDate,
        'to-date': query.toDate,
        'page-size': query.pageSize,
        page: query.page,
        'order-by': 'relevance',
        'api-key': process.env.NEXT_PUBLIC_GUARDIAN_API_KEY as string,
        q: `${query.keyword ?? ''}${query.category ? ' AND ' + query.category : ''}`,
    }),

    [SOURCES.nyTimes]: query => ({
        sort: 'relevance',
        page: query.page,
        page_size: query.pageSize,
        q: query.keyword || '' + query.category || '',
        begin_date: query.fromDate?.replace(/-/g, ''), // Convert to YYYYMMDD
        end_date: query.toDate?.replace(/-/g, ''), // Convert to YYYYMMDD
        'api-key': process.env.NEXT_PUBLIC_NY_TIMES_API_KEY as string,
    }),
};

export default queryMapper;
