import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HeroSlide } from '../types';

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80",
    title: "Transforming Spaces Into Experiences",
    subtitle: "Creating bespoke interior designs that reflect your personality and lifestyle"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80",
    title: "Where Vision Meets Expertise",
    subtitle: "Innovative design solutions for modern living and working spaces"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80",
    title: "Elegance in Every Detail",
    subtitle: "Crafting interiors that balance beauty, function, and comfort"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-[90vh] bg-[#F7F7F7] overflow-hidden">
      <div className="h-full w-full relative">
        {heroSlides.map((slide, index) => (
          <AnimatePresence key={slide.id}>
            {currentSlide === index && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <img 
                  src={slide.imageUrl} 
                  alt="Interior design showcase" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-center px-4 max-w-4xl"
                  >
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                      {slide.subtitle}
                    </p>
                    <Button 
                      onClick={scrollToContact}
                      className="bg-[#A67F5D] hover:bg-[#A67F5D]/90 text-white px-8 py-6 rounded"
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index 
                  ? 'bg-white bg-opacity-50' 
                  : 'bg-white bg-opacity-30'
              } focus:outline-none transition-colors`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
