"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Debug function to check image loading with better error handling
const checkImage = (src: string): Promise<{ exists: boolean; url: string }> => {
  return new Promise((resolve) => {
    const img = new window.Image();
    const fullUrl = new URL(src, window.location.origin).toString();
    
    img.onload = () => {
      console.log(`✅ Image loaded successfully: ${fullUrl}`);
      resolve({ exists: true, url: fullUrl });
    };
    
    img.onerror = () => {
      console.error(`❌ Failed to load image: ${fullUrl}`);
      resolve({ exists: false, url: fullUrl });
    };
    
    img.src = fullUrl;
  });
};

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  title: string;
};

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/projects/projectlist/project1-cover.png",
    alt: "Corporate Event",
    title: "Corporate Event"
  },
  {
    id: 2,
    src: "/images/projects/projectlist/project2-cover.png",
    alt: "Live Concert",
    title: "Live Concert"
  },
  {
    id: 3,
    src: "/images/projects/projectlist/project3-cover.png",
    alt: "Art Exhibition",
    title: "Art Exhibition"
  },
  {
    id: 4,
    src: "/images/projects/projectlist/project4-cover.png",
    alt: "Product Launch",
    title: "Product Launch"
  },
  {
    id: 5,
    src: "/images/projects/projectlist/project5-cover.png",
    alt: "Conference",
    title: "Industry Conference"
  },
  {
    id: 6,
    src: "/images/projects/projectlist/project6-cover.png",
    alt: "Gala Dinner",
    title: "Gala Dinner"
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const swiperRef = useRef<any>(null);

  // Verify images on component mount
  useEffect(() => {
    console.log('🔍 Starting image verification...');
    
    const verifyImages = async () => {
      const verifiedImages = [];
      
      for (const img of galleryImages) {
        console.log(`🔄 Checking image: ${img.src}`);
        const { exists, url } = await checkImage(img.src);
        
        if (exists) {
          console.log(`✅ Added to gallery: ${img.title}`);
          verifiedImages.push({
            ...img,
            src: url // Use full URL to ensure proper loading
          });
        } else {
          console.error(`❌ Image not accessible: ${img.src}`);
          console.log('Trying to load from public folder directly...');
          
          // Try with direct public path
          const publicPath = `/public${img.src}`;
          console.log(`Trying alternative path: ${publicPath}`);
          const altCheck = await checkImage(publicPath);
          
          if (altCheck.exists) {
            console.log(`✅ Found image at alternative path: ${publicPath}`);
            verifiedImages.push({
              ...img,
              src: publicPath
            });
          }
        }
      }
      
      console.log(`✅ Found ${verifiedImages.length} out of ${galleryImages.length} images`);
      setImages(verifiedImages);
      
      if (verifiedImages.length === 0) {
        console.error('No images could be loaded. Check the following:');
        console.log('1. Are the image files in the correct directory?');
        console.log('2. Are the file names exactly matching?');
        console.log('3. Is the public directory properly configured?');
        console.log('4. Check browser network tab for 404 errors');
      }
    };
    
    verifyImages().catch(console.error);
  }, []);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section className="py-20 bg-lightgray dark:bg-darkblack">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-6 md:gap-10">
            <div className="flex items-center py-3 gap-4 md:gap-8 w-full max-w-xl">
              <span className="bg-primary py-1.5 px-2.5 text-base font-medium rounded-full dark:text-secondary">
                02
              </span>
              <div className="h-px w-16 bg-black/12 dark:bg-white/12" />
              <p className="section-bedge py-1.5 px-4 rounded-full">Gallery</p>
            </div>
            <div className="flex flex-col gap-11">
              <div className="flex flex-col gap-5">
                <h2 className="text-4xl md:text-6xl font-semibold text-darkblack dark:text-white">
                  Our Creative Gallery
                </h2>
              </div>
            </div>
          </div>

          <div className="relative">
            {images.length > 0 ? (
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  swiper.on('slideChange', () => {
                    setActiveIndex(swiper.activeIndex);
                  });
                }}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={images.length > 1}
                autoplay={images.length > 1 ? {
                  delay: 5000,
                  disableOnInteraction: false,
                } : false}
                pagination={{
                  clickable: true,
                  el: '.gallery-pagination',
                  bulletClass: 'w-2 h-2 rounded-full bg-gray-300 mx-1 inline-block cursor-pointer',
                  bulletActiveClass: '!bg-primary',
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="pb-16"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={image.id}>
                    <div 
                      className="group relative rounded-xl overflow-hidden cursor-pointer h-80 md:h-96 mx-4 bg-gray-100"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative w-full h-full">
                        <div className="relative w-full h-full">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              console.error(`Error loading image: ${image.src}`);
                              const target = e.target as HTMLImageElement;
                              target.src = `https://placehold.co/600x400/1a1a2e/e94560?text=${encodeURIComponent(image.alt)}`;
                            }}
                            unoptimized={process.env.NODE_ENV === 'development'}
                          />
                          {process.env.NODE_ENV !== 'production' && (
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs p-1 rounded">
                              {image.title}
                            </div>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                          <span className="text-white text-xl font-semibold text-center">{image.title}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No images found. Please check the console for errors.</p>
              </div>
            )}

            {/* Custom Navigation */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors -ml-6"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors -mr-6"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Custom Pagination */}
            <div className="gallery-pagination flex justify-center mt-8 space-x-2" />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute -right-12 top-0 text-white text-4xl hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              &times;
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
