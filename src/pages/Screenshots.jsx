import { useRef, useEffect } from 'react';

const Screenshots = () => {
  const carouselRef = useRef(null);
  const images = Array.from({ length: 17 }, (_, i) => `./img/screens/screen${i + 1}.png`);
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    const handleScroll = () => {
      const indicators = document.querySelectorAll('.scroll-indicator');
      const scrollPercentage = carousel.scrollLeft / (carousel.scrollWidth - carousel.clientWidth);
      const activeIndex = Math.floor(scrollPercentage * (images.length - 1));
      
      indicators.forEach((indicator, index) => {
        indicator.style.width = index === activeIndex ? '32px' : '8px';
        indicator.style.opacity = index === activeIndex ? '1' : '0.6';
      });
    };
    
    carousel.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [images.length]);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#33bbff] to-[#1de099] bg-clip-text text-transparent gradient-shift">
          Screenshots
        </h1>
        <p className="text-xl text-gray-300">Experience DerpFest through our screenshots</p>
      </div>
      
      <div className="relative group">
        {/* Desktop scroll hint */}
        <div className="hidden md:block absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          ← Scroll to see more →
        </div>
        
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-6 pb-8 hide-scrollbar carouselFadeIn cursor-grab active:cursor-grabbing"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {images.map((img, index) => (
            <div 
              key={index}
              className="flex-shrink-0 snap-center transition-all duration-300 ease-out hover:scale-105"
              style={{
                width: 'min(85vw, 300px)',
                perspective: '1000px'
              }}
            >
              <div className="bg-gradient-to-br from-[#33bbff] to-[#1de099] p-1 rounded-3xl shadow-2xl h-full hover:shadow-[#33bbff]/25 transition-all duration-500">
                <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-white/20 h-full backdrop-blur-sm">
                  <div className="relative group">
                    <img 
                      src={img}
                      alt={`App screenshot ${index + 1}`}
                      className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      loading="lazy"
                      style={{ aspectRatio: '1080/2412' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm font-semibold bg-gradient-to-r from-[#33bbff] to-[#1de099] px-3 py-1 rounded-full shadow-lg">
                          Screen {index + 1}
                        </span>
                        <div className="w-2 h-2 bg-[#1de099] rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-3 h-3 bg-white/20 rounded-full backdrop-blur-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Scroll indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, i) => (
            <div 
              key={i}
              className="scroll-indicator h-2 bg-gradient-to-r from-[#33bbff] to-[#1de099] rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: i === 0 ? '32px' : '8px', opacity: i === 0 ? 1 : 0.6 }}
            />
          ))}
        </div>
        
        {/* Navigation arrows for desktop */}
        <button 
          className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-10"
          onClick={() => {
            if (carouselRef.current) {
              carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
            }
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-10"
          onClick={() => {
            if (carouselRef.current) {
              carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
            }
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Gradient fade effect */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0f0f23] to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0f0f23] to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Screenshots;