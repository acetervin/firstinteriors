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

const ITEMS_PER_PAGE = 50;

export function VirtualPortfolioGrid({ items, categories }: VirtualPortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
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
    setSelectedImage(item);
    setSelectedImageIndex(idx !== -1 ? idx : null);
  };

  const showPrev = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImage(filteredImages[selectedImageIndex - 1]);
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };
  const showNext = () => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < filteredImages.length - 1
    ) {
      setSelectedImage(filteredImages[selectedImageIndex + 1]);
      setSelectedImageIndex(selectedImageIndex + 1);
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

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => openImage(item)}
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

      {/* Image Modal */}
      {selectedImage && (
        <>
          {/* Background overlay behind nav and modal */}
          <div className="fixed inset-0 z-20 bg-black/80 backdrop-blur-sm" />
          {/* Modal content, image below nav */}
          <div className="fixed left-0 right-0 bottom-0 z-30 flex flex-col items-center justify-center animate-fadeIn" style={{ top: '5rem' }}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-accent text-3xl font-bold bg-black/70 rounded-full w-12 h-12 flex items-center justify-center z-10 shadow-lg border border-white/20 transition-all duration-200"
              aria-label="Close image viewer"
            >
              ✕
            </button>
            <div className="flex flex-col items-center justify-center w-full h-full px-4">
              <div className="relative flex items-center justify-center w-full max-w-3xl mx-auto">
                <button
                  onClick={showPrev}
                  disabled={selectedImageIndex === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center z-10 shadow-lg border border-white/20 text-xl hover:bg-accent/80 disabled:opacity-40 disabled:cursor-not-allowed md:w-12 md:h-12 md:text-2xl"
                  aria-label="Previous image"
                >
                  &#8592;
                </button>
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-auto max-w-full max-h-[60vh] md:max-h-[80vh] object-contain rounded-2xl shadow-2xl border-4 border-white/10 animate-fadeIn"
                  style={{ boxShadow: '0 8px 40px 0 rgba(73, 73, 73, 0.7)' }}
                />
                <button
                  onClick={showNext}
                  disabled={selectedImageIndex === filteredImages.length - 1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center z-10 shadow-lg border border-white/20 text-xl hover:bg-accent/80 disabled:opacity-40 disabled:cursor-not-allowed md:w-12 md:h-12 md:text-2xl"
                  aria-label="Next image"
                >
                  &#8594;
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}