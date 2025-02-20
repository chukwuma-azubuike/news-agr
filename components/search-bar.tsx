'use client';

import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import DateRangePicker from './date-range-picker';
import { Input } from './ui/input';
import { SearchContext } from '@/context/search';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
    const [keyword, setKeyword] = useState<string>();
    const { handleKeyword, handleSearchMode } = useContext(SearchContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!keyword) {
            handleSearchMode(false);
        }
        handleKeyword(keyword);
        handleSearchMode(true);
    };

    return (
        <div className="relative mx-auto w-full">
            <form onSubmit={handleSubmit}>
                <Input placeholder="Search..." onChange={handleChange} />
                <DateRangePicker className="absolute top-2 right-14" />
                <Button className="absolute top-2 right-2" size="lg" type="submit">
                    <Search className="text-primary-foreground" />
                </Button>
            </form>
        </div>
    );
};

export default SearchBar;
