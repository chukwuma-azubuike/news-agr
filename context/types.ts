import { SOURCES } from '@/types';

export interface IAppContext {
    page: number;
    pageSize: number;
    category: string;
    keyword: string;
    date: Array<string>;
    source: SOURCES;
    searchMode: boolean;
    handleSearchMode: (value: boolean) => void;
    handlePage: (value: number) => void;
    handleDate: (value: Array<string>) => void;
    handlePageSize: (value: number) => void;
    handleCategory: (value: string) => void;
    handleKeyword: (value: string) => void;
    handleSource: (value: SOURCES) => void;
}
