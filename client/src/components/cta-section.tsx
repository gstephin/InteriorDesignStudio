import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#D9C5B2]">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#3A3A3A] mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-[#3A3A3A] max-w-2xl mx-auto mb-8">
            Schedule a consultation with our design team to start your interior transformation journey.
          </p>
          <Button
            onClick={scrollToContact}
            className="bg-[#3A3A3A] hover:bg-opacity-90 text-white px-8 py-6 rounded transition-colors font-medium"
          >
            Book a Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
