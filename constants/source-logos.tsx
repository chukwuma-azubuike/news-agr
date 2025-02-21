import { SOURCES } from '@/types';
import Image from 'next/image';

export const sourceLogos = {
    [SOURCES.newsAPI]: (
        <Image height={70} width={70} src="/images/news-api-logo.png" alt="new-api-logo" className="w-[12rem]" />
    ),
    [SOURCES.guardian]: <Image height={100} width={100} src="/images/the-guardian-logo.png" alt="guardian-logo" />,
    [SOURCES.nyTimes]: <Image height={100} width={100} src="/images/ny-times-logo.png" alt="ny-times-logo" />,
};

export const sourceLogosContrast = {
    [SOURCES.newsAPI]: (
        <Image height={70} width={70} src="/images/news-api-logo.png" alt="new-api-logo" className="w-[12rem]" />
    ),
    [SOURCES.guardian]: <Image height={100} width={100} src="/images/the-guardian-logo.png" alt="guardian-logo" />,
    [SOURCES.nyTimes]: <Image height={100} width={100} src="/images/ny-times-logo-white.png" alt="ny-times-logo" />,
};
