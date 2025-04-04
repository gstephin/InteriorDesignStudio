import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Elegance Interiors transformed our outdated living space into a sophisticated, functional area that perfectly suits our lifestyle. Their attention to detail and understanding of our vision exceeded our expectations.",
    name: "Jennifer Davis",
    role: "Residential Client",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 2,
    quote: "Working with Elegance Interiors on our office redesign was a seamless experience. They created a space that not only looks impressive to our clients but has significantly improved our team's productivity and satisfaction.",
    name: "Robert Anderson",
    role: "Commercial Client",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 3,
    quote: "The team at Elegance Interiors listened to our needs and delivered a design that perfectly balances luxury and comfort. Their expertise and professionalism made the entire process enjoyable and stress-free.",
    name: "Sophie Martinez",
    role: "Residential Client",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSlideWidth = () => {
      if (sliderRef.current) {
        setSlideWidth(sliderRef.current.offsetWidth);
      }
    };

    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);

    return () => {
      window.removeEventListener('resize', updateSlideWidth);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3A3A3A] mb-4">
            Client Testimonials
          </h2>
          <div className="w-20 h-1 bg-[#A67F5D] mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-gray-600">
            Hear what our clients have to say about their experience working with us.
          </p>
        </motion.div>
        
        <div className="relative" ref={sliderRef}>
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              initial={false}
              animate={{ x: -currentIndex * slideWidth }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full lg:w-1/3 flex-shrink-0 px-4"
                  style={{ minWidth: '100%' }}
                >
                  <div className="bg-[#F7F7F7] p-8 rounded-lg shadow-md">
                    <div className="text-[#A67F5D] mb-4">
                      <Quote className="h-8 w-8" />
                    </div>
                    <p className="text-gray-600 mb-6 italic">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.imageUrl} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-[#3A3A3A]">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Testimonial Controls */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-[#3A3A3A] hover:text-[#A67F5D] focus:outline-none hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-[#3A3A3A] hover:text-[#A67F5D] focus:outline-none hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Testimonial Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full focus:outline-none ${
                  currentIndex === index ? 'bg-[#A67F5D]' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
