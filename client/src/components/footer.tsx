import { Instagram, Facebook, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would handle the newsletter subscription in a real application
  };

  return (
    <footer className="bg-[#3A3A3A] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">
              Ktisis <span className="text-[#A67F5D]">Interiors</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Creating beautiful, functional spaces that inspire and delight.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/ktisis_interiors/" className="text-white hover:text-[#A67F5D] transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/ktisisinteriors" className="text-white hover:text-[#A67F5D] transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://wa.me/919947386281" className="text-white hover:text-[#A67F5D] transition-colors" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path><path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path><path d="M9 14a.5.5 0 0 0 .5.5c.28 0 .5-.2.5-.5s.22-.5.5-.5.5.2.5.5.22.5.5.5.5-.2.5-.5"></path></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { id: '#home', label: 'Home' },
                { id: '#services', label: 'Services' },
                { id: '#about', label: 'About' },
                { id: '#contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={link.id}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                    className="text-gray-300 hover:text-[#A67F5D] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                'Residential Design',
                'Commercial Design',
                'Interior Styling',
                'Space Planning',
                'Lighting Design',
              ].map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-gray-300 hover:text-[#A67F5D] transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for design tips and inspiration.
            </p>
            <form className="flex" onSubmit={handleNewsletterSubmit}>
              <Input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-l focus:outline-none focus:border-[#A67F5D] flex-grow"
              />
              <Button type="submit" className="bg-[#A67F5D] hover:bg-opacity-90 text-white px-4 py-2 rounded-r transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Ktisis Interiors. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-[#A67F5D] text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-[#A67F5D] text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-[#A67F5D] text-sm transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
