import Image from 'next/image';
import SearchBar from './search-bar';
import { FloatingNav } from './ui/floating-navbar';

const Header: React.FC = () => {
    return (
        <div className="w-full px-4 pt-6 pb-32 bg-[url(/images/city.webp)] bg-cover bg-center bg-no-repeat space-y-6 relative">
            <div className="w-full md:max-w-screen-lg mx-auto">
                <Image
                    src="/images/news-agr-logo.png"
                    height={100}
                    width={100}
                    alt="new-agr-logo"
                    className="top-4 left-4"
                />
            </div>
            <FloatingNav>
                <SearchBar />
            </FloatingNav>
        </div>
    );
};

export default Header;
