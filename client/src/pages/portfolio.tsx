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
  const response = await fetch('/portfolio.json');
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 mt-12 text-left">
            <BackButton />
          </div>
          <div ref={heroRef as React.RefObject<HTMLDivElement>} className={`text-center reveal ${heroIntersected ? 'active' : ''}`}>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-accent">Our Work</h1>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">              A collection of our finest interior design projects, showcasing our commitment to quality and craftsmanship.
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-gray-700 uppercase tracking-wide">Projects</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">10+</div>
                <div className="text-sm text-gray-700 uppercase tracking-wide">Categories</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">15+</div>
                <div className="text-sm text-gray-700 uppercase tracking-wide">Years</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">50+</div>
                <div className="text-sm text-gray-700 uppercase tracking-wide">Locations</div>
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



      <Footer />
    </div>
  );
}
