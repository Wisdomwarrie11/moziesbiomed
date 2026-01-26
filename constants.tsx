import { CategoryItem, Product, GalleryItem } from './types';

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-rad', name: 'Radiology Solutions' },
  { id: 'cat-den', name: 'Dental Solutions' },
  { id: 'cat-lab', name: 'Laboratory Solutions' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-placeholder-1',
    name: 'Standard X-Ray Unit',
    description: 'High-performance diagnostic imaging system for general biomedical use.',
    price: '₦10,000,000',
    categoryId: 'cat-rad',
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800',
    specifications: ['High frequency', 'Digital ready']
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  { 
    id: 'g-placeholder-1', 
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800', 
    caption: 'Recent Installation in Lagos', 
    date: new Date().toISOString() 
  }
];

export const SERVICES_CONTENT = [
  {
    category: 'Biomedical Services',
    description: 'Specialized clinical engineering support focusing on technical precision, installation, and radiation safety.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
    cta: 'Consult an Engineer',
    subsections: [
      { 
        title: 'Hardware Maintenance', 
        items: ['Preventive Maintenance (PPM)', 'On-site corrective repairs', 'Calibration services'] 
      },
      { 
        title: 'Radiation Safety', 
        items: ['Leadlining installation', 'Shielding calculation', 'Radiation surveys'] 
      }
    ]
  },
  {
    category: 'Project Management',
    description: 'Strategic management of healthcare facility setup from blueprint to full engineering operation.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
    cta: 'Plan Your Facility',
    subsections: [
      { 
        title: 'Turnkey Setup', 
        items: ['Facility layout design', 'Equipment procurement scheduling', 'Installation oversight'] 
      }
    ]
  },
  {
    category: 'Engineering Consultancy',
    description: 'Specialized advisory services for technological upgrades and regulatory compliance.',
    image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=1200',
    cta: 'Consult Our Experts',
    subsections: [
      { 
        title: 'Strategic Advisory', 
        items: ['Equipment lifecycle audit', 'ROI analysis for upgrades', 'Regulatory standard audits'] 
      }
    ]
  }
];

export const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1600',
    title: 'Biomedical Engineering Excellence For Nigeria',
    subtitle: 'Expert supply, installation, and maintenance of mission-critical medical hardware.'
  }
];

export const WHY_CHOOSE_US = [
  { title: 'Engineering Mastery', description: 'Certified engineers for all clinical equipment classes.' }
];

export const WHO_SERVICES_FOR = [
  { title: 'Health Facilities', description: 'Turnkey radiology and imaging setups.', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800' }
];