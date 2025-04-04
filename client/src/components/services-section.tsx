import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: 1,
    icon: "home",
    title: "Residential Design",
    description: "Transform your home into a personalized sanctuary that reflects your lifestyle and preferences.",
    features: [
      "Full home redesign",
      "Single room transformations",
      "Custom furniture solutions"
    ]
  },
  {
    id: 2,
    icon: "building",
    title: "Commercial Design",
    description: "Create inspiring and functional workspaces that enhance productivity and impress clients.",
    features: [
      "Office space planning",
      "Retail environment design",
      "Hospitality interiors"
    ]
  },
  {
    id: 3,
    icon: "palette",
    title: "Interior Styling",
    description: "Enhance your existing spaces with professional styling that elevates your interior aesthetic.",
    features: [
      "Color scheme development",
      "Accessory and art curation",
      "Seasonal refreshes"
    ]
  },
  {
    id: 4,
    icon: "pencil",
    title: "Space Planning",
    description: "Optimize your floor plan to maximize functionality, flow, and aesthetic harmony.",
    features: [
      "3D spatial visualization",
      "Furniture placement optimization",
      "Traffic flow analysis"
    ]
  },
  {
    id: 5,
    icon: "lightbulb",
    title: "Lighting Design",
    description: "Create ambiance and highlight architectural features with thoughtful lighting solutions.",
    features: [
      "Layered lighting plans",
      "Fixture selection and placement",
      "Smart lighting integration"
    ]
  },
  {
    id: 6,
    icon: "tag",
    title: "Material Selection",
    description: "Choose the perfect materials, finishes and textures to bring your design vision to life.",
    features: [
      "Flooring and wall treatments",
      "Fabric and textile selection",
      "Countertop and cabinet finishes"
    ]
  }
];

// Icons for each service
const IconComponent = ({ icon }: { icon: string }) => {
  // You can replace these with actual icons from lucide-react
  const icons: { [key: string]: JSX.Element } = {
    home: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    building: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>,
    palette: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>,
    pencil: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>,
    lightbulb: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>,
    tag: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path><path d="M7 7h.01"></path></svg>
  };

  return (
    <div className="text-[#A67F5D] mb-4">
      {icons[icon] || <span className="text-4xl">•</span>}
    </div>
  );
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-[#F7F7F7]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3A3A3A] mb-4">
            Our Services
          </h2>
          <div className="w-20 h-1 bg-[#A67F5D] mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-gray-600">
            Comprehensive interior design solutions tailored to your needs and vision.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <IconComponent icon={service.icon} />
              <h3 className="text-xl font-heading font-semibold text-[#3A3A3A] mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2 text-gray-600">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="text-[#6A994E] mr-2 mt-1 h-5 w-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
