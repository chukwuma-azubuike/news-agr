'use client';

import React, { memo } from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SearchContext } from '@/context/search';

const DateRangePicker: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: addDays(new Date(), -30),
        to: new Date(),
    });

    const { handleDate } = React.useContext(SearchContext);

    const handleDateSelect = (date: DateRange) => {
        setDate(date);
        handleDate([format(date.from, 'yyyy-MM-dd'), format(date.to, 'yyyy-MM-dd')]);
    };

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'h-10 min-w-max px-4 justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon />
                        <div className="hidden md:block">
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                                    </>
                                ) : (
                                    format(date.from, 'LLL dd, y')
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        numberOfMonths={2}
                        onSelect={handleDateSelect}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default memo(DateRangePicker);
