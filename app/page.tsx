import Header from '@/components/header';
import CategoryFilter from '@/components/category-filter';
import SourceFilter from '@/components/source-filter';

const Home: React.FC = () => {
    return (
        <main className="space-y-6">
            <Header />
            <CategoryFilter />
            <SourceFilter />
        </main>
    );
};

export default Home;
