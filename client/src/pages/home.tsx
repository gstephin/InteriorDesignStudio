import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import FeaturedProjects from '@/components/featured-projects';
import ServicesSection from '@/components/services-section';
import PortfolioSection from '@/components/portfolio-section';
import AboutSection from '@/components/about-section';
import TestimonialsSection from '@/components/testimonials-section';
import ContactSection from '@/components/contact-section';
import CTASection from '@/components/cta-section';
import Footer from '@/components/footer';

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <FeaturedProjects />
        <ServicesSection />
        <PortfolioSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
