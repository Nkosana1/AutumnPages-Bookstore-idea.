import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from '../models/book.interface';
import { BookFilters } from '../interfaces/book-filters.interface';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://api.example.com/books';
  private readonly VIEWED_BOOKS_KEY = 'autumnpages_viewed_books';
  
  // Fallback mock data for development
  private mockBooks: Book[] = [
    {
      id: "1",
      title: "The Autumn Chronicles",
      author: "Sarah Maple",
      isbn: "978-1234567890",
      price: 24.99,
      rating: 4.8,
      reviewCount: 125,
      description: "A heartwarming tale set in a small New England town during the fall season.",
      genres: ["Fiction", "Literary Fiction"],
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      previewImages: [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"
      ],
      publicationDate: new Date("2023-09-15"),
      pageCount: 320,
      publisher: "Autumn Press",
      inStock: true,
      // Legacy fields
      authorId: 1,
      category: "Fiction",
      publishedYear: 2023,
      popularity: 95,
      views: 1250
    },
    {
      id: "2",
      title: "Harvest Moon",
      author: "James Oakwood",
      isbn: "978-1234567891",
      price: 19.99,
      rating: 4.6,
      reviewCount: 89,
      description: "A mystery novel that unfolds during the harvest festival in a quaint village.",
      genres: ["Mystery", "Thriller"],
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
      previewImages: [
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400"
      ],
      publicationDate: new Date("2022-10-20"),
      pageCount: 280,
      publisher: "Mystery House",
      inStock: true,
      // Legacy fields
      authorId: 2,
      category: "Mystery",
      publishedYear: 2022,
      popularity: 88,
      views: 980
    },
    {
      id: "3",
      title: "Warmth of Words",
      author: "Emma Crimson",
      isbn: "978-1234567892",
      price: 22.99,
      rating: 4.9,
      reviewCount: 156,
      description: "A collection of poetry celebrating the beauty of autumn and cozy moments.",
      genres: ["Poetry", "Literary"],
      coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
      previewImages: [
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400"
      ],
      publicationDate: new Date("2023-08-10"),
      pageCount: 150,
      publisher: "Verse Publishing",
      inStock: true,
      // Legacy fields
      category: "Poetry",
      publishedYear: 2023,
      popularity: 92,
      views: 1150
    },
    {
      id: "4",
      title: "The Rustic Library",
      author: "Michael Brown",
      isbn: "978-1234567893",
      price: 28.99,
      rating: 4.7,
      reviewCount: 102,
      description: "A historical fiction about a family-run bookstore spanning three generations.",
      genres: ["Historical Fiction", "Fiction"],
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      previewImages: [
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"
      ],
      publicationDate: new Date("2022-11-05"),
      pageCount: 450,
      publisher: "Historical Books",
      inStock: true,
      // Legacy fields
      category: "Historical Fiction",
      publishedYear: 2022,
      popularity: 85,
      views: 890
    },
    {
      id: "5",
      title: "Cozy Reading Nights",
      author: "Isabella Gold",
      isbn: "978-1234567894",
      price: 21.99,
      rating: 4.5,
      reviewCount: 67,
      description: "A guide to creating the perfect reading atmosphere and discovering your next favorite book.",
      genres: ["Non-Fiction", "Self-Help"],
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      previewImages: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
      ],
      publicationDate: new Date("2023-07-22"),
      pageCount: 200,
      publisher: "Life Guides",
      inStock: true,
      // Legacy fields
      category: "Non-Fiction",
      publishedYear: 2023,
      popularity: 78,
      views: 720
    },
    {
      id: "6",
      title: "Autumn Leaves",
      author: "Robert Amber",
      isbn: "978-1234567895",
      price: 26.99,
      rating: 4.8,
      reviewCount: 134,
      description: "An epic fantasy adventure where the changing seasons hold magical powers.",
      genres: ["Fantasy", "Adventure"],
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
      previewImages: [
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400"
      ],
      publicationDate: new Date("2023-06-18"),
      pageCount: 380,
      publisher: "Fantasy Realm",
      inStock: true,
      // Legacy fields
      category: "Fantasy",
      publishedYear: 2023,
      popularity: 90,
      views: 1080
    },
    {
      id: "7",
      title: "The Parchment Scroll",
      author: "Victoria Sage",
      isbn: "978-1234567896",
      price: 23.99,
      rating: 4.6,
      reviewCount: 98,
      description: "A romance novel set in a charming bookstore where love stories unfold.",
      genres: ["Romance", "Contemporary"],
      coverImage: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400",
      previewImages: [
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400"
      ],
      publicationDate: new Date("2022-12-14"),
      pageCount: 310,
      publisher: "Love Stories",
      inStock: true,
      // Legacy fields
      category: "Romance",
      publishedYear: 2022,
      popularity: 82,
      views: 950
    },
    {
      id: "8",
      title: "Golden Hour Stories",
      author: "David Mustard",
      isbn: "978-1234567897",
      price: 20.99,
      rating: 4.7,
      reviewCount: 76,
      description: "Short stories that capture the essence of autumn evenings and warm conversations.",
      genres: ["Short Stories", "Fiction"],
      coverImage: "https://images.unsplash.com/photo-1536678899566-8b1d0a3b0c5d?w=400",
      previewImages: [
        "https://images.unsplash.com/photo-1536678899566-8b1d0a3b0c5d?w=400"
      ],
      publicationDate: new Date("2023-05-30"),
      pageCount: 240,
      publisher: "Short Tales",
      inStock: true,
      // Legacy fields
      category: "Short Stories",
      publishedYear: 2023,
      popularity: 75,
      views: 680
    }
  ];

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  getBooks(filters?: BookFilters): Observable<Book[]> {
    if (filters) {
      let params = new HttpParams();
      
      // New filter structure
      if (filters.genres && filters.genres.length > 0) {
        filters.genres.forEach(genre => {
          params = params.append('genres', genre);
        });
      }
      if (filters.priceRange) {
        params = params.set('minPrice', filters.priceRange.min.toString());
        params = params.set('maxPrice', filters.priceRange.max.toString());
      }
      if (filters.rating !== undefined) {
        params = params.set('rating', filters.rating.toString());
      }
      if (filters.searchQuery) {
        params = params.set('searchQuery', filters.searchQuery);
      }
      if (filters.sortBy) {
        params = params.set('sortBy', filters.sortBy);
      }
      if (filters.page) params = params.set('page', filters.page.toString());
      if (filters.limit) params = params.set('limit', filters.limit.toString());

      // Legacy filter support for backward compatibility
      if (filters.category) params = params.set('category', filters.category);
      if (filters.minPrice !== undefined) params = params.set('minPrice', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) params = params.set('maxPrice', filters.maxPrice.toString());
      if (filters.minRating !== undefined) params = params.set('minRating', filters.minRating.toString());
      if (filters.author) params = params.set('author', filters.author);
      if (filters.search) params = params.set('search', filters.search);

      return this.http.get<Book[]>(this.apiUrl, { params })
        .pipe(
          catchError(() => {
            // Fallback to mock data if API fails
            return of(this.getFilteredMockBooks(filters));
          })
        );
    }

    return this.http.get<Book[]>(this.apiUrl)
      .pipe(
        catchError(() => {
          // Fallback to mock data if API fails
          return of(this.mockBooks);
        })
      );
  }

  getBookById(id: string | number): Observable<Book | undefined> {
    const bookId = typeof id === 'string' ? id : String(id);
    
    return this.http.get<Book>(`${this.apiUrl}/${bookId}`)
      .pipe(
        map(book => {
          this.addToViewedBooks(book);
          return book;
        }),
        catchError(() => {
          // Fallback to mock data if API fails
          const bookIdStr = typeof bookId === 'string' ? bookId : String(bookId);
          const book = this.mockBooks.find(b => {
            const bIdStr = typeof b.id === 'string' ? b.id : String(b.id);
            return bIdStr === bookIdStr;
          });
          if (book) {
            this.addToViewedBooks(book);
          }
          return of(book);
        })
      );
  }

  private getFilteredMockBooks(filters?: BookFilters): Book[] {
    let filtered = [...this.mockBooks];
    
    if (filters) {
      // Filter by genres
      if (filters.genres && filters.genres.length > 0) {
        filtered = filtered.filter(book => {
          if (book.genres && book.genres.length > 0) {
            return filters.genres!.some(genre => book.genres.includes(genre));
          }
          // Fallback to category for legacy support
          return filters.category && book.category === filters.category;
        });
      }

      // Filter by price range
      if (filters.priceRange) {
        filtered = filtered.filter(book => 
          book.price >= filters.priceRange!.min && book.price <= filters.priceRange!.max
        );
      }

      // Filter by rating
      if (filters.rating !== undefined) {
        filtered = filtered.filter(book => book.rating >= filters.rating!);
      }

      // Search query
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(book =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower) ||
          book.description.toLowerCase().includes(searchLower)
        );
      }

      // Legacy filter support
      if (filters.category && filters.category !== 'All') {
        filtered = filtered.filter(book => 
          (book.category === filters.category) ||
          (book.genres && book.genres.includes(filters.category!))
        );
      }
      if (filters.minPrice !== undefined) {
        filtered = filtered.filter(book => book.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(book => book.price <= filters.maxPrice!);
      }
      if (filters.minRating !== undefined) {
        filtered = filtered.filter(book => book.rating >= filters.minRating!);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(book =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower) ||
          book.description.toLowerCase().includes(searchLower)
        );
      }

      // Sort
      if (filters.sortBy) {
        filtered = this.sortBooks(filtered, filters.sortBy);
      }
    }

    return filtered;
  }

  getBooksByCategory(category: string): Observable<Book[]> {
    return this.getBooks({ genres: [category] });
  }

  getBooksByAuthor(authorId: number): Observable<Book[]> {
    // Note: This would need to be updated based on your API structure
    // For now, using mock data
    const filtered = this.mockBooks.filter(b => b.authorId === authorId);
    return of(filtered);
  }

  getRelatedBooks(bookId: string | number, limit: number = 4): Observable<Book[]> {
    const idStr = typeof bookId === 'string' ? bookId : String(bookId);
    
    return this.getBooks().pipe(
      map(books => {
        const book = books.find(b => {
          const bIdStr = typeof b.id === 'string' ? b.id : String(b.id);
          return bIdStr === idStr;
        });
        if (!book) return [];
        
        return books.filter(b => {
          const bIdStr = typeof b.id === 'string' ? b.id : String(b.id);
          if (bIdStr === idStr) return false;
          
          // Match by shared genres or same author
          if (book.genres && b.genres) {
            const sharedGenres = book.genres.filter(g => b.genres.includes(g));
            if (sharedGenres.length > 0) return true;
          }
          return b.author === book.author;
        }).slice(0, limit);
      }),
      catchError(() => {
        // Fallback to mock data
        const book = this.mockBooks.find(b => {
          const bIdStr = typeof b.id === 'string' ? b.id : String(b.id);
          return bIdStr === idStr;
        });
        if (!book) return of([]);
        
        const related = this.mockBooks.filter(b => {
          const bIdStr = typeof b.id === 'string' ? b.id : String(b.id);
          if (bIdStr === idStr) return false;
          
          if (book.genres && b.genres) {
            const sharedGenres = book.genres.filter(g => b.genres.includes(g));
            if (sharedGenres.length > 0) return true;
          }
          return b.author === book.author;
        }).slice(0, limit);
        return of(related);
      })
    );
  }

  getRecentlyViewedBooks(limit: number = 4): Observable<Book[]> {
    const viewedIds = this.localStorage.getItem<string[]>(this.VIEWED_BOOKS_KEY) || [];
    
    return this.getBooks().pipe(
      map(books => {
        const viewedBooks = books.filter(b => {
          const idStr = typeof b.id === 'string' ? b.id : String(b.id);
          return viewedIds.includes(idStr);
        });
        return viewedBooks.slice(-limit).reverse();
      }),
      catchError(() => {
        // Fallback to mock data
        const viewedBooks = this.mockBooks.filter(b => {
          const idStr = typeof b.id === 'string' ? b.id : String(b.id);
          return viewedIds.includes(idStr);
        });
        return of(viewedBooks.slice(-limit).reverse());
      })
    );
  }

  private addToViewedBooks(book: Book): void {
    const viewedIds = this.localStorage.getItem<string[]>(this.VIEWED_BOOKS_KEY) || [];
    const bookIdStr = typeof book.id === 'string' ? book.id : String(book.id);
    const updatedIds = [bookIdStr, ...viewedIds.filter(id => id !== bookIdStr)].slice(0, 10);
    this.localStorage.setItem(this.VIEWED_BOOKS_KEY, updatedIds);
  }

  // Helper methods for filtering and sorting (used by components)
  filterBooks(books: Book[], filters: {
    genres?: string[];
    priceRange?: { min: number; max: number };
    rating?: number;
    category?: string; // Legacy support
    minPrice?: number; // Legacy support
    maxPrice?: number; // Legacy support
    minRating?: number; // Legacy support
  }): Book[] {
    return books.filter(book => {
      // Genre filtering
      if (filters.genres && filters.genres.length > 0) {
        if (!book.genres || book.genres.length === 0) {
          // Legacy category fallback
          if (filters.category && book.category !== filters.category) {
            return false;
          }
        } else {
          const hasMatchingGenre = filters.genres.some(genre => book.genres.includes(genre));
          if (!hasMatchingGenre) return false;
        }
      }

      // Legacy category support
      if (filters.category && filters.category !== 'All') {
        if (book.category && book.category !== filters.category) {
          if (!book.genres || !book.genres.includes(filters.category)) {
            return false;
          }
        }
      }

      // Price range filtering
      if (filters.priceRange) {
        if (book.price < filters.priceRange.min || book.price > filters.priceRange.max) {
          return false;
        }
      }

      // Legacy price filtering
      if (filters.minPrice !== undefined && book.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && book.price > filters.maxPrice) {
        return false;
      }

      // Rating filtering
      if (filters.rating !== undefined && book.rating < filters.rating) {
        return false;
      }

      // Legacy rating filtering
      if (filters.minRating !== undefined && book.rating < filters.minRating) {
        return false;
      }

      return true;
    });
  }

  sortBooks(books: Book[], sortBy: 'popularity' | 'newest' | 'price' | 'rating'): Book[] {
    const sorted = [...books];
    switch (sortBy) {
      case 'popularity':
        return sorted.sort((a, b) => {
          // Use reviewCount as popularity indicator, fallback to popularity field
          const aPop = a.reviewCount || a.popularity || 0;
          const bPop = b.reviewCount || b.popularity || 0;
          return bPop - aPop;
        });
      case 'newest':
        return sorted.sort((a, b) => {
          const aDate = a.publicationDate ? new Date(a.publicationDate).getTime() : (a.publishedYear || 0);
          const bDate = b.publicationDate ? new Date(b.publicationDate).getTime() : (b.publishedYear || 0);
          return bDate - aDate;
        });
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }
}
