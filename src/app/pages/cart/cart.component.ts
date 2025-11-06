import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../interfaces/cart.interface';
import { QuantitySelectorComponent } from '../../components/ui/interactive/quantity-selector.component';
import { EmptyStateComponent } from '../../components/shared/empty-state/empty-state.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, QuantitySelectorComponent, EmptyStateComponent],
  template: `
    <div class="min-h-screen bg-gradient-warm py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-chocolate mb-8 font-serif">Shopping Cart</h1>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div *ngIf="cart && cart.items.length; else emptyCart">
              <div *ngFor="let item of cart?.items || []" 
                   class="bg-gradient-card rounded-xl p-6 mb-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <img [src]="item.book.coverImage" 
                     [alt]="item.book.title"
                     class="w-24 h-32 object-cover rounded-lg">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-chocolate mb-2 font-serif">{{ item.book.title }}</h3>
                  <p class="text-soft-taupe mb-2 font-sans">by {{ item.book.author }}</p>
                  <p class="text-lg font-bold text-autumn-orange font-serif">$<span>{{ item.price }}</span></p>
                </div>
                <div class="flex items-center space-x-4">
                  <app-quantity-selector 
                    [quantity]="item.quantity"
                    (quantityChange)="updateQuantity(item.id, $event)">
                  </app-quantity-selector>
                  <button 
                    (click)="removeItem(item.id)"
                    class="text-red-600 hover:text-red-800 font-sans">
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <ng-template #emptyCart>
              <app-empty-state 
                title="Your cart is empty"
                message="Start shopping to add books to your cart!">
              </app-empty-state>
            </ng-template>
          </div>
          <div class="lg:col-span-1">
            <div class="bg-gradient-card rounded-xl p-6 sticky top-24">
              <h2 class="text-2xl font-bold text-chocolate mb-4 font-serif">Order Summary</h2>
              <div class="space-y-4 mb-6">
                <div class="flex justify-between">
                  <span class="font-sans text-charcoal">Subtotal</span>
                  <span class="font-serif text-chocolate"><ng-container>$</ng-container>{{ subtotal }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-sans text-charcoal">Shipping</span>
                  <span class="font-serif text-chocolate"><ng-container>$</ng-container>{{ shipping }}</span>
                </div>
                <div class="border-t border-soft-taupe pt-4 flex justify-between">
                  <span class="font-bold font-serif text-chocolate">Total</span>
                  <span class="font-bold font-serif text-chocolate"><ng-container>$</ng-container>{{ total }}</span>
                </div>
              </div>
              <a routerLink="/checkout" 
                 [class.opacity-50]="!cart || !cart.items.length"
                 [class.cursor-not-allowed]="!cart || !cart.items.length"
                 class="block w-full bg-gradient-autumn hover:bg-deep-rust text-vanilla text-center py-3 rounded-lg font-semibold transition-all">
                Proceed to Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CartComponent implements OnInit {
  cart$!: Observable<Cart>;
  cart: Cart | null = null;
  subtotal: string = '0.00';
  shipping: string = '0.00';
  total: string = '0.00';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.cart$.subscribe(cart => {
      this.cart = cart;
      this.subtotal = (cart.subtotal || 0).toFixed(2);
      this.shipping = (cart.shipping || 0).toFixed(2);
      this.total = (cart.total || 0).toFixed(2);
    });
  }

  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId);
  }
}

