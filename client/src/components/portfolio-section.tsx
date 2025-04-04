import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';

type ProjectCategory = 'all' | 'residential' | 'commercial' | 'modern' | 'traditional';

const portfolioProjects: (Project & { categories: ProjectCategory[] })[] = [
  {
    id: 1,
    title: "Contemporary Apartment",
    categories: ["residential", "modern"],
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    altText: "Modern living room with large windows"
  },
  {
    id: 2,
    title: "Tech Startup Office",
    categories: ["commercial", "modern"],
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    altText: "Office space with modern furnishings"
  },
  {
    id: 3,
    title: "Classic Family Home",
    categories: ["residential", "traditional"],
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    altText: "Traditional dining room with elegant furnishings"
  },
  {
    id: 4,
    title: "Urban Bistro",
    categories: ["commercial", "modern"],
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    altText: "Modern restaurant interior with ambient lighting"
  },
  {
    id: 5,
    title: "Scandinavian Loft",
    categories: ["residential", "modern"],
    imageUrl: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    altText: "Minimalist bedroom with natural materials"
  },
  {
    id: 6,
    title: "Heritage Estate",
    categories: ["residential", "traditional"],
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    altText: "Traditional living room with elegant furniture"
  }
];

export default function PortfolioSection() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.categories.includes(filter));

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3A3A3A] mb-4">
            Our Portfolio
          </h2>
          <div className="w-20 h-1 bg-[#A67F5D] mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-gray-600">
            Explore our diverse collection of interior design projects across various styles and spaces.
          </p>
        </motion.div>
        
        {/* Portfolio Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <FilterButton 
            label="All" 
            isActive={filter === 'all'} 
            onClick={() => setFilter('all')} 
          />
          <FilterButton 
            label="Residential" 
            isActive={filter === 'residential'} 
            onClick={() => setFilter('residential')} 
          />
          <FilterButton 
            label="Commercial" 
            isActive={filter === 'commercial'} 
            onClick={() => setFilter('commercial')} 
          />
          <FilterButton 
            label="Modern" 
            isActive={filter === 'modern'} 
            onClick={() => setFilter('modern')} 
          />
          <FilterButton 
            label="Traditional" 
            isActive={filter === 'traditional'} 
            onClick={() => setFilter('traditional')} 
          />
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="portfolio-item"
              >
                <div className="group relative overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={project.imageUrl} 
                    alt={project.altText}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-[#3A3A3A] bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="bg-white text-[#3A3A3A] px-5 py-2 rounded-full font-medium hover:bg-[#A67F5D] hover:text-white transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-heading font-semibold text-[#3A3A3A]">
                    {project.title}
                  </h3>
                  <p className="text-gray-600">
                    {project.categories.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' | ')}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Details Modal - would be implemented for a real application */}
      {/* This would use Shadcn Dialog component */}
    </section>
  );
}

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded font-medium focus:outline-none transition-colors ${
        isActive
          ? 'bg-[#A67F5D] text-white'
          : 'bg-[#F7F7F7] text-[#3A3A3A] hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}
