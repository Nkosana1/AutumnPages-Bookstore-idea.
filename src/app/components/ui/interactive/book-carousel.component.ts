import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../models/book.interface';

@Component({
  selector: 'app-book-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative overflow-hidden">
      <div class="flex transition-transform duration-500 ease-in-out" [style.transform]="'translateX(-' + currentIndex * 100 + '%)'">
        <div *ngFor="let book of books; let i = index" 
             class="min-w-full px-4 flex-shrink-0">
          <div class="bg-gradient-card rounded-xl p-6 flex items-center space-x-6">
            <img [src]="book.coverImage" [alt]="book.title" class="w-32 h-48 object-cover rounded-lg shadow-lg">
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-chocolate mb-2 font-serif">{{ book.title }}</h3>
              <p class="text-soft-taupe mb-4 font-sans">by {{ book.author }}</p>
              <p class="text-charcoal mb-4 font-sans line-clamp-3">{{ book.description }}</p>
              <div class="flex items-center space-x-4">
                <span class="text-xl font-bold text-autumn-orange font-serif">${{ book.price }}</span>
                <button class="bg-gradient-autumn hover:bg-deep-rust text-vanilla px-6 py-2 rounded-lg font-semibold transition-all">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button (click)="previous()" 
              class="absolute left-0 top-1/2 -translate-y-1/2 bg-chocolate text-vanilla p-2 rounded-full hover:bg-deep-rust transition-all">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button (click)="next()" 
              class="absolute right-0 top-1/2 -translate-y-1/2 bg-chocolate text-vanilla p-2 rounded-full hover:bg-deep-rust transition-all">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      <div class="flex justify-center space-x-2 mt-4">
        <button *ngFor="let book of books; let i = index"
                (click)="goToSlide(i)"
                [class.bg-autumn-orange]="i === currentIndex"
                [class.bg-soft-taupe]="i !== currentIndex"
                class="w-2 h-2 rounded-full transition-all">
        </button>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class BookCarouselComponent implements OnInit {
  @Input() books: Book[] = [];
  currentIndex = 0;
  private autoPlayInterval?: any;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.books.length;
  }

  previous(): void {
    this.currentIndex = (this.currentIndex - 1 + this.books.length) % this.books.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}

