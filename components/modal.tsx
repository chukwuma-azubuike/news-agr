'use client';

import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { IconX } from '@tabler/icons-react';

import { useOutsideClick } from '@/hooks/use-outside-click';
import { CarouselContext } from './ui/carousel';
import { CardProps } from './ui/carousel-card';

const Modal: React.FC<CardProps> = ({ card, index, layout = false }) => {
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

    return (
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
    );
};

export default Modal;
