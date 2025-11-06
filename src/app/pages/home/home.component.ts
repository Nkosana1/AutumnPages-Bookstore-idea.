import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthorService } from '../../services/author.service';
import { Book } from '../../models/book.interface';
import { BookGridComponent } from '../../components/books/book-grid/book-grid.component';
import { BookCarouselComponent } from '../../components/ui/interactive/book-carousel.component';
import { SeasonalReadingListComponent } from '../../components/ui/interactive/seasonal-reading-list.component';
import { AuthorSpotlightComponent } from '../../components/ui/cards/author-spotlight.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, BookGridComponent, BookCarouselComponent, SeasonalReadingListComponent, AuthorSpotlightComponent],
  template: `
    <div class="min-h-screen">
      <!-- Hero Section -->
      <div class="relative overflow-hidden bg-gradient-hero">
        <div class="absolute inset-0 bg-cover bg-center opacity-30" 
             style="background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=80');"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div class="text-center">
            <h1 class="text-5xl md:text-7xl font-bold text-vanilla mb-6 font-serif drop-shadow-lg">
              Welcome to AutumnPages
            </h1>
            <p class="text-xl md:text-2xl text-vanilla mb-8 max-w-3xl mx-auto font-sans drop-shadow-md">
              Discover your next favorite book in our cozy collection. 
              Where stories come alive and pages turn with warmth.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a routerLink="/books" 
                 class="bg-chocolate hover:bg-deep-rust text-vanilla px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-xl">
                Explore Books
              </a>
              <button 
                class="bg-transparent border-2 border-vanilla hover:bg-vanilla hover:text-chocolate text-vanilla px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
                Browse Categories
              </button>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cozy-cream to-transparent"></div>
      </div>
      
      <!-- Book Recommendations Carousel -->
      <section class="py-16 bg-gradient-warm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-chocolate mb-4 font-serif">Recommended for You</h2>
            <p class="text-lg text-charcoal font-sans">Discover books we think you'll love</p>
          </div>
          <app-book-carousel [books]="featuredBooks$ | async"></app-book-carousel>
        </div>
      </section>

      <!-- Seasonal Reading Lists -->
      <section class="py-16 bg-parchment">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <app-seasonal-reading-list 
            title="Autumn Reading List"
            description="Cozy up with these perfect fall reads"
            [books]="seasonalBooks$ | async">
          </app-seasonal-reading-list>
        </div>
      </section>

      <!-- Featured Books Section -->
      <section class="py-16 bg-gradient-warm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-chocolate mb-4 font-serif">Featured Books</h2>
            <p class="text-lg text-charcoal font-sans">Handpicked treasures for your reading pleasure</p>
          </div>
          <app-book-grid [books]="featuredBooks$ | async"></app-book-grid>
        </div>
      </section>

      <!-- Author Spotlight -->
      <section class="py-16 bg-parchment">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <app-author-spotlight [author]="featuredAuthor$ | async"></app-author-spotlight>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="py-16 bg-parchment">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-chocolate mb-4 font-serif">Browse by Category</h2>
            <p class="text-lg text-charcoal font-sans">Find your next read by exploring our curated categories</p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div *ngFor="let category of categories" 
                 class="bg-gradient-card rounded-xl p-8 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border border-soft-taupe">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-autumn rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-vanilla" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-chocolate font-serif mb-2">{{ category.name }}</h3>
              <p class="text-charcoal text-sm font-sans">{{ category.count }} books</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="py-16 bg-gradient-autumn">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl font-bold text-vanilla mb-4 font-accent">Stay Cozy with Our Newsletter</h2>
          <p class="text-xl text-vanilla mb-8 font-sans">Get the latest book recommendations and exclusive offers delivered to your inbox</p>
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
  styles: []
})
export class HomeComponent implements OnInit {
  featuredBooks$!: Observable<Book[]>;
  seasonalBooks$!: Observable<Book[]>;
  featuredAuthor$!: Observable<any>;
  
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

  constructor(
    private bookService: BookService,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    this.featuredBooks$ = this.bookService.getBooks().pipe(
      map(books => books.slice(0, 4))
    );
    this.seasonalBooks$ = this.bookService.getBooks().pipe(
      map(books => books.slice(4, 8))
    );
    this.featuredAuthor$ = this.authorService.getFeaturedAuthor();
  }
}

