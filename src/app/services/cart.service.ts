import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../interfaces/cart.interface';
import { Book } from '../models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>({
    items: [],
    total: 0,
    subtotal: 0,
    shipping: 0
  });

  cart$ = this.cartSubject.asObservable();

  addItem(book: Book, quantity: number = 1): void {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.items.find(item => item.book.id === book.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.items.push({
        id: Date.now(),
        book,
        quantity,
        price: book.price
      });
    }

    this.updateCartTotals(currentCart);
  }

  removeItem(itemId: number): void {
    const currentCart = this.cartSubject.value;
    currentCart.items = currentCart.items.filter(item => item.id !== itemId);
    this.updateCartTotals(currentCart);
  }

  updateQuantity(itemId: number, quantity: number): void {
    const currentCart = this.cartSubject.value;
    const item = currentCart.items.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.updateCartTotals(currentCart);
    }
  }

  clearCart(): void {
    this.cartSubject.next({
      items: [],
      total: 0,
      subtotal: 0,
      shipping: 0
    });
  }

  private updateCartTotals(cart: Cart): void {
    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.shipping = cart.subtotal > 50 ? 0 : 5.99;
    cart.total = cart.subtotal + cart.shipping;
    this.cartSubject.next(cart);
  }

  getCartCount(): Observable<number> {
    return new Observable(observer => {
      this.cart$.subscribe(cart => {
        const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        observer.next(count);
      });
    });
  }
}

