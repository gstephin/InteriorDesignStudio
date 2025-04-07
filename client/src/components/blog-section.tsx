import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    excerpt:
      "Discover how to create a minimalist interior that maximizes both style and functionality.",
    content: `🗓️ June 15, 2023

Modern Minimalism in Interior Design  
Discover how to create a minimalist interior that maximizes both style and functionality.

Minimalism is more than just a design trend—it's a lifestyle choice. In a world increasingly filled with distractions and clutter, modern minimalism offers a refreshing return to simplicity, clarity, and purpose. At Ktisis Interiors, we believe design should be intentional, timeless, and functional.

✨ <strong>What Is Modern Minimalism?</strong>  
Modern minimalism merges the sleek simplicity of minimalist design principles with the warmth and functionality of modern living. It strips away the unnecessary while keeping the essential—and beautiful—elements in focus. Think fewer but better pieces, neutral color palettes, and thoughtfully chosen decor that serves a purpose. Our minimalist interior design services are crafted to help clients achieve this balance.

🛋️ <strong>Key Elements of a Minimalist Interior</strong>
- Neutral Colors: Whites, grays, and earth tones create a calm and timeless foundation.
- Clean Lines: Furniture with simple shapes and minimal ornamentation keeps spaces visually light.
- Functional Decor: Every item should have a purpose—be it practical use or aesthetic value.
- Open Space: Avoid overcrowding. Embrace open layouts that give the room room to breathe.
- Natural Light: Large windows, sheer curtains, and light-reflecting surfaces enhance brightness and openness.

Explore our portfolio to see how we integrate these elements into modern homes.

🧩 <strong>How to Create a Minimalist Home</strong>
1. <strong>Declutter Ruthlessly</strong>  
   Start by removing anything that doesn’t serve a purpose or spark joy. At Ktisis Interiors, we help clients reimagine their spaces with a focus on mindful design.

2. <strong>Choose Quality Over Quantity</strong>  
   Invest in a few high-quality pieces that are both functional and elegant.

3. <strong>Stick to a Unified Palette</strong>  
   A consistent color scheme throughout the home creates harmony and flow—something we consider in every project.

4. <strong>Add Warmth Through Texture</strong>  
   Incorporate materials like wood, linen, or stone to maintain a cozy feel even in a clean, minimalist layout.

5. <strong>Keep It Personal (But Subtle)</strong>  
   Minimalism doesn’t mean impersonal. Through curated decor and custom finishes, we ensure every space tells your story.

🌿 <strong>The Benefits of Minimalist Living</strong>
- Reduced stress and visual noise
- Easier cleaning and maintenance
- Greater focus and mental clarity
- A home that reflects intentional living

Let Ktisis Interiors help you create a peaceful, purposeful environment that enhances your everyday life.

✅ <strong>Final Thoughts</strong>  
Modern minimalism isn’t about living without—it’s about living with intention. By embracing simplicity and focusing on what truly matters, you can create a home that feels calm, elegant, and effortlessly stylish.

Explore more about minimalist design and timeless comfort in our portfolio section.`,
    imageUrl:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    date: "June 15, 2023",
  },
  {
    id: 2,
    title: "Color Psychology in Home Decor",
    excerpt:
      "Learn how different colors can influence mood and atmosphere in your living spaces.",
    content: `Color plays a crucial role in interior design, affecting our emotions, behavior, and overall well-being. Understanding color psychology can help you create spaces that not only look beautiful but also promote the desired emotional response.

Color Impact Guide:
- Blue: Promotes calm and relaxation
- Green: Creates a natural, refreshing atmosphere
- Yellow: Energizes and uplifts
- Red: Stimulates and creates excitement
- Purple: Adds luxury and sophistication
- White: Opens up spaces and promotes clarity

When selecting colors for your home, consider the function of each room and the atmosphere you want to create. Bedrooms benefit from calming colors like soft blues and greens, while social spaces might incorporate more energetic hues.`,
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    date: "July 2, 2023",
  },
  {
    id: 3,
    title: "Sustainable Interior Design Trends",
    excerpt:
      "Explore eco-friendly materials and sustainable practices in modern interior design.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    date: "July 20, 2023",
  },
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
            Get inspired with our latest articles on interior design trends and
            tips.
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
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Button
                  className="bg-[#A67F5D] hover:bg-opacity-90 text-white"
                  onClick={() => (window.location.href = `/blog/${post.id}`)}
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