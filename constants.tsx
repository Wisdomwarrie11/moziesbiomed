
import React from 'react';
import { Product, Service, Category } from './types';

export const COLORS = {
  primary: '#DC2626', // Vibrant Red
  secondary: '#4B5563', // Professional Grey
  accent: '#111827', // Darker Grey/Black
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Advanced Patient Monitor',
    description: 'Multi-parameter patient monitoring system for critical care units.',
    category: Category.MONITORING,
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    specifications: ['ECG', 'SpO2', 'NIBP', 'TEMP', '12.1 inch display']
  },
  {
    id: '2',
    name: 'Digital X-Ray System',
    description: 'High-resolution digital radiography for precise diagnostics.',
    category: Category.DIAGNOSTIC,
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800',
    specifications: ['Low dose radiation', 'Instant image processing', 'Wireless detector']
  },
  {
    id: '3',
    name: 'Infusion Pump Series X',
    description: 'Intelligent volumetric infusion pump for accurate medication delivery.',
    category: Category.THERAPEUTIC,
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800',
    specifications: ['Dual CPU', 'Anti-bolus system', 'WiFi connectivity']
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Medical Equipment Maintenance',
    description: 'Comprehensive preventive and corrective maintenance for all medical devices.',
    icon: 'wrench'
  },
  {
    id: 's2',
    title: 'Clinical Engineering Consultancy',
    description: 'Strategic planning and advisory services for healthcare facilities.',
    icon: 'clipboard-list'
  },
  {
    id: 's3',
    title: 'Installation & Training',
    description: 'Expert installation of medical systems and technical training for staff.',
    icon: 'users'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Expert Engineering',
    description: 'Our team comprises highly certified clinical engineers with years of field experience.',
    icon: 'verified'
  },
  {
    title: 'Cost-Effective',
    description: 'We optimize medical asset life-cycles to reduce operational overhead for facilities.',
    icon: 'savings'
  },
  {
    title: 'Rapid Response',
    description: 'Our 24/7 technical support ensures minimal downtime for critical life-saving equipment.',
    icon: 'bolt'
  }
];

export const WHO_SERVICES_FOR = [
  {
    title: 'Private Hospitals',
    description: 'Scaling private facilities with high-end diagnostic and surgical tools.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'Public Health Centers',
    description: 'Ensuring public facilities maintain standard care through reliable equipment.',
    image: 'https://images.unsplash.com/photo-1586773860418-d3b97978c65c?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'Diagnostic Labs',
    description: 'Precision tools for accurate medical testing and research laboratories.',
    image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=600'
  }
];

export const HERO_SLIDES = [
  {
    image: 'surgery.jpeg',
    title: 'Leading Biomedical Solutions',
    subtitle: 'High-quality engineering solutions for Nigerian healthcare.'
  },
  {
    image: 'simulator.jpeg',
    title: 'Technologically Driven',
    subtitle: 'Innovation at the heart of healthcare delivery.'
  },
  {
    image: 'uss.jpeg',
    title: 'Holistic Approach',
    subtitle: 'Sustainable engineering for long-term clinical excellence.'
  }
];
