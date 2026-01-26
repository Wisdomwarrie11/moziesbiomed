export interface CategoryItem {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price?: string;
  categoryId: string;
  imageUrl: string;
  specifications: string[]; // For optional details
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  description?: string;
  date: string;
}

export interface ServiceDetail {
  title: string;
  description: string;
  items: string[];
}