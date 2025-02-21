'use client';

import { useQuery } from '@tanstack/react-query';
import CarouselCard from './ui/carousel-card';
import { fetchNews } from '@/service';
import { useContext, useEffect, useMemo } from 'react';
import ErrorAlert from './error-alert';
import SkeletonCard from './skeleton-card';
import { INewsQueryParams } from '@/types';
import { queryMapper } from '@/utils';
import { SearchContext } from '@/context/search';

const NewsSearchResults: React.FC = () => {
    const { keyword, date, page, pageSize, source, category } = useContext(SearchContext);

    const query: INewsQueryParams = useMemo(
        () => ({
            page,
            keyword,
            pageSize,
            category,
            toDate: date[1],
            fromDate: date[0],
        }),
        [page, keyword, pageSize, category, date]
    );

    const {
        data: news,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ['search', query],
        queryFn: () => fetchNews(query, source ? [[source, queryMapper[source]]] : undefined),
        refetchOnWindowFocus: false,
    });

    // Trigger a refetch on source change
    useEffect(() => {
        refetch();
    }, [keyword, date, page, pageSize, source, category, refetch]);

    return (
        <div className="w-full space-y-8">
            <h2 className="max-w-screen-lg text-xl md:text-4xl ml-4 lg:mx-auto font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Search Results
            </h2>
            {error && !isLoading && !isFetching && (
                <div className="max-w-screen-lg px-4 md:mx-auto">
                    <ErrorAlert title={error?.name} description={error?.message} />
                </div>
            )}
            <div className="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-screen-lg md:mx-auto">
                {isLoading || isFetching ? (
                    Array(6)
                        .fill('')
                        .map((_, index) => <SkeletonCard key={`skeleton-${index}`} className="w-full" />)
                ) : news?.length ? (
                    news?.map((article, index) => (
                        <CarouselCard key={article.url} card={article} index={index} className="!w-full" />
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-4">No search results available.</p>
                )}
            </div>
        </div>
    );
};

export default NewsSearchResults;
