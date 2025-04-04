import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from '../types';

const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Riverside Apartment",
    categories: ["Modern", "Minimalist"],
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    altText: "Modern living space with large windows and natural light"
  },
  {
    id: 2,
    title: "Hillside Residence",
    categories: ["Contemporary", "Elegant"],
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    altText: "Luxurious kitchen with marble countertops"
  },
  {
    id: 3,
    title: "Lakeside Villa",
    categories: ["Rustic", "Luxurious"],
    imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    altText: "Cozy bedroom with natural textures"
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6
    }
  }
};

export default function FeaturedProjects() {
  const scrollToPortfolio = () => {
    const portfolioSection = document.querySelector('#portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3A3A3A] mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-[#A67F5D] mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-gray-600">
            Discover our most celebrated interior design projects and the spaces we've transformed.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    delay: index * 0.2
                  }
                }
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img 
                  src={project.imageUrl} 
                  alt={project.altText} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-[#3A3A3A] bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-heading font-semibold text-[#3A3A3A] mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-2">{project.categories.join(" | ")}</p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-[#A67F5D] hover:text-[#3A3A3A] transition-colors"
                >
                  View Project <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            onClick={scrollToPortfolio}
            variant="outline" 
            className="border-2 border-[#A67F5D] text-[#A67F5D] hover:bg-[#A67F5D] hover:text-white px-8 py-6 rounded transition-colors"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
