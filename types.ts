
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price?: string;
  imageUrl: string;
  specifications: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
}

export enum Category {
  DIAGNOSTIC = 'Diagnostic Equipment',
  THERAPEUTIC = 'Therapeutic Devices',
  MONITORING = 'Monitoring Systems',
  SURGICAL = 'Surgical Instruments',
  LABORATORY = 'Laboratory Solutions'
}
