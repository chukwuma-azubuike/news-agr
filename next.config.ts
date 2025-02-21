import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_NEWS_API_BASE_URL: process.env.NEXT_PUBLIC_NEWS_API_BASE_URL,
        NEXT_PUBLIC_NEWS_API_KEY: process.env.NEXT_PUBLIC_NEWS_API_KEY,
        NEXT_PUBLIC_GUARDIAN_API_KEY: process.env.NEXT_PUBLIC_GUARDIAN_API_KEY,
        NEXT_PUBLIC_GUARDIAN_BASE_URL: process.env.NEXT_PUBLIC_GUARDIAN_BASE_URL,
        NEXT_PUBLIC_NY_TIMES_API_KEY: process.env.NEXT_PUBLIC_NY_TIMES_API_KEY,
        NEXT_PUBLIC_NY_TIMES_BASE_URL: process.env.NEXT_PUBLIC_NY_TIMES_BASE_URL,
    },
};

export default nextConfig;
