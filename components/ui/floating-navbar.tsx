'use client';

import React, { ReactNode, useState } from 'react';

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

import { cn } from '@/lib/utils';

interface FloatingNavProps {
    children: ReactNode;
    className?: string;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ children, className }) => {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, 'change', current => {
        // Check if current is not undefined and is a number
        if (typeof current === 'number') {
            const direction = current! - scrollYProgress.getPrevious()!;

            if (direction < 0) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.3,
                }}
                className={cn(
                    'flex md:max-w-screen-lg fixed top-14 inset-x-0 px-4 md:px-0 mx-auto dark:border-white/[0.2] rounded-full dark:bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-40 items-center justify-center',
                    className
                )}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};
