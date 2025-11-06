export interface BookFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  author?: string;
  search?: string;
  sortBy?: 'popularity' | 'newest' | 'price' | 'rating';
  page?: number;
  limit?: number;
}

