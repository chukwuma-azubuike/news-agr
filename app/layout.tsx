import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
    variable: '--font-dm-sans',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'News AGR',
    description: 'All your news in one place, just the way you like it',
};

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
    return (
        <html lang="en">
            <body className={`${dmSans.variable} antialiased`}>{children}</body>
        </html>
    );
};

export default RootLayout;
