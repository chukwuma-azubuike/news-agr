import Header from '@/components/header';
import CategoryFilter from '@/components/category-filter';
import SourceFilter from '@/components/source-filter';
import ArticleCardCarousel from '@/components/article-carousel';
import NewsSearchResults from '@/components/search-results';

const Home: React.FC = () => {
    return (
        <main className="space-y-4 pb-8">
            <Header />
            <CategoryFilter />
            <SourceFilter />
            <section className="space-y-4 scrollbar-hide overflow-y-auto">
                <ArticleCardCarousel />
                <NewsSearchResults />
            </section>
        </main>
    );
};

export default Home;
