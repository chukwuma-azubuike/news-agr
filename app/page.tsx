'use client';

import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from '@/components/header';
import CategoryFilter from '@/components/category-filter';
import SourceFilter from '@/components/source-filter';
import TopStoriesCarousel from '@/components/top-stories';
import NewsSearchResults from '@/components/search-results';
import SearchProvider from '@/context/search';

const queryClient = new QueryClient();

const Home: React.FC = () => {
    return (
        <SearchProvider>
            <QueryClientProvider client={queryClient}>
                <main className="space-y-4 pb-8">
                    <Header />
                    <CategoryFilter />
                    <SourceFilter />
                    <section className="space-y-4 scrollbar-hide overflow-y-auto">
                        <TopStoriesCarousel />
                        <NewsSearchResults />
                    </section>
                </main>
            </QueryClientProvider>
        </SearchProvider>
    );
};

export default Home;
