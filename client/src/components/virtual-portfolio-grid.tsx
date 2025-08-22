import { useState, useEffect, useRef, useMemo } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Filter, ExternalLink, Eye } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';


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

const ITEMS_PER_PAGE = 52;

export function VirtualPortfolioGrid({ items, categories }: VirtualPortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { ref: gridRef, hasIntersected } = useIntersectionObserver<HTMLDivElement>();


  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return items;
    }
    return items.filter(item => item.category === selectedCategory);
  }, [items, selectedCategory]);

  // Calculate paginated items
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage]);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') return items;
    return items.filter(item => item.category === selectedCategory);
  }, [items, selectedCategory]);

  const openImage = (item: PortfolioItem) => {
    const idx = filteredImages.findIndex(i => i.id === item.id);
    if (idx !== -1) {
      setIndex(idx);
      setOpen(true);
    }
  };


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
      <div className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/3]">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
          </div>
        )}
        
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
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

        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-white/75 text-lg font-semibold">© First Interior</p>
        </div>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">

          <button
            onClick={() => openImage(item)}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <Eye size={20} />
          </button>
        </div>

      
      </div>
    );
  };

  const slides = filteredImages.map(item => ({
    src: item.image,
    title: item.title,
    description: item.description,
  }));

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
                  : 'bg-gray-100 text-muted-foreground hover:bg-accent/10'
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
        Showing {paginatedItems.length} of {filteredItems.length} projects (Page {currentPage} of {totalPages})
      </div>

      {/* Portfolio Grid */}
      <div 
        ref={gridRef}
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {paginatedItems.map((item, index) => (
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
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.location}</span>
                <span>{item.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 py-8">
        <button
          className="px-6 py-2 rounded-full font-semibold shadow transition-all duration-200 border-2 border-accent bg-white text-accent hover:bg-accent hover:text-gray-800  focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          &#8592; Previous
        </button>
        <span className="self-center text-muted-foreground font-medium">Page {currentPage} of {totalPages}</span>
        <button
          className="px-6 py-2 rounded-full font-semibold shadow transition-all duration-200 border-2 border-accent bg-white text-accent hover:bg-accent hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next &#8594;
        </button>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        render={{
          slide: ({ slide }) => (
            <div className="relative w-full h-full">
              <img
                alt={(slide as any).title}

                src={slide.src}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-white/75 text-2xl md:text-4xl font-semibold">
                  © First Interiors
                </p>
              </div>
            </div>
          ),
        }}
      />

    </div>
  );
}
