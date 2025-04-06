
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Modern Minimalism in Interior Design",
    excerpt: "Discover how to create a minimalist interior that maximizes both style and functionality.",
    imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    date: "June 15, 2023"
  },
  {
    id: 2,
    title: "Color Psychology in Home Decor",
    excerpt: "Learn how different colors can influence mood and atmosphere in your living spaces.",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    date: "July 2, 2023"
  },
  {
    id: 3,
    title: "Sustainable Interior Design Trends",
    excerpt: "Explore eco-friendly materials and sustainable practices in modern interior design.",
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
                <Button className="bg-[#A67F5D] hover:bg-opacity-90 text-white">
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
