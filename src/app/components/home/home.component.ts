import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, BookCardComponent],
  template: `
    <div class="min-h-screen">
      <app-hero></app-hero>
      
      <!-- Featured Books Section -->
      <section class="py-16 bg-gradient-warm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-chocolate mb-4 font-playfair">Featured Books</h2>
            <p class="text-lg text-charcoal font-crimson">Handpicked treasures for your reading pleasure</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <app-book-card 
              *ngFor="let book of featuredBooks$ | async" 
              [book]="book">
            </app-book-card>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="py-16 bg-parchment">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-chocolate mb-4 font-playfair">Browse by Category</h2>
            <p class="text-lg text-charcoal font-crimson">Find your next read by exploring our curated categories</p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div *ngFor="let category of categories" 
                 class="bg-gradient-card rounded-xl p-8 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border border-soft-taupe">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-autumn rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-vanilla" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-chocolate font-playfair mb-2">{{ category.name }}</h3>
              <p class="text-charcoal text-sm font-crimson">{{ category.count }} books</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="py-16 bg-gradient-autumn">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl font-bold text-vanilla mb-4 font-playfair">Stay Cozy with Our Newsletter</h2>
          <p class="text-xl text-vanilla mb-8 font-crimson">Get the latest book recommendations and exclusive offers delivered to your inbox</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email"
              class="px-6 py-4 rounded-lg text-lg flex-1 max-w-md text-chocolate focus:outline-none focus:ring-2 focus:ring-vanilla">
            <button 
              class="bg-chocolate hover:bg-deep-rust text-vanilla px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </section>
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
export class HomeComponent implements OnInit {
  featuredBooks$!: Observable<Book[]>;
  
  categories = [
    { name: 'Fiction', count: 12 },
    { name: 'Mystery', count: 8 },
    { name: 'Poetry', count: 15 },
    { name: 'Fantasy', count: 10 },
    { name: 'Romance', count: 9 },
    { name: 'Non-Fiction', count: 11 },
    { name: 'History', count: 7 },
    { name: 'Biography', count: 6 }
  ];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // Get first 4 books as featured
    this.featuredBooks$ = this.bookService.getBooks().pipe(
      map(books => books.slice(0, 4))
    );
  }
}

