'use client';

import React, { useContext, useMemo } from 'react';

import Carousel from './ui/carousel';
import CarouselCard from './ui/carousel-card';
import { fetchNews } from '@/service';
import { useQuery } from '@tanstack/react-query';
import { INewsQueryParams } from '@/types';
import SkeletonCard from './skeleton-card';
import { SearchContext } from '@/context/search';
import ErrorAlert from './error-alert';

const TopStoriesCarousel: React.FC = () => {
    const { date, page, pageSize, searchMode } = useContext(SearchContext);

    const [fromDate, toDate] = date || [];

    const query: INewsQueryParams | null =
        fromDate && toDate ? { page, pageSize, toDate, fromDate, keyword: 'latest' } : null;

    const queryKey = ['top-stories', query];

    const {
        data: news,
        error,
        isLoading,
    } = useQuery({
        queryKey,
        queryFn: () => (query ? fetchNews(query) : Promise.resolve([])),
        refetchOnWindowFocus: false,
        enabled: !!query,
    });

    const cards = useMemo(
        () => (news ?? []).map((article, index) => <CarouselCard key={article.title} card={article} index={index} />),
        [news]
    );

    const skeletons = useMemo(
        () =>
            Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} className="w-56 md:w-96" />
            )),
        []
    );

    if (searchMode) return null;

    return (
        <div className="h-full w-full">
            <h2 className="max-w-screen-lg text-xl md:text-4xl ml-4 lg:mx-auto font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Top Stories
            </h2>
            {error && (
                <div className="max-w-screen-lg px-4 md:mx-auto">
                    <ErrorAlert title={error?.name} description={error?.message} />
                </div>
            )}
            <div className="mt-4 overflow-x-auto scrollbar-hide">
                {isLoading ? (
                    <div className="flex px-4 md:px-0 gap-4 mt-4 w-[300vw]">{skeletons}</div>
                ) : news?.length ? (
                    <Carousel items={cards} />
                ) : (
                    <p className="text-center text-gray-500 mt-4">No top stories available.</p>
                )}
            </div>
        </div>
    );
};

export default TopStoriesCarousel;
