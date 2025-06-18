import { useState, useEffect, useRef, useMemo } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Filter, ExternalLink, Eye } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  location: string;
  year: string;
  featured?: boolean;
}

interface VirtualPortfolioGridProps {
  items: PortfolioItem[];
  categories: string[];
}

const ITEMS_PER_PAGE = 20;
const ITEM_HEIGHT = 320; // Approximate height of each item

export function VirtualPortfolioGrid({ items, categories }: VirtualPortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loadedItems, setLoadedItems] = useState<PortfolioItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const { ref: gridRef, hasIntersected } = useIntersectionObserver();
  const observerRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return items;
    }
    return items.filter(item => item.category === selectedCategory);
  }, [items, selectedCategory]);

  const loadMoreItems = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = currentPage * ITEMS_PER_PAGE;
    const newItems = filteredItems.slice(startIndex, endIndex);
    
    if (currentPage === 1) {
      setLoadedItems(newItems);
    } else {
      setLoadedItems(prev => [...prev, ...newItems]);
    }
    
    setCurrentPage(prev => prev + 1);
    setIsLoading(false);
  };

  // Reset when category changes
  useEffect(() => {
    setCurrentPage(1);
    setLoadedItems([]);
    loadMoreItems();
  }, [selectedCategory]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && loadedItems.length < filteredItems.length) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadedItems.length, filteredItems.length, isLoading]);

  const LazyImage = ({ item }: { item: PortfolioItem }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && imgRef.current && !imageLoaded) {
            const img = imgRef.current;
            img.src = item.image;
            img.onload = () => setImageLoaded(true);
            img.onerror = () => setImageError(true);
          }
        },
        { threshold: 0.1 }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }, [item.image, imageLoaded]);

    return (
      <div className="relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700 aspect-[4/3]">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
          </div>
        )}
        
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-center text-gray-400">
              <div className="w-12 h-12 mx-auto mb-2 opacity-50">📷</div>
              <p className="text-sm">Image unavailable</p>
            </div>
          </div>
        )}

        <img
          ref={imgRef}
          alt={item.title}
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(item)}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <Eye size={20} />
          </button>
        </div>

        <div className="absolute top-4 left-4">
          <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
            {item.category}
          </span>
        </div>

        {item.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
              Featured
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Filter Section */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center space-x-2 mr-6">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground font-medium">Filter:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:bg-accent/10 dark:hover:bg-accent/20'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-2 text-xs opacity-75">
                  ({items.filter(item => item.category === category).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center text-muted-foreground">
        Showing {loadedItems.length} of {filteredItems.length} projects
      </div>

      {/* Portfolio Grid */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {loadedItems.map((item, index) => (
          <div
            key={`${item.id}-${selectedCategory}`}
            className={`group cursor-pointer reveal ${hasIntersected ? 'active' : ''}`}
            style={{ animationDelay: `${(index % ITEMS_PER_PAGE) * 0.05}s` }}
          >
            <LazyImage item={item} />
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.location}</span>
                <span>{item.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
            <span className="text-muted-foreground">Loading more projects...</span>
          </div>
        </div>
      )}

      {/* Load More Trigger */}
      {!isLoading && loadedItems.length < filteredItems.length && (
        <div ref={observerRef} className="h-10" />
      )}

      {/* End Message */}
      {loadedItems.length > 0 && loadedItems.length >= filteredItems.length && (
        <div className="text-center py-8 text-muted-foreground">
          You've viewed all {filteredItems.length} projects in this category
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold"
            >
              ✕
            </button>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-xl font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-white/80 mb-2">{selectedImage.description}</p>
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>{selectedImage.location}</span>
                <span>{selectedImage.year}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}