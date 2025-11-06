import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-6">
      <h3 class="text-lg font-bold text-chocolate mb-3 font-serif">Price Range</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-charcoal font-sans mb-2">Min: ${{ minPrice }}</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            [(ngModel)]="minPrice"
            (ngModelChange)="onPriceChange()"
            class="w-full">
        </div>
        <div>
          <label class="block text-sm text-charcoal font-sans mb-2">Max: ${{ maxPrice }}</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            [(ngModel)]="maxPrice"
            (ngModelChange)="onPriceChange()"
            class="w-full">
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PriceFilterComponent {
  @Input() minPrice = 0;
  @Input() maxPrice = 100;
  @Output() priceRangeChange = new EventEmitter<{min: number, max: number}>();

  onPriceChange(): void {
    this.priceRangeChange.emit({ min: this.minPrice, max: this.maxPrice });
  }
}

