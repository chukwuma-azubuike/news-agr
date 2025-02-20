'use client';

import React, { useContext } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ChartAreaIcon, GlobeIcon, LaptopIcon, LucideGamepad2, Scale, Volleyball, Wind } from 'lucide-react';
import { SearchContext } from '@/context/search';

const categories = [
    {
        name: 'Politics',
        icon: <Scale />,
    },
    {
        name: 'Global',
        icon: <GlobeIcon />,
    },
    {
        name: 'Business',
        icon: <ChartAreaIcon />,
    },
    {
        name: 'Sports',
        icon: <Volleyball />,
    },
    {
        name: 'Entertainment',
        icon: <LucideGamepad2 />,
    },
    {
        name: 'Technology',
        icon: <LaptopIcon />,
    },
    {
        name: 'Weather',
        icon: <Wind />,
    },
];

const CategoryFilter: React.FC = () => {
    const { handleCategory, handleSearchMode } = useContext(SearchContext);

    const handleCategoryChange = (value: string) => {
        if (!value) {
            handleSearchMode(false);
        }
        handleCategory(value);
        handleSearchMode(true);
    };

    return (
        <div className="max-w-screen-lg mx-auto overflow-x-auto scrollbar-hide">
            <ToggleGroup type="single" className="space-x-2 justify-center" onValueChange={handleCategoryChange}>
                {categories.map(({ name, icon }, index) => (
                    <ToggleGroupItem key={`category-${index}`} value={name.toLowerCase()} aria-label={name}>
                        <div className="bg-gray-100 p-1 rounded-full text-foreground">{icon}</div>
                        {name}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    );
};

export default CategoryFilter;
