'use client';

import { useQuery } from '@tanstack/react-query';
// import { data } from './article-carousel';
import CarouselCard from './ui/carousel-card';
import { fetchNews } from '@/service';
import { useState } from 'react';
import ErrorAlert from './error-alert';
import SkeletonCard from './skeleton-card';
import { INewsQueryParams } from '@/types';

const NewsSearchResults: React.FC = () => {
    const [query, setQuery] = useState<INewsQueryParams>({
        keyword: 'trump',
        fromDate: '2025-02-10',
        toDate: '2025-02-10',
    });

    const {
        data: news,
        error,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ['news', query],
        queryFn: () => fetchNews(query),
    });

    return (
        <div className="w-full space-y-8">
            <h2 className="max-w-screen-lg text-xl md:text-4xl ml-4 lg:mx-auto font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Search Results
            </h2>
            {error && (
                <div className="max-w-screen-lg px-4 md:mx-auto">
                    <ErrorAlert title={error?.name} description={error?.message} />
                </div>
            )}
            <div className="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-screen-lg md:mx-auto">
                {(isLoading || isFetching) &&
                    Array(6)
                        .fill('')
                        .map((_, index) => <SkeletonCard key={`skeleton-${index}`} />)}
                {news &&
                    news?.length > 0 &&
                    news.map((article, index) => (
                        <CarouselCard key={index} card={article} index={index} className="!w-full" />
                    ))}
            </div>
        </div>
    );
};

export default NewsSearchResults;
