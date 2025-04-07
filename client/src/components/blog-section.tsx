import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Modern Minimalism in Interior Design",
    excerpt: "Discover how to create a minimalist interior that maximizes both style and functionality.",
    content: `Minimalism in interior design is more than just a style; it's a philosophy that emphasizes the concept of "less is more." This approach focuses on creating spaces that are both functional and aesthetically pleasing while maintaining a sense of simplicity and purpose.

    Key Principles of Minimalist Design:
    1. Clean Lines and Simple Forms
    2. Neutral Color Palettes
    3. Quality Over Quantity
    4. Purposeful Space Usage
    5. Natural Light Maximization

    When implementing minimalist design, start by decluttering and keeping only essential items. Choose furniture with clean lines and simple forms, and opt for a neutral color palette with occasional subtle accents. Remember, minimalism doesn't mean your space should feel cold or uninviting - incorporate different textures and natural materials to add warmth and interest.`,
    imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    date: "June 15, 2023"
  },
  {
    id: 2,
    title: "Color Psychology in Home Decor",
    excerpt: "Learn how different colors can influence mood and atmosphere in your living spaces.",
    content: `Color plays a crucial role in interior design, affecting our emotions, behavior, and overall well-being. Understanding color psychology can help you create spaces that not only look beautiful but also promote the desired emotional response.

    Color Impact Guide:
    - Blue: Promotes calm and relaxation
    - Green: Creates a natural, refreshing atmosphere
    - Yellow: Energizes and uplifts
    - Red: Stimulates and creates excitement
    - Purple: Adds luxury and sophistication
    - White: Opens up spaces and promotes clarity

    When selecting colors for your home, consider the function of each room and the atmosphere you want to create. Bedrooms benefit from calming colors like soft blues and greens, while social spaces might incorporate more energetic hues.`,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    date: "July 2, 2023"
  },
  {
    id: 3,
    title: "Sustainable Interior Design Trends",
    excerpt: "Explore eco-friendly materials and sustainable practices in modern interior design.",
    content: `Sustainable interior design is becoming increasingly important as we focus on reducing our environmental impact. This approach combines aesthetic appeal with ecological responsibility, creating beautiful spaces that are kind to our planet.

    Key Sustainable Design Elements:
    1. Eco-friendly Materials
    - Reclaimed wood
    - Recycled metals and plastics
    - Natural fibers like bamboo and cork

    2. Energy Efficiency
    - LED lighting
    - Smart home systems
    - Natural ventilation

    3. Waste Reduction
    - Upcycled furniture
    - Minimal packaging
    - Durable, long-lasting materials

    When implementing sustainable design, focus on sourcing local materials, choosing energy-efficient appliances, and incorporating plants for natural air purification. Remember that sustainable design doesn't mean compromising on style - many eco-friendly options are both beautiful and environmentally responsible.`,
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    date: "July 20, 2023"
  }
];

export default function BlogSection() {
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
            Interior Design Blog
          </h2>
          <div className="w-20 h-1 bg-[#A67F5D] mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-gray-600">
            Get inspired with our latest articles on interior design trends and tips.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative h-48">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-sm text-gray-500">{post.date}</span>
                <h3 className="text-xl font-heading font-semibold text-[#3A3A3A] mt-2 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <Button 
                  className="bg-[#A67F5D] hover:bg-opacity-90 text-white"
                  onClick={() => window.location.href = `/blog/${post.id}`}
                >
                  Read More
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}