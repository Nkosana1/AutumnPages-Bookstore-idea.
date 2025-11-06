export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  genres: string[];
  coverImage: string;
  previewImages: string[];
  publicationDate: Date;
  pageCount: number;
  publisher: string;
  inStock: boolean;
  // Legacy fields for backward compatibility during migration
  authorId?: number;
  category?: string;
  publishedYear?: number;
  popularity?: number;
  views?: number;
}

