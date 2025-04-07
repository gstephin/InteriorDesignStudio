import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  StarHalf
} from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest('POST', '/.netlify/functions/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-[#3A3A3A] text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Let's Work Together
          </h2>
          <div className="w-20 h-1 bg-[#A67F5D] mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-gray-300">
            Ready to transform your space? Contact us to schedule a consultation and discuss your project.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-heading font-semibold mb-6">Get in Touch</h3>
            <p className="mb-8 text-gray-300">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-netlify="true">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your name"
                            className="px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded focus:outline-none focus:border-[#A67F5D]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Your email"
                            className="px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded focus:outline-none focus:border-[#A67F5D]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="Your phone number"
                          className="px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded focus:outline-none focus:border-[#A67F5D]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Interested In</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded focus:outline-none focus:border-[#A67F5D]">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="residential">Residential Design</SelectItem>
                          <SelectItem value="commercial">Commercial Design</SelectItem>
                          <SelectItem value="styling">Interior Styling</SelectItem>
                          <SelectItem value="planning">Space Planning</SelectItem>
                          <SelectItem value="lighting">Lighting Design</SelectItem>
                          <SelectItem value="material">Material Selection</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Tell us about your project"
                          className="px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded focus:outline-none focus:border-[#A67F5D] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit"
                  className="w-full bg-[#A67F5D] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded transition-colors"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-heading font-semibold mb-6">Contact Information</h3>
            <p className="mb-8 text-gray-300">
              Visit our studio or reach out through any of the following channels.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-[#A67F5D] mt-1 mr-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Studio Address</h4>
                  <p className="text-gray-300">14 E DD Sunset Island Apartments</p>
                  <p className="text-gray-300">Kochi, Kerala, India</p>
                </div>
              </div>
              
              <div className="w-full h-[300px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d543.0517702664479!2d76.2265694647379!3d10.017105041274432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0813141504750b%3A0x46611b3b224ae68c!2sKtisis%20Interiors!5e0!3m2!1sen!2sae!4v1744046208153!5m2!1sen!2sae" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              <div className="flex items-start">
                <div className="text-[#A67F5D] mt-1 mr-4">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email Us</h4>
                  <p className="text-gray-300">ktisisinteriors744@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-[#A67F5D] mt-1 mr-4">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Call Us</h4>
                  <p className="text-gray-300">+91 9847782499</p>
                  <p className="text-gray-300">WhatsApp: +91 9947386281</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-[#A67F5D] mt-1 mr-4">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Working Hours</h4>
                  <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-300">Saturday: 10:00 AM - 4:00 PM (By appointment)</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <SocialLink icon={<Instagram className="h-6 w-6" />} href="https://www.instagram.com/ktisis_interiors/" />
                <SocialLink icon={<Facebook className="h-6 w-6" />} href="https://www.facebook.com/ktisisinteriors" />
                <SocialLink icon={<Phone className="h-6 w-6" />} href="https://wa.me/919947386281" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

function SocialLink({ icon, href }: SocialLinkProps) {
  return (
    <a 
      href={href} 
      className="text-white hover:text-[#A67F5D] transition-colors"
      target="_blank" 
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
}
