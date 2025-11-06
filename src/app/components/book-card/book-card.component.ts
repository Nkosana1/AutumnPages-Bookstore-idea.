import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.interface';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gradient-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-soft-taupe">
      <div class="relative h-80 overflow-hidden">
        <img [src]="book.coverImage" 
             [alt]="book.title"
             loading="lazy"
             class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
        <div class="absolute top-4 right-4 bg-autumn-orange text-vanilla px-3 py-1 rounded-full text-sm font-semibold">
          ${{ book.price }}
        </div>
        <div class="absolute top-4 left-4 flex items-center space-x-1 bg-burgundy bg-opacity-90 text-vanilla px-3 py-1 rounded-full">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
          <span class="text-sm font-semibold">{{ book.rating }}</span>
        </div>
      </div>
      <div class="p-6">
        <div class="mb-2">
          <span class="text-xs font-semibold text-olive-green uppercase tracking-wide">{{ book.category }}</span>
        </div>
        <h3 class="text-xl font-bold text-chocolate mb-2 font-serif line-clamp-2">{{ book.title }}</h3>
        <p class="text-soft-taupe mb-3 font-sans">by {{ book.author }}</p>
        <p class="text-charcoal text-sm mb-4 line-clamp-3 font-sans">{{ book.description }}</p>
        <div class="flex items-center justify-between">
          <span class="text-sm text-charcoal font-sans">{{ book.publishedYear }}</span>
          <button 
            class="bg-gradient-autumn hover:bg-deep-rust text-vanilla px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class BookCardComponent {
  @Input() book!: Book;
}

