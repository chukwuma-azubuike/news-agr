'use client';

import React, { useState } from 'react';

import Carousel from './ui/carousel';
import CarouselCard from './ui/carousel-card';
import { fetchNews } from '@/service';
import { useQuery } from '@tanstack/react-query';
import { INewsQueryParams } from '@/types';
import SkeletonCard from './skeleton-card';

const TopStoriesCarousel: React.FC = () => {
    const [query, setQuery] = useState<INewsQueryParams>({
        keyword: 'politics',
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

    const cards = news?.map((article, index) => <CarouselCard key={article.title} card={article} index={index} />);

    const skeletons = Array(6)
        .fill('')
        .map((_, index) => <SkeletonCard key={`skeleton-${index}`} />);

    return (
        <div className="h-full w-full">
            <h2 className="max-w-screen-lg text-xl md:text-4xl ml-4 lg:mx-auto font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Top Stories
            </h2>
            <div className="">
                <Carousel items={isLoading || isFetching ? skeletons : cards} />
            </div>
        </div>
    );
};

export default TopStoriesCarousel;
