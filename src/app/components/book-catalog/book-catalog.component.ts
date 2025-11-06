import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.interface';
import { BookCardComponent } from '../book-card/book-card.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-catalog',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  template: `
    <div class="min-h-screen bg-gradient-warm py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold text-chocolate mb-4 font-playfair">Our Book Collection</h1>
          <p class="text-xl text-charcoal font-crimson max-w-2xl mx-auto">
            Curated selections for every reader's taste, wrapped in the warmth of autumn
          </p>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            *ngFor="let category of categories" 
            (click)="filterByCategory(category)"
            [class.bg-gradient-autumn]="selectedCategory === category"
            [class.bg-chocolate]="selectedCategory !== category"
            class="px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md font-crimson text-vanilla">
            {{ category }}
          </button>
        </div>

        <!-- Books Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <app-book-card 
            *ngFor="let book of filteredBooks$ | async" 
            [book]="book">
          </app-book-card>
        </div>

        <!-- Empty State -->
        <div *ngIf="(filteredBooks$ | async)?.length === 0" class="text-center py-16">
          <svg class="w-24 h-24 mx-auto text-soft-taupe mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          <p class="text-2xl text-charcoal font-crimson">No books found in this category</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .font-playfair {
      font-family: 'Playfair Display', serif;
    }
    .font-crimson {
      font-family: 'Crimson Text', serif;
    }
  `]
})
export class BookCatalogComponent implements OnInit {
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

