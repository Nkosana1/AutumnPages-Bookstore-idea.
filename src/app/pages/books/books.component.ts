import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.interface';
import { BookFilters } from '../../interfaces/book-filters.interface';
import { BookGridComponent } from '../../components/books/book-grid/book-grid.component';
import { GenreFilterComponent } from '../../components/books/book-filters/genre-filter.component';
import { PriceFilterComponent } from '../../components/books/book-filters/price-filter.component';
import { RatingFilterComponent } from '../../components/books/book-filters/rating-filter.component';
import { EmptyStateComponent } from '../../components/shared/empty-state/empty-state.component';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, BookGridComponent, GenreFilterComponent, PriceFilterComponent, RatingFilterComponent, EmptyStateComponent, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-warm py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold text-chocolate mb-4 font-serif">Our Book Collection</h1>
          <p class="text-xl text-charcoal font-sans max-w-2xl mx-auto">
            Curated selections for every reader's taste, wrapped in the warmth of autumn
          </p>
        </div>

        <!-- Sort and Filter Controls -->
        <div class="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="flex items-center space-x-4">
            <label class="text-chocolate font-serif font-semibold">Sort by:</label>
            <select 
              [(ngModel)]="sortBy"
              (change)="applyFilters()"
              class="px-4 py-2 border border-soft-taupe rounded-lg text-chocolate focus:outline-none focus:ring-2 focus:ring-autumn-orange font-sans">
              <option value="popularity">Popularity</option>
              <option value="newest">Newest</option>
              <option value="price">Price: Low to High</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div class="text-charcoal font-sans">
            Showing {{ (filteredBooks$ | async)?.length || 0 }} books
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div class="lg:col-span-1 space-y-6">
            <app-genre-filter 
              [genres]="categories"
              [selectedGenre]="filters.category || 'All'"
              (genreSelected)="onCategoryChange($event)">
            </app-genre-filter>
            <app-price-filter 
              [minPrice]="filters.minPrice || 0"
              [maxPrice]="filters.maxPrice || 100"
              (priceRangeChange)="onPriceChange($event)">
            </app-price-filter>
            <app-rating-filter 
              [selectedRating]="filters.minRating || 0"
              (ratingSelected)="onRatingChange($event)">
            </app-rating-filter>
          </div>
          <div class="lg:col-span-3">
            <app-book-grid *ngIf="(filteredBooks$ | async)?.length" [books]="(filteredBooks$ | async) || []"></app-book-grid>
            <app-empty-state 
              *ngIf="(filteredBooks$ | async)?.length === 0"
              title="No books found"
              message="Try adjusting your filters">
            </app-empty-state>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BooksComponent implements OnInit {
  books$!: Observable<Book[]>;
  filteredBooks$!: Observable<Book[]>;
  selectedCategory: string = 'All';
  sortBy: 'popularity' | 'newest' | 'price' | 'rating' = 'popularity';
  
  filters = {
    category: 'All',
    minPrice: 0,
    maxPrice: 100,
    minRating: 0,
    search: undefined as string | undefined
  };
  
  categories: string[] = ['All', 'Fiction', 'Mystery', 'Poetry', 'Historical Fiction', 'Non-Fiction', 'Fantasy', 'Romance', 'Short Stories'];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.books$ = this.bookService.getBooks();
    // Check for search query in route
    this.route.queryParams.subscribe(params => {
      if (params['searchQuery']) {
        this.filters.search = params['searchQuery'];
      } else if (params['search']) {
        // Legacy support
        this.filters.search = params['search'];
      }
      this.applyFilters();
    });
    
    this.applyFilters();
  }

  applyFilters(): void {
    // Use new filter structure with legacy support
    const apiFilters: BookFilters = {
      genres: this.filters.category === 'All' ? undefined : [this.filters.category],
      priceRange: this.filters.minPrice !== undefined || this.filters.maxPrice !== undefined 
        ? { 
            min: this.filters.minPrice || 0, 
            max: this.filters.maxPrice || 100 
          } 
        : undefined,
      rating: this.filters.minRating,
      searchQuery: this.filters.search,
      sortBy: this.sortBy,
      // Legacy support
      category: this.filters.category === 'All' ? undefined : this.filters.category,
      minPrice: this.filters.minPrice,
      maxPrice: this.filters.maxPrice,
      minRating: this.filters.minRating,
      search: this.filters.search
    };

    // Remove undefined values
    Object.keys(apiFilters).forEach(key => {
      const value = (apiFilters as any)[key];
      if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        delete (apiFilters as any)[key];
      }
    });

    if (Object.keys(apiFilters).length > 0) {
      this.filteredBooks$ = this.bookService.getBooks(apiFilters);
    } else {
      this.filteredBooks$ = this.books$.pipe(
        map(books => {
          let filtered = this.bookService.filterBooks(books, {
            category: this.filters.category,
            minPrice: this.filters.minPrice,
            maxPrice: this.filters.maxPrice,
            minRating: this.filters.minRating
          });
          return this.bookService.sortBooks(filtered, this.sortBy);
        })
      );
    }
  }

  onCategoryChange(category: string): void {
    this.filters.category = category;
    this.applyFilters();
  }

  onPriceChange(range: {min: number, max: number}): void {
    this.filters.minPrice = range.min;
    this.filters.maxPrice = range.max;
    this.applyFilters();
  }

  onRatingChange(rating: number): void {
    this.filters.minRating = rating;
    this.applyFilters();
  }
}

