
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sathish N",
    review: "Can occupy large number of people. Parking can be done on either side of the road as the road is wide enough.",
    rating: 4.5,
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXh7SQezwN0mqNBu_uR-KWr6c728yz0_z2nXczhl_k0QQCv_G3MTg=w45-h45-p-rp-mo-ba6-br100"
  },
  {
    id: 2,
    name: "Prakash TN",
    review: "Beautiful convenient fully equipped Hall for 1000 to 1500 members for function like Marriage, Naming ceremony, Birthday party, Mehendi, Sangeeth, Puberty Functions. Opt place for Non-Veg BEEGARA OOTA. Generator and 24 hours water, 2 AC Rooms, Spacious Kitchen. East facing 100 feet BDA Road.",
    rating: 5,
    image: "https://lh3.googleusercontent.com/a/ACg8ocJkTR9i5Z3-iguhL6c8qo8VlGz6bYXrKJC6bymOmwr1T9lchJo=w45-h45-p-rp-mo-br100"
  },
  {
    id: 3,
    name: "Mallesh M",
    review: "Ideally located for big parties. Everything is neat and tidy. Loved it.",
    rating: 4.5,
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVfO2RJw1H9GGjxsgaLjqPE05xazkWUsd3QIyA-RQqjx-AzgMDy=w45-h45-p-rp-mo-br100"
  },
  {
    id: 4,
    name: "Puneeth Jagadish",
    review: "Superb well-maintained. Simple and awesome conventional for engagement/exhibition. Food hall is quite big.",
    rating: 4.5,
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXetYzODZYumF8FUjC_dPEn7btyzfzD_x0dnc__QZ9FloSNrs8V=w45-h45-p-rp-mo-ba4-br100"
  },
  {
    id: 5,
    name: "Girija A.C",
    review: "Amazing place for Small function like Beegar Oota/Naming Ceremony/Seemantha/Birthday & all functions in Bangalore. The venue has got 2 halls One is for stage, another one is dining area and 2 rooms within the property. Well maintained and neat place at affordable price. The host, Prem is very helpful and professional. You must go and check out this place if you are looking for a convenient function venue in and around Bangalore.",
    rating: 5,
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVU3fKRz6ZQ_nCAOJPTojW8qwkoRXWRGaGIdDH9eJOSV0JSYBflFQ=w45-h45-p-rp-mo-ba3-br100"
  }
];

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-lightgray dark:bg-secondary py-20 md:py-40 overflow-hidden">
      <div className="container">
        <div className="flex flex-col gap-14 xl:gap-24">
          <div className="flex flex-col xl:flex xl:flex-row items-start gap-8">
            <div className="flex items-center py-3 gap-4 md:gap-8 w-full max-w-xl">
              <span className="bg-primary dark:text-secondary py-1.5 px-2.5 text-base font-medium rounded-full">05</span>
              <div className="h-px w-16 bg-black/12 dark:bg-white/12"/>
              <p className="section-bedge py-1.5 px-4 rounded-full">Testimonial</p>
            </div>
            <div className="flex flex-col gap-11">
              <div className="flex flex-col gap-5">
                <h2 className="max-w-3xl">Reviews From Customers</h2>
                <p className="max-w-2xl text-secondary/70 dark:text-white/70">Hear what our valued customers have to say about their experience with our venue and services.</p>
              </div>
            </div>
          </div>
          
          <div 
            ref={containerRef}
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white dark:bg-black/20 p-8 rounded-lg shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-500 ml-1">{testimonial.rating}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg italic">&ldquo;{testimonial.review}&rdquo;</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <div className="relative w-12 h-12">
                          <Image 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="rounded-full object-cover"
                            width={48}
                            height={48}
                            onError={(e) => {
                              // Fallback to initial if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`;
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-lg text-gray-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">Happy Customer</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10 ml-2"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10 mr-2"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentIndex === index ? 'bg-primary dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
