import { createContext, ReactNode, useState } from 'react';
import { SOURCES } from '@/types';
import { IAppContext } from './types';
import { addDays, format } from 'date-fns';

export const SearchContext = createContext<IAppContext>({} as IAppContext);

const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [date, setDate] = useState<Array<string>>([
        format(addDays(new Date(), -30), 'yyyy-MM-dd'),
        format(new Date(), 'yyyy-MM-dd'),
    ]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(20);
    const [category, setCategory] = useState<string>('politics');
    const [keyword, setKeyword] = useState<string>('trump');
    const [source, setSource] = useState<SOURCES | undefined>();

    const [searchMode, setSearchMode] = useState<boolean>(false);

    const handleSearchMode = (value: boolean) => {
        setSearchMode(value);
    };

    const handlePageSize = (value: number) => {
        setPageSize(value);
    };

    const handlePage = (value: number) => {
        setPage(value);
    };

    const handleDate = (value: Array<string>) => {
        setDate(value);
    };

    const handleCategory = (value: string) => {
        setCategory(value);
    };

    const handleKeyword = (value: string) => {
        setKeyword(value);
    };

    const handleSource = (value: SOURCES) => {
        setSource(value);
    };

    const values = {
        page,
        pageSize,
        date,
        category,
        keyword,
        source,
        searchMode,
        handleDate,
        handleSource,
        handleKeyword,
        handleCategory,
        handlePage,
        handleSearchMode,
        handlePageSize,
    };

    return <SearchContext.Provider value={values}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
