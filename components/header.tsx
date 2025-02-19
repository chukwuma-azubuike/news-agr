import SearchBar from './search-bar';

const Header: React.FC = () => {
    return (
        <div className="w-full h-40 px-24 pt-12 pb-36 bg-[url(/images/city.webp)] bg-cover bg-center bg-no-repeat">
            <SearchBar />
        </div>
    );
};

export default Header;
