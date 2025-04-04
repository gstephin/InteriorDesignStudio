import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';

type ProjectCategory = 'all' | 'residential' | 'commercial' | 'modern' | 'traditional';

const portfolioProjects: (Project & { categories: ProjectCategory[] })[] = [
  {
    id: 1,
    title: "Modern Living Room",
    categories: ["residential", "modern"],
    imageUrl: "/assets/portfolio/interior-1.jpeg",
    altText: "Modern living room with stylish furnishings"
  },
  {
    id: 2,
    title: "Elegant Dining Space",
    categories: ["residential", "traditional"],
    imageUrl: "/assets/portfolio/interior-2.jpeg",
    altText: "Elegant dining area with wooden furniture"
  },
  {
    id: 3,
    title: "Contemporary Kitchen",
    categories: ["residential", "modern"],
    imageUrl: "/assets/portfolio/interior-3.jpeg",
    altText: "Contemporary kitchen with modern appliances"
  },
  {
    id: 4,
    title: "Luxurious Bedroom",
    categories: ["residential", "traditional"],
    imageUrl: "/assets/portfolio/interior-4.jpeg",
    altText: "Luxurious bedroom with elegant decor"
  },
  {
    id: 5,
    title: "Minimalist Bathroom",
    categories: ["residential", "modern"],
    imageUrl: "/assets/portfolio/interior-5.jpeg",
    altText: "Minimalist bathroom design with clean lines"
  },
  {
    id: 6,
    title: "Office Space",
    categories: ["commercial", "modern"],
    imageUrl: "/assets/portfolio/interior-6.jpeg",
    altText: "Modern office space with professional design"
  },
  {
    id: 7,
    title: "Cozy Living Area",
    categories: ["residential", "traditional"],
    imageUrl: "/assets/portfolio/interior-7.jpeg",
    altText: "Cozy living area with comfortable furniture"
  },
  {
    id: 8,
    title: "Commercial Reception",
    categories: ["commercial", "modern"],
    imageUrl: "/assets/portfolio/interior-8.jpeg",
    altText: "Modern commercial reception area"
  },
  {
    id: 9,
    title: "Stylish Home Office",
    categories: ["residential", "modern"],
    imageUrl: "/assets/portfolio/interior-9.jpeg",
    altText: "Stylish home office setup with organized workspace"
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
