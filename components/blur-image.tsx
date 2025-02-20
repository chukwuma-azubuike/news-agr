'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

import { cn } from '@/lib/utils';

export const BlurImage: React.FC<ImageProps> = ({ height, width, src, className, alt, ...rest }) => {
    const [isLoading, setLoading] = useState(true);
    return (
        <Image
            src={src}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoading(false)}
            alt={alt ? alt : 'Background of a beautiful view'}
            blurDataURL={typeof src === 'string' ? src : undefined}
            className={cn('transition duration-300', isLoading ? 'blur-sm' : 'blur-0', className)}
            {...rest}
        />
    );
};
