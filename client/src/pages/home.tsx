import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import ServicesSection from '@/components/services-section';
import AboutSection from '@/components/about-section';
import PortfolioSection from '@/components/portfolio-section';
import ContactSection from '@/components/contact-section';
import CTASection from '@/components/cta-section';
import Footer from '@/components/footer';

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PortfolioSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
