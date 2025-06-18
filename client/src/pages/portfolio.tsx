import { useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { VirtualPortfolioGrid } from '@/components/virtual-portfolio-grid';
import { portfolioItems, portfolioCategories } from '@/data/portfolio-data';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

export default function Portfolio() {
  const { ref: heroRef, hasIntersected: heroIntersected } = useIntersectionObserver();

  useEffect(() => {
    document.title = 'Portfolio - First Interior | 1000+ Interior Design Projects';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className={`text-center reveal ${heroIntersected ? 'active' : ''}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">Our Portfolio</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our extensive collection of over 1,000 interior design projects showcasing our expertise across all categories
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-accent mb-1">1000+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-accent mb-1">9</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-accent mb-1">5</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-accent mb-1">9</div>
                <div className="text-sm text-muted-foreground">Locations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VirtualPortfolioGrid 
            items={portfolioItems} 
            categories={portfolioCategories}
          />
        </div>
      </section>

      {/* Performance Info */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Optimized for Performance</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our portfolio system is built to handle thousands of projects efficiently with lazy loading, 
            virtual scrolling, and smart image optimization for the best user experience.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Lazy Loading</h3>
              <p className="text-sm text-muted-foreground">Images load only when needed, reducing initial load time</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Virtual Scrolling</h3>
              <p className="text-sm text-muted-foreground">Efficient rendering of large datasets without performance loss</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Smart Filtering</h3>
              <p className="text-sm text-muted-foreground">Fast category filtering with optimized data structures</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}