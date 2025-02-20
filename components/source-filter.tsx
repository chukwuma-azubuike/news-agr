'use client';

import React, { useContext } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SOURCES } from '@/types';
import Image from 'next/image';
import { SearchContext } from '@/context/search';

const sources = [
    {
        name: SOURCES.newsAPI,
        icon: <Image height={100} width={100} src="/images/news-api-logo.png" alt="new-api-logo" className="w-16" />,
    },
    {
        name: SOURCES.guardian,
        icon: <Image height={100} width={100} src="/images/the-guardian-logo.png" alt="guardian-logo" />,
    },
    {
        name: SOURCES.nyTimes,
        icon: <Image height={100} width={100} src="/images/ny-times-logo.png" alt="ny-times-logo" />,
    },
];

const SourceFilter: React.FC = () => {
    const { handleSource, handleSearchMode } = useContext(SearchContext);

    const handleCategory = (value: SOURCES) => {
        if (!value) {
            handleSearchMode(false);
        }
        handleSource(value);
        handleSearchMode(true);
    };

    return (
        <div className="max-w-screen-lg w-full overflow-x-auto  scrollbar-hide mx-auto">
            <ToggleGroup type="single" className="space-x-2 justify-center" onValueChange={handleCategory}>
                {sources.map(({ name, icon }, index) => (
                    <ToggleGroupItem
                        value={name}
                        aria-label={name}
                        key={`category-${index}`}
                        className="flex items-center gap-2 py-5 px-4"
                    >
                        <div className="">{icon}</div>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    );
};

export default SourceFilter;
