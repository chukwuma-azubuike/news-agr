'use client';

import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import { LinkPreview } from './link-preview';
import { motion } from 'framer-motion';

import { useOutsideClick } from '@/hooks/use-outside-click';
import { BlurImage } from '../blur-image';
import { cn } from '@/lib/utils';
import { CarouselContext } from './carousel';
import { INormalisedNewsArticle } from '@/types';
import { sourceLogosContrast } from '@/constants/source-logos';
import getRelativeTime from '@/utils/get-relative-time';
import { Dot } from 'lucide-react';

export interface CardProps {
    index: number;
    layout?: boolean;
    className?: string;
    card: INormalisedNewsArticle;
}

const CarouselCard: React.FC<CardProps> = ({ card, index, layout = false, className }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { onCardClose } = useContext(CarouselContext);

    const handleClose = useCallback(() => {
        setOpen(false);
        onCardClose(index);
    }, [setOpen, onCardClose, index]);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                handleClose();
            }
        }

        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open, handleClose]);

    useOutsideClick(containerRef, () => handleClose());

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <LinkPreview url={card.url} className="font-bold">
            <motion.button
                layoutId={layout ? `card-${card.title}` : undefined}
                onClick={handleOpen}
                className={cn(
                    'rounded-3xl bg-gray-100 dark:bg-neutral-900 h-64 w-56 md:h-[20rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10',
                    className
                )}
            >
                <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/80 to-black/10 z-30 pointer-events-none" />
                <div className="relative z-40 p-8">
                    <motion.div layoutId={layout ? `category-${card.source}` : undefined}>
                        {sourceLogosContrast[card.source]}
                    </motion.div>
                    <motion.p
                        layoutId={layout ? `title-${card.title}` : undefined}
                        className="text-white text-xl md:text-2xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2 overflow-hidden text-ellipsis break-words line-clamp-4 md:line-clamp-6"
                    >
                        {card.title}
                    </motion.p>
                </div>
                <motion.p
                    layoutId={layout ? `category-${card.source}` : undefined}
                    className="text-white text-xs md:text-sm font-medium font-sans text-left truncate absolute bottom-6 left-6 z-30 flex items-center"
                >
                    <Dot /> {getRelativeTime(card.publishedAt)}
                </motion.p>
                {card.image && (
                    <BlurImage src={card.image} alt={card.title} fill className="object-cover absolute z-10 inset-0" />
                )}
            </motion.button>
        </LinkPreview>
    );
};

export default CarouselCard;
