import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-warm py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-chocolate mb-8 font-serif">Checkout</h1>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div class="bg-gradient-card rounded-xl p-6 mb-6">
              <h2 class="text-2xl font-bold text-chocolate mb-4 font-serif">Shipping Information</h2>
              <form class="space-y-4">
                <input type="text" placeholder="Full Name" class="w-full px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                <input type="email" placeholder="Email" class="w-full px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                <input type="text" placeholder="Address" class="w-full px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                <div class="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" class="px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                  <input type="text" placeholder="ZIP" class="px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                </div>
              </form>
            </div>
            <div class="bg-gradient-card rounded-xl p-6">
              <h2 class="text-2xl font-bold text-chocolate mb-4 font-serif">Payment Method</h2>
              <div class="space-y-4">
                <input type="text" placeholder="Card Number" class="w-full px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                <div class="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Expiry" class="px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                  <input type="text" placeholder="CVV" class="px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                </div>
              </div>
            </div>
          </div>
          <div>
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
              <button class="w-full bg-gradient-autumn hover:bg-deep-rust text-vanilla py-3 rounded-lg font-semibold transition-all">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CheckoutComponent {
}

