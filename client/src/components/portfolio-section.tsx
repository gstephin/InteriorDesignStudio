import { useState } from 'react';
import { motion } from 'framer-motion';

// Project types
type ProjectCategory = 'all' | 'residential' | 'commercial' | 'modern' | 'traditional';

interface Project {
  id: number;
  title: string;
  categories: ProjectCategory[];
  imagePath: string;
  altText: string;
}

// Portfolio projects using images from public folder
const projects: Project[] = [
  {
    id: 1,
    title: "Luxury Bedroom Suite",
    categories: ['residential', 'modern'],
    imagePath: "/assets/portfolio/img1.png",
    altText: "Modern living room with elegant furniture"
  },
  {
    id: 2,
    title: "Bedroom Suite",
    categories: ['residential', 'modern'],
    imagePath: "/assets/portfolio/img2.png",
    altText: "Contemporary kitchen design with minimalist elements"
  },
  {
    id: 3,
    title: "Modern Living Room Design",
    categories: ['residential', 'traditional'],
    imagePath: "/assets/portfolio/img3.png",
    altText: "Luxurious bedroom with custom furniture"
  },
  {
    id: 4,
    title: "Traditional Dining Area",
    categories: ['commercial', 'modern'],
    imagePath: "/assets/portfolio/img4.png",
    altText: "Modern office space design with ergonomic features"
  },
  {
    id: 5,
    title: "Modular Kitchen",
    categories: ['residential', 'traditional'],
    imagePath: "/assets/portfolio/img5.png",
    altText: "Traditional dining room with elegant details"
  },
  {
    id: 6,
    title: "Modular Kitchen",
    categories: ['residential', 'modern'],
    imagePath: "/assets/portfolio/img6.png",
    altText: "Contemporary bathroom design with luxury fixtures"
  },
  {
    id: 7,
    title: "Prayer Unit",
    categories: ['commercial', 'modern'],
    imagePath: "/assets/portfolio/img7.png",
    altText: "Elegant hotel lobby with custom lighting"
  },
  {
    id: 8,
    title: "Wash Counter Unit",
    categories: ['residential', 'traditional'],
    imagePath: "/assets/portfolio/img8.png",
    altText: "Classic living room with traditional elements"
  },
  {
    id: 9,
    title: "Tv Unit",
    categories: ['commercial', 'modern'],
    imagePath: "/assets/portfolio/img9.png",
    altText: "Executive office with premium design elements"
  }
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.categories.includes(activeCategory));
  
  return (
    <section id="portfolio" className="py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Our Portfolio
          </h2>
          <div className="w-20 h-1 bg-[#A67F5D] mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-gray-600">
            Explore our diverse collection of interior design projects showcasing our expertise and creative vision.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <FilterButton 
            label="All" 
            isActive={activeCategory === 'all'} 
            onClick={() => setActiveCategory('all')} 
          />
          <FilterButton 
            label="Residential" 
            isActive={activeCategory === 'residential'} 
            onClick={() => setActiveCategory('residential')} 
          />
          <FilterButton 
            label="Commercial" 
            isActive={activeCategory === 'commercial'} 
            onClick={() => setActiveCategory('commercial')} 
          />
          <FilterButton 
            label="Modern" 
            isActive={activeCategory === 'modern'} 
            onClick={() => setActiveCategory('modern')} 
          />
          <FilterButton 
            label="Traditional" 
            isActive={activeCategory === 'traditional'} 
            onClick={() => setActiveCategory('traditional')} 
          />
        </div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: project.id * 0.1 }}
            >
              <div className="aspect-w-4 aspect-h-3 relative">
                <div className="w-full h-64 overflow-hidden">
                  <img 
                    src={project.imagePath} 
                    alt={project.altText} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.categories.map((category) => (
                        <span 
                          key={category} 
                          className="text-xs text-[#A67F5D] bg-white bg-opacity-20 px-2 py-1 rounded"
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
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
      className={`px-4 py-2 rounded-full font-medium transition-colors ${
        isActive 
          ? 'bg-[#A67F5D] text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );
}