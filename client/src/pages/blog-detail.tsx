
import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useRoute } from 'wouter';
import { blogPosts } from '@/components/blog-section';
import { motion } from 'framer-motion';

export default function BlogDetail() {
  const [, params] = useRoute<{ id: string }>('/blog/:id');
  const post = blogPosts.find(post => post.id === Number(params?.id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#3A3A3A] mb-4">
              {post.title}
            </h1>
            <div className="text-gray-500 mb-8">{post.date}</div>
            <div className="prose max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 text-lg mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
