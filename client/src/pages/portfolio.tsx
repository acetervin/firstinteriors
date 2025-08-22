import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { VirtualPortfolioGrid } from '@/components/virtual-portfolio-grid';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { BackButton } from '@/components/back-button';
import { PortfolioItem } from '@/types/portfolio';
import { Skeleton } from '@/components/ui/skeleton';

async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
  const response = await fetch('/api/portfolio');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default function Portfolio() {
  const { ref: heroRef, hasIntersected: heroIntersected } = useIntersectionObserver();
  const { data: portfolioItems = [], isLoading, isError } = useQuery({
    queryKey: ['portfolioItems'],
    queryFn: fetchPortfolioItems,
  });

  const portfolioCategories = [
    'All',
    'Bathrooms',
    'Doors & Door Frames',
    'Floors & Ceilings',
    'Gazebo, Gypsum & Painting',
    'Kitchens',
    'Office Desks',
    'Stairs',
    'Wardrobes',
  ];

  useEffect(() => {
    document.title = 'Portfolio - First Interior | 1000+ Interior Design Projects';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 mt-12 text-left">
            <BackButton />
          </div>
          <div ref={heroRef as React.RefObject<HTMLDivElement>} className={`text-center reveal ${heroIntersected ? 'active' : ''}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-accent">
              Our Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our extensive collection of over 100 interior design projects showcasing our expertise across all categories
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">100+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Projects</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">10</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Categories</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">5</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Years</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">9</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Locations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <Skeleton key={index} className="h-64 w-full" />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center text-red-500">Error loading portfolio items.</div>
          ) : (
            <VirtualPortfolioGrid 
              items={portfolioItems} 
              categories={portfolioCategories}
            />
          )}
        </div>
      </section>

      {/* Performance Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Optimized for Performance</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our portfolio system is built to handle thousands of projects efficiently with lazy loading, 
            virtual scrolling, and smart image optimization for the best user experience.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Lazy Loading</h3>
              <p className="text-sm text-muted-foreground">Images load only when needed, reducing initial load time</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Virtual Scrolling</h3>
              <p className="text-sm text-muted-foreground">Efficient rendering of large datasets without performance loss</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
