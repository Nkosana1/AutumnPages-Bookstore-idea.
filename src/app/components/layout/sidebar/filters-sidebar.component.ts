import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen" 
         class="fixed inset-0 z-50 overflow-hidden md:hidden">
      <div class="absolute inset-0 bg-black bg-opacity-50" (click)="close()"></div>
      <div class="absolute left-0 top-0 h-full w-full max-w-sm bg-vanilla shadow-xl transform transition-transform duration-300 ease-in-out">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between p-6 border-b border-soft-taupe">
            <h2 class="text-2xl font-bold text-chocolate font-serif">Filters</h2>
            <button (click)="close()" class="text-chocolate hover:text-autumn-orange">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h3 class="font-serif text-chocolate mb-3">Genre</h3>
              <div class="space-y-2">
                <label *ngFor="let genre of genres" class="flex items-center space-x-2">
                  <input type="checkbox" [value]="genre" (change)="onFilterChange()" class="rounded">
                  <span class="font-sans text-charcoal">{{ genre }}</span>
                </label>
              </div>
            </div>
            <div>
              <h3 class="font-serif text-chocolate mb-3">Price Range</h3>
              <div class="space-y-2">
                <input type="range" min="0" max="100" [(ngModel)]="priceRange[0]" (ngModelChange)="onFilterChange()" class="w-full">
                <div class="flex justify-between text-sm font-sans text-charcoal">
                  <span>${{ priceRange[0] }}</span>
                  <span>${{ priceRange[1] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class FiltersSidebarComponent {
  @Input() isOpen = false;
  @Output() filterChange = new EventEmitter<any>();
  genres = ['Fiction', 'Mystery', 'Romance', 'Fantasy', 'Non-Fiction'];
  priceRange = [0, 100];

  close(): void {
    this.isOpen = false;
  }

  onFilterChange(): void {
    this.filterChange.emit({
      genres: this.genres,
      priceRange: this.priceRange
    });
  }
}

