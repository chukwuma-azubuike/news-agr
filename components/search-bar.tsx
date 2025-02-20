import DateRangePicker from './date-range-picker';
import { Input } from './ui/input';

const SearchBar: React.FC = () => {
    return (
        <div className="relative mx-auto w-full">
            <Input placeholder="Search..." />
            <DateRangePicker className="absolute top-2 right-14" />
        </div>
    );
};

export default SearchBar;
