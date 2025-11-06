import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../interfaces/cart.interface';
import { Book } from '../models/book.interface';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = 'autumnpages_cart';
  
  private cartSubject = new BehaviorSubject<Cart>(this.getEmptyCart());

  cart$ = this.cartSubject.asObservable();

  constructor(private localStorage: LocalStorageService) {
    // Initialize cart from localStorage after injection
    const savedCart = this.loadCartFromStorage();
    this.cartSubject.next(savedCart);
    
    // Save cart to localStorage whenever it changes
    this.cartSubject.subscribe(cart => {
      this.saveCartToStorage(cart);
    });
  }

  private getEmptyCart(): Cart {
    return {
      items: [],
      total: 0,
      subtotal: 0,
      shipping: 0
    };
  }

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

  private loadCartFromStorage(): Cart {
    try {
      const savedCart = this.localStorage.getItem<Cart>(this.CART_KEY);
      if (savedCart) {
        // Ensure items array exists
        if (!savedCart.items) {
          savedCart.items = [];
        }
        // Recalculate totals
        this.updateCartTotals(savedCart);
        return savedCart;
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
    return this.getEmptyCart();
  }

  private saveCartToStorage(cart: Cart): void {
    this.localStorage.setItem(this.CART_KEY, cart);
  }
}

