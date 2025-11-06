import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/book.interface';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly WISHLIST_KEY = 'autumnpages_wishlist';
  private wishlistSubject = new BehaviorSubject<Book[]>(this.loadWishlist());
  wishlist$ = this.wishlistSubject.asObservable();

  constructor(private localStorage: LocalStorageService) {
    this.wishlistSubject.subscribe(wishlist => {
      this.saveWishlist(wishlist);
    });
  }

  addToWishlist(book: Book): void {
    const current = this.wishlistSubject.value;
    if (!current.find(b => b.id === book.id)) {
      this.wishlistSubject.next([...current, book]);
    }
  }

  removeFromWishlist(bookId: string | number): void {
    const current = this.wishlistSubject.value;
    const idStr = typeof bookId === 'string' ? bookId : String(bookId);
    this.wishlistSubject.next(current.filter(b => {
      const bIdStr = typeof b.id === 'string' ? b.id : String(b.id);
      return bIdStr !== idStr;
    }));
  }

  isInWishlist(bookId: string | number): boolean {
    const idStr = typeof bookId === 'string' ? bookId : String(bookId);
    return this.wishlistSubject.value.some(b => {
      const bIdStr = typeof b.id === 'string' ? b.id : String(b.id);
      return bIdStr === idStr;
    });
  }

  getWishlistCount(): Observable<number> {
    return new Observable(observer => {
      this.wishlist$.subscribe(wishlist => {
        observer.next(wishlist.length);
      });
    });
  }

  private loadWishlist(): Book[] {
    return this.localStorage.getItem<Book[]>(this.WISHLIST_KEY) || [];
  }

  private saveWishlist(wishlist: Book[]): void {
    this.localStorage.setItem(this.WISHLIST_KEY, wishlist);
  }
}

