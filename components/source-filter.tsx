'use client';

import React, { useContext } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SOURCES } from '@/types';
import { SearchContext } from '@/context/search';
import { sourceLogos } from '@/constants/source-logos';

const sources = [
    {
        name: SOURCES.newsAPI,
        icon: sourceLogos[SOURCES.newsAPI],
    },
    {
        name: SOURCES.guardian,
        icon: sourceLogos[SOURCES.guardian],
    },
    {
        name: SOURCES.nyTimes,
        icon: sourceLogos[SOURCES.nyTimes],
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
