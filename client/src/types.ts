// Project Types
export interface Project {
  id: number;
  title: string;
  categories: string[];
  imageUrl: string;
  altText: string;
}

// Service Types
export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

// Team Member Types
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

// Hero Slide Types
export interface HeroSlide {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}
