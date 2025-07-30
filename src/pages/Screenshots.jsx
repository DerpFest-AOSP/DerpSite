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
        indicator.style.width = index === activeIndex ? '24px' : '8px';
        indicator.style.opacity = index === activeIndex ? '1' : '0.6';
      });
    };
    
    carousel.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [images.length]);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto animate-fade-in">
      <h1 className="text-4xl text-center font-bold mb-10 bg-gradient-to-r from-[#00CFFF] to-[#00FFBF] bg-clip-text text-transparent">
        Screenshots
      </h1>
      
      <div className="relative group">
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-6 pb-8 hide-scrollbar carouselFadeIn"
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
              <div className="bg-gradient-to-br from-[#00CFFF] to-[#00FFBF] p-1 rounded-3xl shadow-xl h-full">
                <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-white/10 h-full">
                  <div className="relative">
                    <img 
                      src={img}
                      alt={`App screenshot ${index + 1}`}
                      className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                      style={{ aspectRatio: '1080/2412' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-medium bg-black/40 px-2 py-1 rounded-full">
                        Screen {index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Scroll indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, i) => (
            <div 
              key={i}
              className="scroll-indicator h-1.5 bg-gradient-to-r from-[#00CFFF] to-[#00FFBF] rounded-full transition-all duration-300 ease-out"
              style={{ width: i === 0 ? '24px' : '8px', opacity: i === 0 ? 1 : 0.6 }}
            />
          ))}
        </div>
        
        {/* Gradient fade effect */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-[#121212] to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-[#121212] to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Screenshots;