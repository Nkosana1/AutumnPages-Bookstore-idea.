import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-warm py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-chocolate mb-8 font-serif">Shopping Cart</h1>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="bg-gradient-card rounded-xl p-6 mb-4">
              <p class="text-charcoal font-sans">Your cart is empty. Start shopping!</p>
            </div>
          </div>
          <div class="lg:col-span-1">
            <div class="bg-gradient-card rounded-xl p-6 sticky top-24">
              <h2 class="text-2xl font-bold text-chocolate mb-4 font-serif">Order Summary</h2>
              <div class="space-y-4 mb-6">
                <div class="flex justify-between">
                  <span class="font-sans text-charcoal">Subtotal</span>
                  <span class="font-serif text-chocolate">$0.00</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-sans text-charcoal">Shipping</span>
                  <span class="font-serif text-chocolate">$0.00</span>
                </div>
                <div class="border-t border-soft-taupe pt-4 flex justify-between">
                  <span class="font-bold font-serif text-chocolate">Total</span>
                  <span class="font-bold font-serif text-chocolate">$0.00</span>
                </div>
              </div>
              <a routerLink="/checkout" 
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
export class CartComponent {
}

