'use client';

import { data } from './article-carousel';
import CarouselCard from './ui/carousel-card';

const NewsSearchResults: React.FC = () => {
    return (
        <div className="w-full space-y-8">
            <h2 className="max-w-screen-lg text-xl md:text-4xl ml-4 lg:mx-auto font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Search Results
            </h2>
            <div className="px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-screen-lg md:mx-auto">
                {data.map((card, index) => (
                    <CarouselCard key={card.src} card={card} index={index} className="!w-full" />
                ))}
            </div>
        </div>
    );
};

export default NewsSearchResults;
