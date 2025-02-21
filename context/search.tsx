import { createContext, ReactNode, useState, useMemo } from 'react';
import { SOURCES } from '@/types';
import { IAppContext } from './types';
import { addHours, format } from 'date-fns';

export const SearchContext = createContext<IAppContext | null>(null);

const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [date, setDate] = useState<string[]>([
        format(addHours(new Date(), -12), 'yyyy-MM-dd'),
        format(new Date(), 'yyyy-MM-dd'),
    ]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [category, setCategory] = useState('politics');
    const [keyword, setKeyword] = useState('trump');
    const [source, setSource] = useState<SOURCES | undefined>(undefined);
    const [searchMode, setSearchMode] = useState(false);

    // Memoizing the context value to prevent unnecessary re-renders
    const values = useMemo(
        () => ({
            page,
            pageSize,
            date,
            category,
            keyword,
            source,
            searchMode,
            handleDate: setDate,
            handleSource: setSource,
            handleKeyword: setKeyword,
            handleCategory: setCategory,
            handlePage: setPage,
            handleSearchMode: setSearchMode,
            handlePageSize: setPageSize,
        }),
        [page, pageSize, date, category, keyword, source, searchMode]
    );

    return <SearchContext.Provider value={values}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
