import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../interfaces/cart.interface';
import { Observable } from 'rxjs';

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
                <input type="text" placeholder="Full Name" [(ngModel)]="shippingInfo.name" name="name" class="w-full px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                <input type="email" placeholder="Email" [(ngModel)]="shippingInfo.email" name="email" class="w-full px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                <input type="text" placeholder="Address" [(ngModel)]="shippingInfo.address" name="address" class="w-full px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                <div class="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" [(ngModel)]="shippingInfo.city" name="city" class="px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                  <input type="text" placeholder="ZIP" [(ngModel)]="shippingInfo.zip" name="zip" class="px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                </div>
              </form>
            </div>
            <div class="bg-gradient-card rounded-xl p-6">
              <h2 class="text-2xl font-bold text-chocolate mb-4 font-serif">Payment Method</h2>
              <div class="space-y-4 mb-4">
                <div class="flex space-x-4">
                  <button 
                    *ngFor="let method of paymentMethods"
                    (click)="selectedPaymentMethod = method"
                    [class.bg-gradient-autumn]="selectedPaymentMethod === method"
                    [class.bg-cozy-cream]="selectedPaymentMethod !== method"
                    [class.text-vanilla]="selectedPaymentMethod === method"
                    [class.text-chocolate]="selectedPaymentMethod !== method"
                    class="flex-1 px-4 py-2 rounded-lg font-semibold transition-all">
                    {{ method }}
                  </button>
                </div>
              </div>
              <div class="space-y-4">
                <input type="text" placeholder="Card Number" [(ngModel)]="paymentInfo.cardNumber" name="cardNumber" class="w-full px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                <div class="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Expiry (MM/YY)" [(ngModel)]="paymentInfo.expiry" name="expiry" class="px-4 py-2 border border-soft-taupe rounded-lg font-sans">
                  <input type="text" placeholder="CVV" [(ngModel)]="paymentInfo.cvv" name="cvv" class="px-4 py-2 border border-soft-taupe rounded-lg font-sans">
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
                  <span class="font-serif text-chocolate"><ng-container>$</ng-container>{{ subtotal }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-sans text-charcoal">Shipping</span>
                  <span class="font-serif text-chocolate"><ng-container>$</ng-container>{{ shipping }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-sans text-charcoal">Tax (8%)</span>
                  <span class="font-serif text-chocolate"><ng-container>$</ng-container>{{ taxDisplay }}</span>
                </div>
                <div class="border-t border-soft-taupe pt-4 flex justify-between">
                  <span class="font-bold font-serif text-chocolate">Total</span>
                  <span class="font-bold font-serif text-chocolate"><ng-container>$</ng-container>{{ totalDisplay }}</span>
                </div>
              </div>
              <button 
                (click)="placeOrder()"
                class="w-full bg-gradient-autumn hover:bg-deep-rust text-vanilla py-3 rounded-lg font-semibold transition-all">
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
export class CheckoutComponent implements OnInit {
  cart$!: Observable<Cart>;
  cart: Cart | null = null;
  shippingInfo = {
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  };
  paymentInfo = {
    cardNumber: '',
    expiry: '',
    cvv: ''
  };
  selectedPaymentMethod = 'Credit Card';
  paymentMethods = ['Credit Card', 'PayPal', 'Apple Pay'];
  tax = 0;
  total = 0;
  subtotal: string = '0.00';
  shipping: string = '0.00';
  taxDisplay: string = '0.00';
  totalDisplay: string = '0.00';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.cart$.subscribe(cart => {
      this.cart = cart;
      this.tax = cart.subtotal * 0.08;
      this.total = cart.total + this.tax;
      this.subtotal = (cart.subtotal || 0).toFixed(2);
      this.shipping = (cart.shipping || 0).toFixed(2);
      this.taxDisplay = this.tax.toFixed(2);
      this.totalDisplay = this.total.toFixed(2);
    });
  }

  placeOrder(): void {
    // TODO: Implement order placement
    this.cartService.clearCart();
    this.router.navigate(['/']);
    alert('Order placed successfully!');
  }
}

