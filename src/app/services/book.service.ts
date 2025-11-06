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
      id: 1,
      title: "The Autumn Chronicles",
      author: "Sarah Maple",
      authorId: 1,
      price: 24.99,
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      description: "A heartwarming tale set in a small New England town during the fall season.",
      category: "Fiction",
      rating: 4.8,
      publishedYear: 2023,
      isbn: "978-1234567890",
      pages: 320,
      popularity: 95,
      views: 1250
    },
    {
      id: 2,
      title: "Harvest Moon",
      author: "James Oakwood",
      authorId: 2,
      price: 19.99,
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
      description: "A mystery novel that unfolds during the harvest festival in a quaint village.",
      category: "Mystery",
      rating: 4.6,
      publishedYear: 2022,
      isbn: "978-1234567891",
      pages: 280,
      popularity: 88,
      views: 980
    },
    {
      id: 3,
      title: "Warmth of Words",
      author: "Emma Crimson",
      price: 22.99,
      coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
      description: "A collection of poetry celebrating the beauty of autumn and cozy moments.",
      category: "Poetry",
      rating: 4.9,
      publishedYear: 2023,
      isbn: "978-1234567892",
      pages: 150,
      popularity: 92,
      views: 1150
    },
    {
      id: 4,
      title: "The Rustic Library",
      author: "Michael Brown",
      price: 28.99,
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      description: "A historical fiction about a family-run bookstore spanning three generations.",
      category: "Historical Fiction",
      rating: 4.7,
      publishedYear: 2022,
      isbn: "978-1234567893",
      pages: 450,
      popularity: 85,
      views: 890
    },
    {
      id: 5,
      title: "Cozy Reading Nights",
      author: "Isabella Gold",
      price: 21.99,
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      description: "A guide to creating the perfect reading atmosphere and discovering your next favorite book.",
      category: "Non-Fiction",
      rating: 4.5,
      publishedYear: 2023,
      isbn: "978-1234567894",
      pages: 200,
      popularity: 78,
      views: 720
    },
    {
      id: 6,
      title: "Autumn Leaves",
      author: "Robert Amber",
      price: 26.99,
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
      description: "An epic fantasy adventure where the changing seasons hold magical powers.",
      category: "Fantasy",
      rating: 4.8,
      publishedYear: 2023,
      isbn: "978-1234567895",
      pages: 380,
      popularity: 90,
      views: 1080
    },
    {
      id: 7,
      title: "The Parchment Scroll",
      author: "Victoria Sage",
      price: 23.99,
      coverImage: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400",
      description: "A romance novel set in a charming bookstore where love stories unfold.",
      category: "Romance",
      rating: 4.6,
      publishedYear: 2022,
      isbn: "978-1234567896",
      pages: 310,
      popularity: 82,
      views: 950
    },
    {
      id: 8,
      title: "Golden Hour Stories",
      author: "David Mustard",
      price: 20.99,
      coverImage: "https://images.unsplash.com/photo-1536678899566-8b1d0a3b0c5d?w=400",
      description: "Short stories that capture the essence of autumn evenings and warm conversations.",
      category: "Short Stories",
      rating: 4.7,
      publishedYear: 2023,
      isbn: "978-1234567897",
      pages: 240,
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
      
      if (filters.category) params = params.set('category', filters.category);
      if (filters.minPrice !== undefined) params = params.set('minPrice', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) params = params.set('maxPrice', filters.maxPrice.toString());
      if (filters.minRating !== undefined) params = params.set('minRating', filters.minRating.toString());
      if (filters.author) params = params.set('author', filters.author);
      if (filters.search) params = params.set('search', filters.search);
      if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
      if (filters.page) params = params.set('page', filters.page.toString());
      if (filters.limit) params = params.set('limit', filters.limit.toString());

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
    const bookId = typeof id === 'string' ? id : id.toString();
    
    return this.http.get<Book>(`${this.apiUrl}/${bookId}`)
      .pipe(
        map(book => {
          this.addToViewedBooks(book);
          if (book.views !== undefined) {
            book.views++;
          }
          return book;
        }),
        catchError(() => {
          // Fallback to mock data if API fails
          const book = this.mockBooks.find(b => b.id === +bookId);
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
      filtered = this.filterBooks(filtered, {
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        minRating: filters.minRating
      });

      if (filters.sortBy) {
        filtered = this.sortBooks(filtered, filters.sortBy);
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(book =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower) ||
          book.description.toLowerCase().includes(searchLower)
        );
      }
    }

    return filtered;
  }

  getBooksByCategory(category: string): Observable<Book[]> {
    return this.getBooks({ category });
  }

  getBooksByAuthor(authorId: number): Observable<Book[]> {
    // Note: This would need to be updated based on your API structure
    // For now, using mock data
    const filtered = this.mockBooks.filter(b => b.authorId === authorId);
    return of(filtered);
  }

  getRelatedBooks(bookId: number, limit: number = 4): Observable<Book[]> {
    return this.getBooks().pipe(
      map(books => {
        const book = books.find(b => b.id === bookId);
        if (!book) return [];
        
        return books.filter(b => 
          b.id !== bookId && 
          (b.category === book.category || b.author === book.author)
        ).slice(0, limit);
      }),
      catchError(() => {
        // Fallback to mock data
        const book = this.mockBooks.find(b => b.id === bookId);
        if (!book) return of([]);
        
        const related = this.mockBooks.filter(b => 
          b.id !== bookId && 
          (b.category === book.category || b.author === book.author)
        ).slice(0, limit);
        return of(related);
      })
    );
  }

  getRecentlyViewedBooks(limit: number = 4): Observable<Book[]> {
    const viewedIds = this.localStorage.getItem<number[]>(this.VIEWED_BOOKS_KEY) || [];
    
    return this.getBooks().pipe(
      map(books => {
        const viewedBooks = books.filter(b => viewedIds.includes(b.id));
        return viewedBooks.slice(-limit).reverse();
      }),
      catchError(() => {
        // Fallback to mock data
        const viewedBooks = this.mockBooks.filter(b => viewedIds.includes(b.id));
        return of(viewedBooks.slice(-limit).reverse());
      })
    );
  }

  private addToViewedBooks(book: Book): void {
    const viewedIds = this.localStorage.getItem<number[]>(this.VIEWED_BOOKS_KEY) || [];
    const updatedIds = [book.id, ...viewedIds.filter(id => id !== book.id)].slice(0, 10);
    this.localStorage.setItem(this.VIEWED_BOOKS_KEY, updatedIds);
  }

  // Helper methods for filtering and sorting (used by components)
  filterBooks(books: Book[], filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  }): Book[] {
    return books.filter(book => {
      if (filters.category && filters.category !== 'All' && book.category !== filters.category) {
        return false;
      }
      if (filters.minPrice !== undefined && book.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && book.price > filters.maxPrice) {
        return false;
      }
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
        return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case 'newest':
        return sorted.sort((a, b) => b.publishedYear - a.publishedYear);
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }
}
