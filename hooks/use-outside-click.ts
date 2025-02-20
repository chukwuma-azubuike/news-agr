import { useEffect, useCallback } from 'react';

export const useOutsideClick = (
    ref: React.RefObject<HTMLElement>,
    callback: (event: MouseEvent | TouchEvent) => void
) => {
    const handleClickOutside = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            callback(event);
        },
        [callback, ref]
    );

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [handleClickOutside]);
};
