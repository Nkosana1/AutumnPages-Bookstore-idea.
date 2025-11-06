import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative">
      <button 
        (click)="toggleSearch()"
        class="text-vanilla hover:text-mustard transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
      <div *ngIf="isSearchOpen" 
           class="absolute right-0 top-12 bg-vanilla rounded-lg shadow-xl p-4 w-80 z-50">
        <input 
          type="text" 
          [(ngModel)]="searchQuery"
          (input)="onSearch()"
          placeholder="Search books..."
          class="w-full px-4 py-2 border border-soft-taupe rounded-lg text-chocolate focus:outline-none focus:ring-2 focus:ring-autumn-orange font-sans">
      </div>
    </div>
  `,
  styles: []
})
export class SearchBarComponent {
  isSearchOpen = false;
  searchQuery = '';

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
  }

  onSearch(): void {
    // TODO: Implement search functionality
    console.log('Searching for:', this.searchQuery);
  }
}

