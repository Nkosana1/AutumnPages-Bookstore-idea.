import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Book } from '../../../models/book.interface';
import { BookService } from '../../../services/book.service';
import { AuthorService } from '../../../services/author.service';
import { ReviewService } from '../../../services/review.service';
import { WishlistService } from '../../../services/wishlist.service';
import { CartService } from '../../../services/cart.service';
import { Author } from '../../../models/author.model';
import { Review } from '../../../models/review.model';
import { BookGridComponent } from '../book-grid/book-grid.component';
import { RatingStarsComponent } from '../../ui/interactive/rating-stars.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, BookGridComponent, RatingStarsComponent],
  template: `
    <div *ngIf="book" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <img [src]="book.coverImage" 
               [alt]="book.title"
               loading="lazy"
               class="w-full rounded-xl shadow-2xl">
          <button *ngIf="book.previewImages && book.previewImages.length > 0" 
                  class="mt-4 w-full bg-chocolate hover:bg-deep-rust text-vanilla px-6 py-3 rounded-lg font-semibold transition-all">
            Look Inside
          </button>
        </div>
        <div>
          <div class="flex flex-wrap gap-2 mb-2">
            <span *ngFor="let genre of book.genres" 
                  class="text-sm font-semibold text-olive-green uppercase tracking-wide font-sans">
              {{ genre }}
            </span>
          </div>
          <h1 class="text-4xl font-bold text-chocolate mt-2 mb-4 font-serif">{{ book.title }}</h1>
          <p class="text-xl text-soft-taupe mb-4 font-sans">by 
            <a *ngIf="author$ | async" [routerLink]="['/author', (author$ | async)?.id]" class="hover:text-autumn-orange transition-colors">{{ book.author }}</a>
            <span *ngIf="!(author$ | async)">{{ book.author }}</span>
          </p>
          
          <div class="flex items-center space-x-4 mb-6">
            <app-rating-stars [rating]="book.rating" [showRating]="true"></app-rating-stars>
            <span class="text-charcoal font-sans">
              {{ book.publicationDate ? (book.publicationDate | date:'yyyy') : book.publishedYear }} 
              • {{ book.pageCount || book.pages }} pages
              <span *ngIf="book.reviewCount"> • {{ book.reviewCount }} reviews</span>
            </span>
          </div>

          <div class="mb-6">
            <p class="text-3xl font-bold text-autumn-orange font-serif mb-4">${{ book.price }}</p>
            <p *ngIf="!book.inStock" class="text-red-600 font-semibold mb-2">Currently Out of Stock</p>
            <p class="text-lg text-charcoal font-sans leading-relaxed mb-4">{{ book.description }}</p>
            <div class="space-y-1 text-sm text-charcoal font-sans">
              <div *ngIf="book.isbn">ISBN: {{ book.isbn }}</div>
              <div *ngIf="book.publisher">Publisher: {{ book.publisher }}</div>
            </div>
          </div>

          <div class="flex space-x-4 mb-8">
            <button 
              (click)="addToCart()"
              [disabled]="!book.inStock"
              [class.opacity-50]="!book.inStock"
              [class.cursor-not-allowed]="!book.inStock"
              class="flex-1 bg-gradient-autumn hover:bg-deep-rust text-vanilla px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-md">
              {{ book.inStock ? 'Add to Cart' : 'Out of Stock' }}
            </button>
            <button 
              (click)="toggleWishlist()"
              [class.bg-chocolate]="isInWishlist"
              [class.bg-transparent]="!isInWishlist"
              [class.border-chocolate]="!isInWishlist"
              class="px-8 py-4 border-2 text-vanilla hover:bg-chocolate rounded-lg font-semibold transition-all">
              {{ isInWishlist ? 'In Wishlist' : 'Wishlist' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Author Bio -->
      <div *ngIf="author$ | async as author" class="bg-gradient-card rounded-xl p-8 mb-16">
        <h2 class="text-3xl font-bold text-chocolate mb-4 font-serif">About the Author</h2>
        <div class="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
          <img [src]="author.image" 
               [alt]="author.name" 
               loading="lazy"
               class="w-32 h-32 rounded-full object-cover border-4 border-autumn-orange">
          <div class="flex-1">
            <h3 class="text-2xl font-semibold text-chocolate mb-2 font-serif">{{ author.name }}</h3>
            <p class="text-charcoal font-sans leading-relaxed mb-4">{{ author.bio }}</p>
            <button 
              (click)="toggleFollowAuthor()"
              [class.bg-gradient-autumn]="!isFollowingAuthor"
              [class.bg-soft-taupe]="isFollowingAuthor"
              class="text-vanilla px-6 py-2 rounded-lg font-semibold transition-all">
              {{ isFollowingAuthor ? 'Following' : 'Follow Author' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Customer Reviews -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-chocolate mb-6 font-serif">Customer Reviews</h2>
        <div *ngFor="let review of reviews$ | async" class="bg-gradient-card rounded-xl p-6 mb-4">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 rounded-full bg-autumn-orange flex items-center justify-center text-vanilla font-bold font-serif">
              {{ review.userName.charAt(0) }}
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-bold text-chocolate font-serif">{{ review.userName }}</h4>
                <span class="text-sm text-charcoal font-sans">{{ review.date | date:'short' }}</span>
              </div>
              <app-rating-stars [rating]="review.rating" [showRating]="false"></app-rating-stars>
              <h5 class="font-semibold text-chocolate mt-2 mb-1 font-serif">{{ review.title }}</h5>
              <p class="text-charcoal font-sans">{{ review.comment }}</p>
              <button class="mt-2 text-sm text-autumn-orange hover:text-deep-rust font-sans">
                Helpful ({{ review.helpful }})
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Books -->
      <div>
        <h2 class="text-3xl font-bold text-chocolate mb-6 font-serif">You May Also Like</h2>
        <app-book-grid [books]="relatedBooks$ | async"></app-book-grid>
      </div>
    </div>
  `,
  styles: []
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book | null = null;
  author$!: Observable<Author | undefined>;
  reviews$!: Observable<Review[]>;
  relatedBooks$!: Observable<Book[]>;
  isInWishlist = false;
  isFollowingAuthor = false;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private reviewService: ReviewService,
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if (this.book) {
      if (this.book.authorId) {
        this.author$ = this.authorService.getAuthorById(this.book.authorId);
      }
      this.reviews$ = this.reviewService.getReviewsByBookId(this.book.id);
      this.relatedBooks$ = this.bookService.getRelatedBooks(this.book.id);
      this.isInWishlist = this.wishlistService.isInWishlist(this.book.id);
    }
  }

  addToCart(): void {
    if (this.book) {
      this.cartService.addItem(this.book);
    }
  }

  toggleWishlist(): void {
    if (this.book) {
      if (this.isInWishlist) {
        this.wishlistService.removeFromWishlist(this.book.id);
      } else {
        this.wishlistService.addToWishlist(this.book);
      }
      this.isInWishlist = !this.isInWishlist;
    }
  }

  toggleFollowAuthor(): void {
    this.isFollowingAuthor = !this.isFollowingAuthor;
    // TODO: Implement follow author functionality
  }
}

