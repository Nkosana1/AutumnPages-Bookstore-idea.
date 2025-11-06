export interface BookFilters {
  genres?: string[];
  priceRange?: { min: number; max: number };
  rating?: number;
  searchQuery?: string;
  sortBy?: 'popularity' | 'newest' | 'price' | 'rating';
  page?: number;
  limit?: number;
  // Legacy fields for backward compatibility
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  author?: string;
  search?: string;
}

