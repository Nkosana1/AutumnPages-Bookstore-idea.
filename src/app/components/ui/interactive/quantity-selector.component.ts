import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-3">
      <button 
        (click)="decrease()"
        [disabled]="quantity <= min"
        class="w-8 h-8 rounded-full bg-cozy-cream hover:bg-soft-taupe disabled:opacity-50 disabled:cursor-not-allowed text-chocolate font-bold transition-all">
        -
      </button>
      <span class="w-12 text-center font-bold text-chocolate font-serif">{{ quantity }}</span>
      <button 
        (click)="increase()"
        [disabled]="quantity >= max"
        class="w-8 h-8 rounded-full bg-cozy-cream hover:bg-soft-taupe disabled:opacity-50 disabled:cursor-not-allowed text-chocolate font-bold transition-all">
        +
      </button>
    </div>
  `,
  styles: []
})
export class QuantitySelectorComponent {
  @Input() quantity = 1;
  @Input() min = 1;
  @Input() max = 99;
  @Output() quantityChange = new EventEmitter<number>();

  increase(): void {
    if (this.quantity < this.max) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }

  decrease(): void {
    if (this.quantity > this.min) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
}

