import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../models/book.interface';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="book" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <img [src]="book.coverImage" 
               [alt]="book.title"
               class="w-full rounded-xl shadow-2xl">
        </div>
        <div>
          <span class="text-sm font-semibold text-olive-green uppercase tracking-wide font-sans">{{ book.category }}</span>
          <h1 class="text-4xl font-bold text-chocolate mt-2 mb-4 font-serif">{{ book.title }}</h1>
          <p class="text-xl text-soft-taupe mb-6 font-sans">by {{ book.author }}</p>
          
          <div class="flex items-center space-x-2 mb-6">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-warm-amber fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span class="ml-2 text-lg font-semibold text-chocolate font-serif">{{ book.rating }}</span>
            </div>
            <span class="text-charcoal font-sans">({{ book.publishedYear }})</span>
          </div>

          <div class="mb-6">
            <p class="text-2xl font-bold text-autumn-orange font-serif mb-2">${{ book.price }}</p>
            <p class="text-charcoal font-sans">{{ book.description }}</p>
          </div>

          <div class="flex space-x-4">
            <button 
              class="flex-1 bg-gradient-autumn hover:bg-deep-rust text-vanilla px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-md">
              Add to Cart
            </button>
            <button 
              class="px-8 py-4 border-2 border-chocolate text-chocolate hover:bg-chocolate hover:text-vanilla rounded-lg font-semibold transition-all">
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BookDetailComponent {
  @Input() book: Book | null = null;
}

