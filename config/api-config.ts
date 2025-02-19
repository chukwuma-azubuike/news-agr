import { SOURCES } from '@/types';

const apiConfig: Record<SOURCES, { baseUrl: string; apiKey: string }> = {
    [SOURCES.newsAPI]: {
        baseUrl: process.env.NEXT_PUBLIC_NEWS_API_BASE_URL as string,
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY as string,
    },
    [SOURCES.nyTimes]: {
        baseUrl: process.env.NEXT_PUBLIC_NY_TIMES_BASE_URL as string,
        apiKey: process.env.NEXT_PUBLIC_NY_TIMES_API_KEY as string,
    },
    [SOURCES.guardian]: {
        baseUrl: process.env.NEXT_PUBLIC_GUARDIAN_BASE_URL as string,
        apiKey: process.env.NEXT_PUBLIC_GUARDIAN_API_KEY as string,
    },
};

export default apiConfig;
