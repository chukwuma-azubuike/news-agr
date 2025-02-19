import * as React from 'react';

import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Button } from './button';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className="relative max-w-screen-xl">
                <input
                    type={type}
                    className={cn(
                        'flex h-14 w-full rounded-full border border-input bg-primary-foreground pr-3 pl-6 py-1 text-lg shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <Button className="absolute top-2 right-2" size="lg">
                    <Search className="text-primary-foreground" />
                </Button>
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
