import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" 
         class="fixed inset-0 z-50 overflow-hidden">
      <div class="absolute inset-0 bg-black bg-opacity-50" (click)="close()"></div>
      <div class="absolute right-0 top-0 h-full w-full max-w-md bg-vanilla shadow-xl transform transition-transform duration-300 ease-in-out">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between p-6 border-b border-soft-taupe">
            <h2 class="text-2xl font-bold text-chocolate font-serif">Shopping Cart</h2>
            <button (click)="close()" class="text-chocolate hover:text-autumn-orange">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-6">
            <div *ngIf="cartItems.length === 0" class="text-center py-12">
              <svg class="w-24 h-24 mx-auto text-soft-taupe mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <p class="text-xl text-charcoal font-sans">Your cart is empty</p>
            </div>
            <div *ngFor="let item of cartItems" class="mb-4 p-4 border border-soft-taupe rounded-lg">
              <p class="font-serif text-chocolate">{{ item.title }}</p>
              <p class="text-sm text-charcoal font-sans">${{ item.price }}</p>
            </div>
          </div>
          <div class="border-t border-soft-taupe p-6">
            <div class="flex justify-between mb-4">
              <span class="text-lg font-bold text-chocolate font-serif">Total:</span>
              <span class="text-lg font-bold text-chocolate font-serif">${{ total }}</span>
            </div>
            <button class="w-full bg-gradient-autumn hover:bg-deep-rust text-vanilla py-3 rounded-lg font-semibold transition-all">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CartSidebarComponent {
  @Input() isOpen = false;
  cartItems: any[] = [];
  total = 0;

  close(): void {
    this.isOpen = false;
  }
}

