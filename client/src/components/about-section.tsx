import { motion } from 'framer-motion';
import { Check, Clock, Award } from 'lucide-react';

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
              Founded in 2010, Ktisis Interiors has established itself as a premier interior design studio known for creating spaces that are both beautiful and functional.
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
                alt="Interior design studio workspace" 
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
      </div>
    </section>
  );
}
