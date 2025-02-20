'use client';

import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { IconX } from '@tabler/icons-react';

import { useOutsideClick } from '@/hooks/use-outside-click';
import { BlurImage } from '../blur-image';
import { cn } from '@/lib/utils';
import { CarouselContext } from './carousel';

interface Card {
    src: string;
    title: string;
    category: string;
    content: React.ReactNode;
}

export interface CardProps {
    card: Card;
    index: number;
    layout?: boolean;
    className?: string;
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
        <>
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 h-screen z-50 overflow-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            ref={containerRef}
                            layoutId={layout ? `card-${card.title}` : undefined}
                            className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit  z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
                        >
                            <button
                                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                                onClick={handleClose}
                            >
                                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
                            </button>
                            <motion.p
                                layoutId={layout ? `category-${card.title}` : undefined}
                                className="text-base font-medium text-black dark:text-white"
                            >
                                {card.category}
                            </motion.p>
                            <motion.p
                                layoutId={layout ? `title-${card.title}` : undefined}
                                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
                            >
                                {card.title}
                            </motion.p>
                            <div className="py-10">{card.content}</div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <motion.button
                layoutId={layout ? `card-${card.title}` : undefined}
                onClick={handleOpen}
                className={cn(
                    'rounded-3xl bg-gray-100 dark:bg-neutral-900 h-64 w-56 md:h-[20rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10',
                    className
                )}
            >
                <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
                <div className="relative z-40 p-8">
                    <motion.p
                        layoutId={layout ? `category-${card.category}` : undefined}
                        className="text-white text-sm md:text-base font-medium font-sans text-left"
                    >
                        {card.category}
                    </motion.p>
                    <motion.p
                        layoutId={layout ? `title-${card.title}` : undefined}
                        className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
                    >
                        {card.title}
                    </motion.p>
                </div>
                <BlurImage src={card.src} alt={card.title} fill className="object-cover absolute z-10 inset-0" />
            </motion.button>
        </>
    );
};

export default CarouselCard;
