import { motion } from 'framer-motion';
import { Check, Clock, Award } from 'lucide-react';
import { TeamMember } from '../types';

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Principal Designer",
    bio: "With over 15 years of experience, Sarah leads our creative vision and design processes.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Senior Interior Designer",
    bio: "Michael specializes in contemporary design and space optimization for urban homes.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Commercial Designer",
    bio: "Emma brings expertise in commercial spaces, focusing on functionality and brand identity.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Project Manager",
    bio: "James oversees project execution, ensuring timely delivery and quality craftsmanship.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#F7F7F7]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3A3A3A] mb-6">
              About Our Studio
            </h2>
            <div className="w-20 h-1 bg-[#A67F5D] mb-6"></div>
            <p className="text-gray-600 mb-4">
              Founded in 2010, Elegance Interiors has established itself as a premier interior design studio known for creating spaces that are both beautiful and functional.
            </p>
            <p className="text-gray-600 mb-6">
              Our team of talented designers brings together expertise in architecture, interior styling, and space planning to deliver comprehensive design solutions that exceed client expectations.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-heading font-semibold text-[#3A3A3A] mb-3">
                Our Approach
              </h3>
              <p className="text-gray-600">
                We believe that great design begins with understanding our clients' needs, lifestyle, and aspirations. By combining thoughtful planning with creative vision, we create spaces that are not only aesthetically pleasing but also enhances the way you live, work, and interact.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <div className="text-[#A67F5D] mr-3">
                  <Check className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#3A3A3A]">Quality Craftsmanship</h4>
                  <p className="text-sm text-gray-600">Attention to every detail</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="text-[#A67F5D] mr-3">
                  <Clock className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#3A3A3A]">On-Time Delivery</h4>
                  <p className="text-sm text-gray-600">Respecting your timeline</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="text-[#A67F5D] mr-3">
                  <Award className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#3A3A3A]">Client Satisfaction</h4>
                  <p className="text-sm text-gray-600">Your vision, our priority</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600607687644-c7f34b1d1563?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=1000&q=80" 
                alt="Interior design team working on a project" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="font-heading font-bold text-2xl text-[#3A3A3A]">10+</p>
                <p className="text-gray-600">Years of Experience</p>
              </motion.div>
              <motion.div 
                className="absolute -top-6 -right-6 bg-white p-6 rounded-lg shadow-lg hidden md:block"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="font-heading font-bold text-2xl text-[#3A3A3A]">250+</p>
                <p className="text-gray-600">Projects Completed</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Team Section */}
        <div className="mt-24">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3A3A3A] mb-4">
              Meet Our Team
            </h2>
            <div className="w-20 h-1 bg-[#A67F5D] mx-auto mb-6"></div>
            <p className="max-w-xl mx-auto text-gray-600">
              Our talented team of designers brings together diverse expertise and creative vision.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-4 relative inline-block">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-40 h-40 object-cover rounded-full mx-auto border-4 border-[#A67F5D]"
                  />
                </div>
                <h3 className="font-heading font-semibold text-lg text-[#3A3A3A] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#A67F5D] mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
