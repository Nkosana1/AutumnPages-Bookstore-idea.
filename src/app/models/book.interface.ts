export interface Book {
  id: number;
  title: string;
  author: string;
  authorId?: number;
  price: number;
  coverImage: string;
  description: string;
  category: string;
  rating: number;
  publishedYear: number;
  isbn?: string;
  pages?: number;
  previewPages?: string[];
  popularity?: number;
  views?: number;
}

