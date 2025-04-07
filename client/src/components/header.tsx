import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X, Instagram, Facebook, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={cn(
      "sticky top-0 bg-white z-50 transition-shadow duration-300",
      scrolled ? "shadow-md" : "shadow-sm"
    )}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <img src="/assets/logo_transparent.png" alt="Ktisis Interiors" className="h-12 w-auto" />
          <span className="text-2xl font-bold font-heading text-[#3A3A3A]">
            Ktisis <span className="text-[#A67F5D]">Interiors</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <nav className="flex space-x-8 mr-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-[#3A3A3A] hover:text-[#A67F5D] transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/ktisis_interiors/" target="_blank" rel="noopener noreferrer" className="text-[#3A3A3A] hover:text-[#A67F5D] transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/ktisisinteriors" target="_blank" rel="noopener noreferrer" className="text-[#3A3A3A] hover:text-[#A67F5D] transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://wa.me/919947386281" target="_blank" rel="noopener noreferrer" className="text-[#3A3A3A] hover:text-[#A67F5D] transition-colors">
              <Phone size={20} />
            </a>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-[#3A3A3A] hover:text-[#A67F5D] py-2 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
