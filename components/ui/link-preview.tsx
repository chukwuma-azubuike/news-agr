'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { AnimatePresence, motion, useSpring } from 'framer-motion';
import { encode } from 'qss';
import Link from 'next/link';

import { cn } from '@/lib/utils';

type LinkPreviewProps = {
    children: React.ReactNode;
    url: string;
    className?: string;
    width?: number;
    height?: number;
    quality?: number;
    isStatic?: boolean;
    imageSrc?: string;
};

type IPreviewImageProps = {
    src: string;
    width: number;
    height: number;
    quality: number;
};

const PreviewImage: React.FC<IPreviewImageProps> = ({ src, width, height, quality }) => (
    <Image
        src={src}
        width={width}
        height={height}
        quality={quality}
        priority
        className="rounded-lg"
        alt="preview image"
    />
);

export const LinkPreview = ({
    children,
    url,
    className,
    width = 200,
    height = 125,
    quality = 50,
    isStatic = false,
    imageSrc = '',
}: LinkPreviewProps) => {
    const getImageSrc = () => {
        if (isStatic) return imageSrc;
        return `https://api.microlink.io/?${encode({
            url,
            screenshot: true,
            meta: false,
            embed: 'screenshot.url',
            colorScheme: 'dark',
            'viewport.isMobile': true,
            'viewport.deviceScaleFactor': 1,
            'viewport.width': width * 3,
            'viewport.height': height * 3,
        })}`;
    };

    const src = getImageSrc();
    const [isOpen, setOpen] = useState(false);
    const translateX = useSpring(0, { stiffness: 100, damping: 15 });

    const handleMouseMove = useCallback(
        (event: React.MouseEvent<HTMLAnchorElement>) => {
            const target = event.currentTarget.getBoundingClientRect();
            const eventOffsetX = event.clientX - target.left;
            const offsetFromCenter = (eventOffsetX - target.width / 2) / 2;
            translateX.set(offsetFromCenter);
        },
        [translateX]
    );

    return (
        <>
            <div className="hidden">
                <PreviewImage src={src} width={width} height={height} quality={quality} />
            </div>

            <HoverCardPrimitive.Root openDelay={50} closeDelay={100} onOpenChange={setOpen}>
                <HoverCardPrimitive.Trigger
                    onMouseMove={handleMouseMove}
                    className={cn('text-black dark:text-white', className)}
                    href={url}
                    target="_blank"
                >
                    {children}
                </HoverCardPrimitive.Trigger>

                <HoverCardPrimitive.Content
                    className="[transform-origin:var(--radix-hover-card-content-transform-origin)] z-20"
                    side="top"
                    align="center"
                    sideOffset={10}
                >
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: { type: 'spring', stiffness: 260, damping: 20 },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                className="shadow-xl rounded-xl"
                                style={{ x: translateX }}
                            >
                                <Link
                                    href={url}
                                    className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                                >
                                    <PreviewImage src={src} width={width} height={height} quality={quality} />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
        </>
    );
};
