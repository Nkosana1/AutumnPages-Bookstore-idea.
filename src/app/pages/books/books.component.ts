import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.interface';
import { BookGridComponent } from '../../components/books/book-grid/book-grid.component';
import { GenreFilterComponent } from '../../components/books/book-filters/genre-filter.component';
import { EmptyStateComponent } from '../../components/shared/empty-state/empty-state.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, BookGridComponent, GenreFilterComponent, EmptyStateComponent],
  template: `
    <div class="min-h-screen bg-gradient-warm py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold text-chocolate mb-4 font-serif">Our Book Collection</h1>
          <p class="text-xl text-charcoal font-sans max-w-2xl mx-auto">
            Curated selections for every reader's taste, wrapped in the warmth of autumn
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div class="lg:col-span-1">
            <app-genre-filter 
              [genres]="categories"
              [selectedGenre]="selectedCategory"
              (genreSelected)="filterByCategory($event)">
            </app-genre-filter>
          </div>
          <div class="lg:col-span-3">
            <app-book-grid *ngIf="(filteredBooks$ | async)?.length" [books]="filteredBooks$ | async"></app-book-grid>
            <app-empty-state 
              *ngIf="(filteredBooks$ | async)?.length === 0"
              title="No books found"
              message="Try selecting a different category">
            </app-empty-state>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BooksComponent implements OnInit {
  books$: Observable<Book[]> = this.bookService.getBooks();
  filteredBooks$: Observable<Book[]> = this.books$;
  selectedCategory: string = 'All';
  
  categories: string[] = ['All', 'Fiction', 'Mystery', 'Poetry', 'Historical Fiction', 'Non-Fiction', 'Fantasy', 'Romance', 'Short Stories'];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.filteredBooks$ = this.books$;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredBooks$ = this.books$;
    } else {
      this.filteredBooks$ = this.bookService.getBooksByCategory(category);
    }
  }
}

