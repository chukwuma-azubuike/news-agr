import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={cn('flex flex-col space-y-4 w-full', className)}>
            <Skeleton className="h-64 w-full md:h-[20rem] rounded-3xl" />
            <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-9/12" />
            </div>
        </div>
    );
};

export default SkeletonCard;
